const crypto = require('crypto');

const database = require('../config/database');

const selectUserColumns = 'id, name, email, password, role, last_login_at AS lastLoginAt, created_at AS createdAt, updated_at AS updatedAt';
const selectPublicUserColumns = 'id, name, email, role, last_login_at AS lastLoginAt, created_at AS createdAt, updated_at AS updatedAt';

const userRepository = {
  findByEmail(email) {
    return database.query(`SELECT ${selectUserColumns} FROM users WHERE email = ? LIMIT 1`, [email]).then((rows) => rows[0] || null);
  },

  findById(id) {
    return database.query(`SELECT ${selectPublicUserColumns} FROM users WHERE id = ? LIMIT 1`, [id]).then((rows) => rows[0] || null);
  },

  create(data) {
    const id = crypto.randomUUID();

    return database
      .query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [id, data.name, data.email, data.password])
      .then(() => this.findById(id));
  },

  updateById(id, data) {
    const fields = [];
    const params = [];

    if (typeof data.name !== 'undefined') {
      fields.push('name = ?');
      params.push(data.name);
    }

    if (typeof data.password !== 'undefined') {
      fields.push('password = ?');
      params.push(data.password);
    }

    if (!fields.length) {
      return this.findById(id);
    }

    params.push(id);

    return database
      .query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, params)
      .then(() => this.findById(id));
  },

  updateLastLoginAt(id) {
    return database.query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [id]).then(() => this.findById(id));
  },
};

module.exports = userRepository;
