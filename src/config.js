// Read environment variables
const {config} = require('dotenv');
config();

const configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "notes-db-app",
  MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
    process.env.MONGODB_DATABASE || "notes-db-app"
  }`,
};

module.exports = configurations;