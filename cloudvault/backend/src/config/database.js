const mysql = require('mysql2/promise');

const env = require('./env');

const pool = mysql.createPool({
  host: env.mysqlHost,
  port: env.mysqlPort,
  user: env.mysqlUser,
  password: env.mysqlPassword,
  database: env.mysqlDatabase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
  dateStrings: true,
});

const query = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

const columnExists = async (tableName, columnName) => {
  const rows = await query(
    `
      SELECT 1
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ?
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
      LIMIT 1
    `,
    [env.mysqlDatabase, tableName, columnName]
  );
  return rows.length > 0;
};

const ensureColumn = async (tableName, columnDefinition) => {
  const { name } = columnDefinition;
  const exists = await columnExists(tableName, name);

  if (exists) {
    return;
  }

  await query(`ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition.sql}`);
};

const ensureSchema = async () => {
  await ensureColumn('users', { name: 'role', sql: "role VARCHAR(32) NOT NULL DEFAULT 'user' AFTER password" });
  await ensureColumn('users', { name: 'last_login_at', sql: 'last_login_at TIMESTAMP NULL DEFAULT NULL AFTER role' });
  await ensureColumn('users', { name: 'updated_at', sql: 'updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at' });

  await ensureColumn('files', { name: 'checksum', sql: 'checksum CHAR(64) DEFAULT NULL AFTER path' });
  await ensureColumn('files', { name: 'updated_at', sql: 'updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER uploaded_at' });
};

const ping = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      error.message =
        'MySQL access was denied. Check MYSQL_USER and MYSQL_PASSWORD in backend/.env, then make sure the account can access the cloudvault database.';
    }

    throw error;
  }
};

module.exports = {
  pool,
  query,
  ping,
  ensureSchema,
};