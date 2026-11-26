import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { initDatabase, generateSubmissionId, logAudit } from './db.mjs';
import { publishApprovedSubmission } from './publisher.mjs';

const PORT = Number(process.env.CTI_SERVER_PORT || 4391);
const HOST = process.env.CTI_SERVER_HOST || '127.0.0.1';
const DATA_DIR = process.env.CTI_DATA_DIR || '/var/lib/cyprustopindex';
const INTERNAL_SECRET = process.env.CTI_INTERNAL_SECRET || '';
const TELEGRAM_MODERATION_BUTTONS = process.env.CTI_TELEGRAM_MODERATION_BUTTONS !== 'false';
const ALLOWED_ORIGINS = new Set([
  'https://cyprustopindex.com',
  'https://www.cyprustopindex.com',
  process.env.CTI_ALLOWED_ORIGIN || '',
].filter(Boolean));

const MAX_BODY_BYTES = 3 * 1024 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_REQ = 10;
const rateBuckets = new Map();
const approvingInFlight = new Set();

const SUPPORTED_CATEGORIES = new Set([
  'real-estate',
  'lawyers-relocation',
  'car-rental-mobility',
  'medical-dental',
  'it-business-services',
  'renovation-construction',
]);

const SUPPORTED_CITIES = new Set(['Limassol', 'Nicosia', 'Larnaca', 'Paphos']);

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateBuckets.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateBuckets.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_MAX_REQ) return false;
  entry.count++;
  return true;
}

function sendJson(res, status, data, origin) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.vercel.app'))) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Internal-Secret';
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function validateSubmissionPayload(body) {
  const errors = [];
  if (!['en', 'el', 'ru'].includes(body.sourceLang || 'en')) {
    errors.push('Invalid language');
  }
  const name = String(body.name || '').trim();
  if (name.length < 2 || name.length > 120) {
    errors.push('Business name must be 2-120 characters');
  }
  const categorySlug = String(body.categorySlug || '').trim();
  if (!SUPPORTED_CATEGORIES.has(categorySlug)) {
    errors.push('Invalid category');
  }
  const city = String(body.city || 'Limassol').trim();
  if (!SUPPORTED_CITIES.has(city)) {
    errors.push('Invalid city');
  }
  const phone = String(body.phone || '').trim();
  if (phone.replace(/\D/g, '').length < 8) {
    errors.push('Valid +357 phone number is required');
  }
  const description = String(body.description || '').trim();
  if (description.length < 10 || description.length > 150) {
    errors.push('Description must be 10-150 characters');
  }
  const email = String(body.applicantEmail || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    errors.push('Valid applicant email is required');
  }
  return errors;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendTelegramModerationCard(submission, payload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_HOME_CHANNEL;
  if (!token || !chatId) {
    return { sent: false, reason: 'Telegram credentials not configured' };
  }

  const text =
    `🇨🇾 <b>[CYPRUS] Новая заявка на модерацию</b>\n\n` +
    `<b>ID:</b> <code>${escapeHtml(submission.id)}</code>\n` +
    `<b>Компания:</b> ${escapeHtml(payload.name)}\n` +
    `<b>Город:</b> ${escapeHtml(submission.city)}\n` +
    `<b>Категория:</b> <code>${escapeHtml(submission.category_slug)}</code>\n` +
    `<b>Телефон / WA:</b> ${escapeHtml(payload.phone)}${payload.whatsapp ? ` | WA: ${escapeHtml(payload.whatsapp)}` : ''}\n` +
    `<b>Сайт:</b> ${escapeHtml(payload.website || '—')}\n` +
    `<b>Описание:</b> ${escapeHtml(payload.description)}\n` +
    `<b>Язык:</b> ${escapeHtml(submission.source_lang.toUpperCase())}`;

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '✅ Одобрить', callback_data: `cti:approve:${submission.id}` },
        { text: '❌ Отклонить', callback_data: `cti:reject:${submission.id}` },
      ],
      [{ text: '🔎 Детали', callback_data: `cti:details:${submission.id}` }],
    ],
  };

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...(TELEGRAM_MODERATION_BUTTONS ? { reply_markup: replyMarkup } : {}),
      }),
    });
    const data = await res.json();
    return { sent: Boolean(data.ok), messageId: data.result?.message_id };
  } catch (err) {
    return { sent: false, reason: err.message };
  }
}

const db = initDatabase(DATA_DIR);

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {}, origin);
  }

  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    return sendJson(res, 200, { ok: true, service: 'cyprustopindex-submissions' }, origin);
  }

  if (req.method === 'POST' && url.pathname === '/api/submissions') {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return sendJson(res, 429, { ok: false, error: 'Too many requests. Please try again later.' }, origin);
    }

    try {
      const body = await readJsonBody(req);
      const errors = validateSubmissionPayload(body);
      if (errors.length > 0) {
        return sendJson(res, 400, { ok: false, error: errors[0], errors }, origin);
      }

      const id = generateSubmissionId();
      const now = new Date().toISOString();
      const payload = {
        name: String(body.name).trim(),
        city: String(body.city || 'Limassol').trim(),
        phone: String(body.phone).trim(),
        whatsapp: body.whatsapp ? String(body.whatsapp).trim() : '',
        website: body.website ? String(body.website).trim() : '',
        address: body.address ? String(body.address).trim() : '',
        description: String(body.description).trim(),
      };

      let imagePath = null;
      if (body.imageDataUrl && typeof body.imageDataUrl === 'string' && body.imageDataUrl.startsWith('data:image/')) {
        const uploadDir = path.join(DATA_DIR, 'uploads');
        fs.mkdirSync(uploadDir, { recursive: true });
        const ext = body.imageDataUrl.includes('webp') ? 'webp' : body.imageDataUrl.includes('png') ? 'png' : 'jpg';
        const base64 = body.imageDataUrl.split(',')[1] || '';
        imagePath = path.join(uploadDir, `${id}.${ext}`);
        fs.writeFileSync(imagePath, Buffer.from(base64, 'base64'));
      }

      const submission = {
        id,
        type: body.type === 'specialist' ? 'specialist' : 'company',
        source_lang: body.sourceLang || 'en',
        city: payload.city,
        category_slug: String(body.categorySlug).trim(),
        payload_json: JSON.stringify(payload),
        applicant_email: String(body.applicantEmail || '').trim(),
        image_path: imagePath,
        status: 'pending',
        created_at: now,
        updated_at: now,
      };

      db.prepare(
        `INSERT INTO submissions (id, type, source_lang, city, category_slug, payload_json, applicant_email, image_path, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
      ).run(
        submission.id,
        submission.type,
        submission.source_lang,
        submission.city,
        submission.category_slug,
        submission.payload_json,
        submission.applicant_email,
        submission.image_path,
        submission.created_at,
        submission.updated_at
      );

      logAudit(db, id, ip, 'submitted', { city: submission.city, category: submission.category_slug });
      const tg = await sendTelegramModerationCard(submission, payload);
      if (tg.sent && tg.messageId) {
        db.prepare('UPDATE submissions SET telegram_message_id = ?, telegram_notified = 1 WHERE id = ?').run(tg.messageId, id);
      }

      return sendJson(res, 201, { ok: true, id, status: 'pending' }, origin);
    } catch (err) {
      return sendJson(res, 400, { ok: false, error: err.message }, origin);
    }
  }

  if (req.method === 'POST' && url.pathname === '/internal/moderation') {
    if (!INTERNAL_SECRET || req.headers['x-internal-secret'] !== INTERNAL_SECRET) {
      return sendJson(res, 403, { ok: false, error: 'Forbidden' }, origin);
    }

    try {
      const body = await readJsonBody(req);
      const { action, submissionId, adminUserId = 'telegram-admin', reason = '' } = body;
      const sub = db.prepare('SELECT * FROM submissions WHERE id = ?').get(submissionId);
      if (!sub) {
        return sendJson(res, 404, { ok: false, error: 'Submission not found' }, origin);
      }

      if (action === 'details') {
        return sendJson(res, 200, {
          ok: true,
          submission: {
            id: sub.id,
            city: sub.city,
            categorySlug: sub.category_slug,
            sourceLang: sub.source_lang,
            status: sub.status,
            publishStatus: sub.publish_status,
            payload: JSON.parse(sub.payload_json),
          },
        }, origin);
      }

      if (sub.status !== 'pending') {
        return sendJson(res, 409, { ok: false, status: sub.status, error: 'Already processed' }, origin);
      }

      if (action === 'reject') {
        db.prepare(
          `UPDATE submissions SET status = 'rejected', reviewed_by = ?, reviewed_at = ?, rejection_reason = ?, updated_at = ? WHERE id = ?`
        ).run(adminUserId, new Date().toISOString(), reason, new Date().toISOString(), submissionId);
        logAudit(db, submissionId, adminUserId, 'rejected', { reason });
        return sendJson(res, 200, { ok: true, status: 'rejected' }, origin);
      }

      if (action === 'approve') {
        if (approvingInFlight.has(submissionId)) {
          return sendJson(res, 409, { ok: false, status: 'publishing', error: 'Approval already in progress' }, origin);
        }
        approvingInFlight.add(submissionId);
        try {
          const result = await publishApprovedSubmission(db, sub, adminUserId);
          return sendJson(res, 200, { ok: true, status: 'approved', ...result }, origin);
        } finally {
          approvingInFlight.delete(submissionId);
        }
      }

      return sendJson(res, 400, { ok: false, error: 'Unknown action' }, origin);
    } catch (err) {
      return sendJson(res, 500, { ok: false, error: err.message }, origin);
    }
  }

  return sendJson(res, 404, { ok: false, error: 'Not found' }, origin);
});

server.listen(PORT, HOST, () => {
  console.log(`[CyprusTopIndex] Submissions & Moderation server listening on http://${HOST}:${PORT} (DB: ${DATA_DIR}/submissions.db)`);
});
