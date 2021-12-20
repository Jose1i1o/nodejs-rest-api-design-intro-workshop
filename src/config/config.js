const dotenv = require("dotenv");
const logger = require("loglevel");

dotenv.config();

const {
  NODE_ENV = 'development',
    MONGO_DB_URL_PRODUCTION,
    MONGO_DB_URL_DEVELOPMENT,
    MONGO_DB_URL_TEST,
    ACCESS_TOKEN_SECRET,
    PORT,
    ENCRYPTION_SALT_DEVELOPMENT,
    ENCRYPTION_SALT_PRODUCTION,
} = process.env;

// const ENV = process.env.NODE_ENV || "development";

// logger.enableAll();

const CONFIG = {
  production: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
      token: ACCESS_TOKEN_SECRET,
    },
  },
  development: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
      token: ACCESS_TOKEN_SECRET,
    },
  },
  test: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};