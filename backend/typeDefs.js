const gql = require("graphql-tag");

const typeDefs = gql`
  type Item {
    name: String!
    description: String
    cost: Float!
    id: ID!
  }
  type User {
    email: String!
    restaurantName: String!
    address: String
    phone: String
    items: [Item!]!
    categories: [Category!]!
    id: ID!
    facebook: String
    youtube: String
    instagram: String
    twitter: String
  }
  type Category {
    name: String!
    items: [Item!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
    getItems: [Item]
    getCategories: [Category]
  }
  type Mutation {
    addItem(name: String!, cost: Float!, description: String): Item
    editItem(id: ID!, name: String, cost: Float, description: String): Item
    deleteItem(id: ID!): Item
    deleteAllItems: Boolean
    addCategory(name: String!): Category
    editCategoryName(id: ID!, name: String!): Category
    addItemToCategory(id: ID!, itemId: ID!): Category
    removeItemFromCategory(id: ID!, itemId: ID!): Category
    createUser(
      email: String!
      password: String!
      restaurantName: String!
      address: String
      phone: String
      facebook: String
      youtube: String
      instagram: String
      twitter: String
    ): User
    editUserContactInfo(
      restaurantName: String
      address: String
      phone: String
      facebook: String
      youtube: String
      instagram: String
      twitter: String
    ): User
    editUserCredentials(
      currPassword: String!
      email: String
      password: String
    ): User
    login(email: String!, password: String!): Token
    deleteUser: User
  }
`;
module.exports = typeDefs;
