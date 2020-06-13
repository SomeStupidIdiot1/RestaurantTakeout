const { createTestClient } = require("apollo-server-testing");

const typeDefs = require("../../typeDefs");
const context = require("../../controllers/context");
const resolvers = require("../../controllers/resolvers");
const { ApolloServer } = require("apollo-server");

const createClient = (customContext) =>
  createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      context: customContext ? customContext : context,
    })
  );
module.exports = { createClient };
