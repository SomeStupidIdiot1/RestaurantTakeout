const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");
const context = require("../context");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
const { query, mutate } = createTestClient(server);

test("test", () => {
  expect("tkaer").toBe("tkaer");
});
