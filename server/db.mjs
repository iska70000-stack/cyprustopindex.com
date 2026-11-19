import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

export function initDatabase(dataDir) {
  fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, 'submissions.db');
  const db = new DatabaseSync(dbPath);

  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;

    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL DEFAULT 'company' CHECK(type IN ('company', 'specialist')),
      source_lang TEXT NOT NULL CHECK(source_lang IN ('en', 'el', 'ru')),
      city TEXT NOT NULL DEFAULT 'Limassol',
      category_slug TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      applicant_email TEXT NOT NULL DEFAULT '',
      image_path TEXT,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
      telegram_message_id INTEGER,
      telegram_notified INTEGER NOT NULL DEFAULT 0,
      reviewed_by TEXT,
      reviewed_at TEXT,
      rejection_reason TEXT,
      publish_status TEXT NOT NULL DEFAULT 'none' CHECK(publish_status IN ('none', 'publishing', 'published', 'failed')),
      published_entity_id TEXT,
      publish_error TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id TEXT,
      actor TEXT NOT NULL,
      action TEXT NOT NULL,
      details_json TEXT,
      created_at TEXT NOT NULL
    );
  `);

  return db;
}

export function generateSubmissionId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = crypto.randomBytes(3).toString('hex');
  return `cti-${stamp}-${rand}`;
}

export function logAudit(db, submissionId, actor, action, details = {}) {
  db.prepare(
    `INSERT INTO audit_log (submission_id, actor, action, details_json, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(submissionId, actor, action, JSON.stringify(details), new Date().toISOString());
}
