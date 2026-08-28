/**
 * IRONFORGE FITNESS — PostgreSQL Migration Script (Step 4)
 * Safe Non-Destructive Transfer from local SQLite to Production PostgreSQL
 */

const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

// Load environment variables if available
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  });
}

const DATABASE_URL = process.env.DATABASE_URL;
const SQLITE_PATH = path.join(__dirname, '..', 'data', 'ironforge.db');

async function runMigration() {
  console.log('====================================================');
  console.log('IRONFORGE FITNESS — SQLITE TO POSTGRESQL MIGRATION');
  console.log('====================================================\n');

  if (!DATABASE_URL) {
    console.log('ℹ No DATABASE_URL found in environment.');
    console.log('To migrate to PostgreSQL:');
    console.log('1. Set DATABASE_URL=postgres://user:pass@host:5432/dbname in .env');
    console.log('2. Run: npm run migrate\n');
    console.log('SQLite database at data/ironforge.db remains intact and fully functional.');
    return;
  }

  let pg;
  try {
    pg = require('pg');
  } catch (err) {
    console.error('Error: "pg" module is required to connect to PostgreSQL.');
    console.error('Run: npm install pg');
    process.exit(1);
  }

  if (!fs.existsSync(SQLITE_PATH)) {
    console.error('SQLite database not found at:', SQLITE_PATH);
    process.exit(1);
  }

  const sqliteDb = new DatabaseSync(SQLITE_PATH);
  const pgClient = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    await pgClient.connect();
    console.log('✓ Connected to PostgreSQL target database');

    await pgClient.query('BEGIN');

    // 1. Create PostgreSQL Schema
    console.log('Creating PostgreSQL tables...');
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        email VARCHAR(160) NOT NULL,
        goal VARCHAR(80) NOT NULL,
        preferred_time VARCHAR(50) NOT NULL,
        experience VARCHAR(50) NOT NULL,
        whatsapp_opt_in INTEGER NOT NULL DEFAULT 0,
        status VARCHAR(40) DEFAULT 'NEW',
        created_at TIMESTAMPTZ NOT NULL
      );

      CREATE TABLE IF NOT EXISTS membership_enrollments (
        id SERIAL PRIMARY KEY,
        plan_tier VARCHAR(50) NOT NULL,
        billing_cycle VARCHAR(50) NOT NULL,
        price INTEGER NOT NULL,
        name VARCHAR(120) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        email VARCHAR(160) NOT NULL,
        start_date VARCHAR(50),
        whatsapp_opt_in INTEGER NOT NULL DEFAULT 1,
        status VARCHAR(50) DEFAULT 'PENDING_ONBOARDING',
        created_at TIMESTAMPTZ NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(160) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        subject VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(40) DEFAULT 'UNREAD',
        created_at TIMESTAMPTZ NOT NULL
      );
    `);
    console.log('✓ Tables created/verified in PostgreSQL');

    // 2. Migrate Leads
    const leads = sqliteDb.prepare('SELECT * FROM leads ORDER BY id ASC').all();
    console.log(`Migrating ${leads.length} leads...`);
    for (const row of leads) {
      await pgClient.query(
        `INSERT INTO leads (id, name, phone, email, goal, preferred_time, experience, whatsapp_opt_in, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO NOTHING`,
        [row.id, row.name, row.phone, row.email, row.goal, row.preferred_time, row.experience, row.whatsapp_opt_in, row.status, row.created_at]
      );
    }
    await pgClient.query(`SELECT setval(pg_get_serial_sequence('leads', 'id'), coalesce(max(id), 1)) FROM leads;`);
    console.log(`✓ Leads migrated successfully`);

    // 3. Migrate Membership Enrollments
    const memberships = sqliteDb.prepare('SELECT * FROM membership_enrollments ORDER BY id ASC').all();
    console.log(`Migrating ${memberships.length} memberships...`);
    for (const row of memberships) {
      await pgClient.query(
        `INSERT INTO membership_enrollments (id, plan_tier, billing_cycle, price, name, phone, email, start_date, whatsapp_opt_in, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO NOTHING`,
        [row.id, row.plan_tier, row.billing_cycle, row.price, row.name, row.phone, row.email, row.start_date, row.whatsapp_opt_in, row.status, row.created_at]
      );
    }
    await pgClient.query(`SELECT setval(pg_get_serial_sequence('membership_enrollments', 'id'), coalesce(max(id), 1)) FROM membership_enrollments;`);
    console.log(`✓ Memberships migrated successfully`);

    // 4. Migrate Contact Messages
    const messages = sqliteDb.prepare('SELECT * FROM contact_messages ORDER BY id ASC').all();
    console.log(`Migrating ${messages.length} contact messages...`);
    for (const row of messages) {
      await pgClient.query(
        `INSERT INTO contact_messages (id, name, email, phone, subject, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [row.id, row.name, row.email, row.phone, row.subject, row.message, row.status, row.created_at]
      );
    }
    await pgClient.query(`SELECT setval(pg_get_serial_sequence('contact_messages', 'id'), coalesce(max(id), 1)) FROM contact_messages;`);
    console.log(`✓ Contact messages migrated successfully`);

    await pgClient.query('COMMIT');

    console.log('\n====================================================');
    console.log('🎉 POSTGRESQL MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('====================================================');
  } catch (err) {
    await pgClient.query('ROLLBACK');
    console.error('Migration failed (rolled back):', err);
  } finally {
    await pgClient.end();
  }
}

runMigration().catch(console.error);
