const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../util/config");
const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id)
      .populate("items")
      .populate({ path: "categories", populate: { path: "items" } });
    return { currentUser };
  }
};
module.exports = context;
