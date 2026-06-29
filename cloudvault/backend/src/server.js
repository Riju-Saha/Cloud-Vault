require('dotenv').config();

const database = require('./config/database');
const env = require('./config/env');
const app = require('./app');

const startServer = async () => {
  await database.ensureSchema();
  await database.ping();

  app.listen(env.port, () => {
    console.log(`CloudVault backend running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start CloudVault backend', error);
  process.exit(1);
});
