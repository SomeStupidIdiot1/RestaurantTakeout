const { UserInputError, AuthenticationError } = require("apollo-server");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const Item = require("./models/Item");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const resolvers = {
  Query: {
    me: (_, __, context) => context.currentUser,
  },
  Mutation: {
    addItem: async (_, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      const item = new Item({ ...args });
      return item
        .save()
        .then((res) => {
          user.items = user.items.concat(res._id);
          user.save();
          return res;
        })
        .catch((err) => {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          });
        });
    },
    editItem: (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (!context.currentUser.items.find((val) => String(val._id) === args.id))
        throw new AuthenticationError("this item does not belong to this user");
      const newArgs = { name: args.name, cost: args.cost };
      if (args.description) newArgs.description = args.description;
      return Item.findByIdAndUpdate(args.id, newArgs);
    },
    deleteItem: (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (!context.currentUser.items.find((val) => String(val._id) === args.id))
        throw new AuthenticationError("this item does not belong to this user");
      return Item.findByIdAndDelete(args.id);
    },
    createUser: async (_, args) => {
      const passwordHash = await bcrypt.hash(args.password, saltRounds);
      const actualArgs = { ...args };
      delete actualArgs.password;
      const user = new User({ ...actualArgs, passwordHash, items: [] });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ email: args.email });
      if (user && !(await bcrypt.compare(args.password, user.passwordHash))) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        email: user.email,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};
module.exports = resolvers;
