const crypto = require('crypto');

const TOKENGENERATION = crypto.randomBytes(64).toString('hex');

console.log(TOKENGENERATION);