import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { logAudit } from './db.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const registryPath = path.join(rootDir, 'scripts', 'data', 'cyprus-verified-registry.json');

export function slugifyEntityId(name, existingIds) {
  const base =
    String(name || 'cyprus-business')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'cyprus-business';

  let candidate = base;
  let n = 2;
  while (existingIds.has(candidate)) {
    candidate = `${base}-${n++}`;
  }
  return candidate;
}

async function triggerVercelDeployHook() {
  const hookUrl = process.env.CTI_VERCEL_DEPLOY_HOOK_URL;
  if (!hookUrl) return { triggered: false };
  try {
    const res = await fetch(hookUrl, { method: 'POST' });
    return { triggered: res.ok, status: res.status };
  } catch (err) {
    return { triggered: false, error: err.message };
  }
}

export async function publishApprovedSubmission(db, submission, adminUserId) {
  const payload = JSON.parse(submission.payload_json);
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
  const existingIds = new Set(registry.map((r) => r.id));
  const entityId = slugifyEntityId(payload.name, existingIds);

  const city = submission.city || payload.city || 'Limassol';
  const desc = payload.description || '';
  const addr = payload.address || `${city}, Republic of Cyprus`;

  const newEntry = {
    id: entityId,
    category: submission.category_slug,
    city,
    rating: 4.8,
    name: {
      en: payload.name,
      el: payload.name,
      ru: payload.name,
    },
    agency: {
      en: `Verified Business • ${city}`,
      el: `Επαληθευμένη Επιχείρηση • ${city}`,
      ru: `Проверенная компания • ${city}`,
    },
    description: {
      en: desc,
      el: desc,
      ru: desc,
    },
    address: {
      en: addr,
      el: addr,
      ru: addr,
    },
    phones: payload.phone ? [payload.phone] : [],
    ...(payload.whatsapp ? { whatsapp: payload.whatsapp } : {}),
    website: payload.website || 'https://cyprustopindex.com',
  };

  registry.push(newEntry);
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');

  // Regenerate verifiedDirectory.ts & freshness.json, then verify build
  execSync('node scripts/collect-cyprus-businesses.mjs', { cwd: rootDir, stdio: 'pipe' });
  execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });

  let gitPushed = false;
  if (process.env.CTI_AUTO_GIT_PUSH !== 'false') {
    try {
      execSync(
        'git add scripts/data/cyprus-verified-registry.json src/data/verifiedDirectory.ts src/data/freshness.json',
        { cwd: rootDir, stdio: 'pipe' }
      );
      execSync(`git commit -m "[CYPRUS] Publish approved listing: ${entityId}"`, {
        cwd: rootDir,
        stdio: 'pipe',
      });
      execSync('git push origin main', { cwd: rootDir, stdio: 'pipe' });
      gitPushed = true;
    } catch (gitErr) {
      logAudit(db, submission.id, adminUserId, 'git_push_warning', { error: gitErr.message });
    }
  }

  const hookRes = await triggerVercelDeployHook();

  db.prepare(
    `UPDATE submissions
     SET status = 'approved',
         publish_status = 'published',
         published_entity_id = ?,
         reviewed_by = ?,
         reviewed_at = ?,
         updated_at = ?
     WHERE id = ?`
  ).run(entityId, adminUserId, new Date().toISOString(), new Date().toISOString(), submission.id);

  logAudit(db, submission.id, adminUserId, 'approved_and_published', {
    entityId,
    gitPushed,
    vercelHook: hookRes,
  });

  return { entityId, gitPushed, vercelHook: hookRes };
}
