const jwt = require("jsonwebtoken");
const User = require("./models/User");
const JWT_SECRET = process.env.JWT_SECRET;
const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id).populate("items");
    return { currentUser };
  }
};
module.exports = context;
