const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mysqlHost: process.env.MYSQL_HOST || 'localhost',
  mysqlPort: Number(process.env.MYSQL_PORT || 3306),
  mysqlUser: process.env.MYSQL_USER || 'root',
  mysqlPassword: process.env.MYSQL_PASSWORD || '',
  mysqlDatabase: process.env.MYSQL_DATABASE || 'cloudvault',
  jwtSecret: process.env.JWT_SECRET || '',
  uploadDir: process.env.UPLOAD_DIR || 'backend/uploads',
  maxFileSize: Number(process.env.MAX_FILE_SIZE || 52428800),
};

module.exports = env;
