const path = require('path');
const fs = require('fs');

const BASE_PATH = fs.realpathSync(process.cwd());
const resolvePath = (resolve) => path.resolve(BASE_PATH, resolve);
const HOST = process.env.HOST || 'localhost';
module.exports = { resolvePath, HOST };
