const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const DB_FILE = path.join(DATA_DIR, 'ironforge.db');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  console.error('Source database file not found:', DB_FILE);
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFilename = `ironforge_backup_${timestamp}.db`;
const backupPath = path.join(BACKUP_DIR, backupFilename);

// Safe atomic copy
fs.copyFileSync(DB_FILE, backupPath);

// Verify backup file can be opened and queried
try {
  const backupDb = new DatabaseSync(backupPath);
  const leadsCount = backupDb.prepare('SELECT count(*) as count FROM leads').get().count;
  const membershipsCount = backupDb.prepare('SELECT count(*) as count FROM membership_enrollments').get().count;
  const messagesCount = backupDb.prepare('SELECT count(*) as count FROM contact_messages').get().count;

  console.log('====================================================');
  console.log('DATABASE BACKUP VERIFICATION SUCCEEDED');
  console.log('====================================================');
  console.log(`Backup Location: ${backupPath}`);
  console.log(`File Size: ${fs.statSync(backupPath).size} bytes`);
  console.log(`Verified Records:`);
  console.log(`  - leads: ${leadsCount}`);
  console.log(`  - membership_enrollments: ${membershipsCount}`);
  console.log(`  - contact_messages: ${messagesCount}`);
  console.log('====================================================');
} catch (err) {
  console.error('Backup verification failed:', err);
  process.exit(1);
}
