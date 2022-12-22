require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,

  AUTH0: {
    SECRET: process.env.AUTH0_SECRET,
    BASE_URL: process.env.AUTH0_BASE_URL,
    CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    API_AUDIENCE: process.env.AUTH0_API_AUDIENCE
  },

  SHIPDAY: {
    API_KEY: process.env.SHIPDAY_API_KEY,
    API_URL: process.env.SHIPDAY_API_URL
  },

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE

};
