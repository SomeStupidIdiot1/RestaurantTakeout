const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server");
const { JWT_SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const Item = require("../models/Item");
const User = require("../models/User");
const Category = require("../models/Category");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^\S+@\S+$/;
const PASS_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,40}$/;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const resolvers = {
  Query: {
    me: (_, __, context) => context.currentUser,
    getItems: (_, __, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      return context.currentUser.items;
    },
    getCategories: (_, __, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      return context.currentUser.categories;
    },
    getItemsNotInCategory: (_, __, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      const items = context.currentUser.items;
      const categoryItems = [].concat.apply(
        [],
        context.currentUser.categories.map(({ items }) =>
          items.map(({ _id }) => String(_id))
        )
      );
      return items.filter(({ _id }) => {
        return !categoryItems.includes(String(_id));
      });
    },
  },
  Mutation: {
    addItem: async (_, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      const newArgs = { ...args };
      if (args.imgStringBase64) {
        try {
          const res = await cloudinary.uploader.upload(args.imgStringBase64, {
            folder: context.currentUser._id,
          });
          newArgs.imgUrl = res.url;
          newArgs.imgId = res.public_id;
        } catch (e) {
          if (e) throw new UserInputError("Can't accept the image");
        }
      }
      delete newArgs.imgStringBase64;
      let item = new Item({ ...newArgs });
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
    addCategory: async (_, args, context) => {
      const user = context.currentUser;

      if (!user) throw new AuthenticationError("not logged in");
      let category = new Category({ ...args, items: [] });
      try {
        category = await category.save();

        await User.findByIdAndUpdate(user._id, {
          $push: { categories: category._id },
        });
        return category;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editCategory: (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (
        !context.currentUser.categories.find(
          (val) => String(val._id) === args.id
        )
      )
        throw new AuthenticationError("this item does not belong to this user");
      const id = args.id;
      return Category.findByIdAndUpdate(id, { ...args }).populate("items");
    },
    addItemToCategory: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (
        !context.currentUser.categories.find(
          (val) => String(val._id) === args.id
        )
      )
        throw new AuthenticationError(
          "this category does not belong to this user"
        );
      return await Category.findByIdAndUpdate(args.id, {
        $push: { items: { $each: args.itemId } },
      }).populate("items");
    },
    removeItemFromCategory: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (
        !context.currentUser.categories.find(
          (val) => String(val._id) === args.id
        )
      )
        throw new AuthenticationError(
          "this category does not belong to this user"
        );

      return await Category.findByIdAndUpdate(args.id, {
        $pull: { items: args.itemId },
      }).populate("items");
    },
    deleteItem: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      if (!context.currentUser.items.find((val) => String(val._id) === args.id))
        throw new AuthenticationError("this item does not belong to this user");
      const publicId = (await Item.findById(args.id)).imgId;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, (err) => {
          if (err) throw new ApolloError("Couldn't delete image");
        });
      }
      return await Item.findByIdAndDelete(args.id);
    },
    deleteAllItems: async (_, __, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      const ids = context.currentUser.items.map(({ _id }) => _id);
      console.log(context.currentUser._id);
      await cloudinary.api.delete_resources_by_prefix(
        `${context.currentUser._id}/`
      );
      await Item.deleteMany({ _id: { $in: ids } });
      return true;
    },
    createUser: async (_, args) => {
      if (await User.findOne({ email: args.email }))
        throw new UserInputError("Email was already registered.");
      if (!args.email.match(EMAIL_REGEX))
        throw new UserInputError("Email is invalid.");
      if (!args.password.match(PASS_REGEX))
        throw new UserInputError("Password does not pass regex.");
      const passwordHash = await bcrypt.hash(args.password, SALT_ROUNDS);
      const actualArgs = { ...args };
      delete actualArgs.password;
      const user = new User({ ...actualArgs, passwordHash, items: [] });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    editUserContactInfo: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not logged in");
      return User.findByIdAndUpdate(context.currentUser._id, args);
    },
    editUserCredentials: async (_, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("not logged in");
      if (!(await bcrypt.compare(args.currPassword, user.passwordHash))) {
        throw new UserInputError("wrong credentials");
      }
      const updateArgs = {};
      if (args.email) {
        if (await User.findOne({ email: args.email }))
          throw new UserInputError("Email was already registered.");
        if (!args.email.match(EMAIL_REGEX))
          throw new UserInputError("Email is invalid.");
        updateArgs.email = args.email;
      }
      if (args.password) {
        if (!args.password.match(PASS_REGEX))
          throw new UserInputError("Password does not pass regex.");
        const passwordHash = await bcrypt.hash(args.password, SALT_ROUNDS);
        updateArgs.passwordHash = passwordHash;
      }
      return User.findByIdAndUpdate(context.currentUser._id, updateArgs);
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
        _id: context.currentUser._id,
      }).populate("items");
      await Item.deleteMany({ _id: { $in: ids } });
      return user;
    },
  },
};
module.exports = resolvers;
