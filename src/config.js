const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

module.exports = {
    env,
    appSettings: {
        access_token_expiration: '3600s',
    },
};