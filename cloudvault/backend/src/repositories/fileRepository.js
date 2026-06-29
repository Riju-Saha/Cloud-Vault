const crypto = require('crypto');

const database = require('../config/database');

const selectFileColumns = `
  id,
  filename,
  original_name AS originalName,
  mime_type AS mimeType,
  size,
  path,
  checksum,
  uploaded_at AS uploadedAt,
  user_id AS userId
`;

const fileRepository = {
  create(data) {
    const id = crypto.randomUUID();

    return database
      .query(
        'INSERT INTO files (id, filename, original_name, mime_type, size, path, checksum, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, data.filename, data.originalName, data.mimeType, data.size, data.path, data.checksum || null, data.userId]
      )
      .then(() => this.findByIdAndUserId(id, data.userId));
  },

  findByUserId(userId, options = {}) {
    const { search, sortBy = 'date', sortOrder = 'desc', skip = 0, take = 10 } = options;
    const orderByMap = {
      name: 'original_name',
      size: 'size',
      date: 'uploaded_at',
    };

    const orderColumn = orderByMap[sortBy] || orderByMap.date;
    const orderDirection = String(sortOrder).toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    const values = [userId];
    let whereClause = 'WHERE user_id = ?';

    if (search) {
      whereClause += ' AND original_name LIKE ?';
      values.push(`%${search}%`);
    }

    values.push(skip, take);

    return database.query(
      `SELECT ${selectFileColumns} FROM files ${whereClause} ORDER BY ${orderColumn} ${orderDirection} LIMIT ? OFFSET ?`,
      values
    );
  },

  countByUserId(userId, search) {
    const values = [userId];
    let whereClause = 'WHERE user_id = ?';

    if (search) {
      whereClause += ' AND original_name LIKE ?';
      values.push(`%${search}%`);
    }

    return database.query(`SELECT COUNT(*) AS total FROM files ${whereClause}`, values).then((rows) => Number(rows[0]?.total || 0));
  },

  findByIdAndUserId(id, userId) {
    return database.query(`SELECT ${selectFileColumns} FROM files WHERE id = ? AND user_id = ? LIMIT 1`, [id, userId]).then((rows) => rows[0] || null);
  },

  deleteByIdAndUserId(id, userId) {
    return database.query('DELETE FROM files WHERE id = ? AND user_id = ?', [id, userId]);
  },

  sumSizeByUserId(userId) {
    return database
      .query('SELECT COALESCE(SUM(size), 0) AS usedStorage FROM files WHERE user_id = ?', [userId])
      .then((rows) => ({ usedStorage: Number(rows[0]?.usedStorage || 0) }));
  },
};

module.exports = fileRepository;
