const { gql } = require("apollo-server");

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
    address: String!
    phone: String!
    items: [Item!]!
    id: ID!
    facebook: String
    youtube: String
    instagram: String
    twitter: String
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    addItem(name: String!, cost: Float!, description: String): Item
    editItem(id: ID!, name: String, cost: Float, description: String): Item
    deleteItem(id: ID!): Item
    deleteAllItems: Boolean
    createUser(
      email: String!
      password: String!
      restaurantName: String!
      address: String!
      phone: String!
      facebook: String
      youtube: String
      instagram: String
      twitter: String
    ): User
    login(email: String!, password: String!): Token
  }
`;
module.exports = typeDefs;
