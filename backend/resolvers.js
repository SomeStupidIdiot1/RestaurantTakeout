const { UserInputError } = require("apollo-server");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const Item = require("./models/Item");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const resolvers = {
  Query: {
    allItems: (_, args, context) => {},
    me: (_, __, context) => context.currentUser,
  },
  Mutation: {
    addItem: (_, args, context) => {},
    editItem: (_, args, context) => {},
    deleteItem: (_, args, context) => {},
    createUser: async (_, args) => {
      const passwordHash = await bcrypt.hash(args.password, saltRounds);
      const user = new User({ email: args.email, passwordHash });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_, args) => {
      const passwordHash = await bcrypt.hash(args.password, saltRounds);
      const user = await User.findOne({ email: args.email, passwordHash });
      if (!user) throw new UserInputError("wrong credentials");

      const userForToken = {
        email: user.email,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};
module.exports = resolvers;
