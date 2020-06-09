const { gql } = require("apollo-server");

const typeDefs = gql`
  type Item {
    name: String!
    description: String
    cost: Float!
    id: ID!
  }
  type Combo {
    name: String!
    description: String
    cost: Float!
    items: [Item!]!
    id: ID!
  }
  type User {
    username: String!
    email: String!
    combos: [Combo!]!
    items: [Item!]!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addItem(name: String!, cost: Float!, description: String): Item
    editItem(
      id: ID!
      newName: String
      newCost: Float
      newDescription: String
    ): Item
    deleteItem(item: ID!): Item
    addCombo(
      name: String!
      description: String
      cost: Float!
      items: [ID!]!
    ): Combo
    editCombo(
      id: ID!
      newName: String
      newCost: Float
      newDescription: String
      newItems: [ID!]!
    ): Combo
    deleteCombo(combo: ID!): Combo
    createUser(email: String!, password: String!): User
    login(email: String!, password: String!): Token
  }
  type Query {
    allItems(costBelow: Float, nameIncludes: String): [Item]
    allCombos(
      costBelow: Float
      nameIncludes: String
      containsAll: [ID!]!
    ): [Combo]
    me: User
  }
`;
module.exports = typeDefs;
