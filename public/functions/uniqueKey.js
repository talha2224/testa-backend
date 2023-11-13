const crypto = require('crypto');

// UNIQUE KEY GENERATOR
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = {generateSecretKey}