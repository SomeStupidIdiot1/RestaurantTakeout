require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.DEVELOPMENT_MONGODB_URI;
} else if (process.env.NODE_ENV === "test")
  MONGODB_URI = process.env.TEST_MONGODB_URI;

module.exports = { JWT_SECRET, MONGODB_URI };
