const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const env = require('../config/env');

const storageRoot = path.resolve(process.cwd(), env.uploadDir);

const ensureStorageRoot = async () => {
  await fs.mkdir(storageRoot, { recursive: true });
};

const createStoredFileName = (originalName) => {
  const extension = path.extname(originalName || '');
  return `${Date.now()}-${crypto.randomUUID()}${extension}`;
};

const saveBuffer = async ({ buffer, originalName }) => {
  await ensureStorageRoot();

  const filename = createStoredFileName(originalName);
  const absolutePath = path.join(storageRoot, filename);
  const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

  await fs.writeFile(absolutePath, buffer);

  return {
    filename,
    absolutePath,
    relativePath: path.relative(process.cwd(), absolutePath),
    checksum,
  };
};

const deleteByPath = async (filePath) => {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  try {
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
};

module.exports = {
  storageRoot,
  ensureStorageRoot,
  createStoredFileName,
  saveBuffer,
  deleteByPath,
};
