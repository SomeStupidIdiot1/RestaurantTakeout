const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./controllers/resolvers");
const context = require("./controllers/context");
const { MONGODB_URI, IS_TESTING } = require("./util/config");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
if (!IS_TESTING) console.log("connecting to mongoose");
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (!IS_TESTING) console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  if (!IS_TESTING) console.log(`Server ready at ${url}`);
});
module.exports = { server, mongoose };
