const { createTestClient } = require("apollo-server-testing");

const typeDefs = require("../../typeDefs");
const context = require("../../controllers/context");
const resolvers = require("../../controllers/resolvers");
const { ApolloServer } = require("apollo-server");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const PASSWORD = "Password1?";

const createClient = (customContext) =>
  createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      context: customContext ? customContext : context,
    })
  );
const createClientWithUserContext = async () => {
  const passwordHash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);
  let user = new User({
    email: "someemail@gmail.com",
    restaurantName: "name",
    address: "address",
    phone: "123 1231 123",
    passwordHash,
    items: [],
  });
  user = await user.save();
  return createClient(async () => {
    const currentUser = await User.findById(user._id).populate("items");
    return {
      currentUser,
    };
  });
};
module.exports = { createClient, createClientWithUserContext, PASSWORD };
