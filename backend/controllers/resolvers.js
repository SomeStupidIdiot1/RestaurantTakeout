const { UserInputError, AuthenticationError } = require("apollo-server");
const { JWT_SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");
const User = require("../models/User");
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
      let item = new Item({ ...args });
      try {
        item = await item.save();
        await User.findOneAndUpdate(
          { _id: user._id },
          { $push: { items: item._id } }
        );
        return item;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editItem: (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (!context.currentUser.items.find((val) => String(val._id) === args.id))
        throw new AuthenticationError("this item does not belong to this user");
      const newArgs = { ...args };
      delete newArgs.id;
      return Item.findByIdAndUpdate(args.id, newArgs);
    },
    deleteItem: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (!context.currentUser.items.find((val) => String(val._id) === args.id))
        throw new AuthenticationError("this item does not belong to this user");
      return await Item.findByIdAndDelete(args.id);
    },
    deleteAllItems: async (_, __, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      const ids = context.currentUser.items.map(({ _id }) => _id);
      await Item.deleteMany({ _id: { $in: ids } });
      return true;
    },
    createUser: async (_, args) => {
      if (await User.findOne({ email: args.email }))
        throw new UserInputError("email is not unique");
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
      if (!user) throw new UserInputError("wrong credentials");
      const userForToken = {
        email: user.email,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    deleteUser: async (_, __, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      const ids = context.currentUser.items.map(({ _id }) => _id);
      const user = await User.findByIdAndDelete({
        _id: context.currentUser.id,
      }).populate("items");
      await Item.deleteMany({ _id: { $in: ids } });
      return user;
    },
  },
};
module.exports = resolvers;
