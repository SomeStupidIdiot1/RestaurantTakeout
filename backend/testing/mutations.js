const gql = require("graphql-tag");
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
const ADD_ITEM = gql`
  mutation addItem($name: String!, $cost: Float!, $description: String) {
    addItem(name: $name, cost: $cost, description: $description) {
      name
      description
      cost
      id 
  }
`;
const EDIT_ITEM = gql`
  mutation editItem($id: ID!, $name: String, $cost: Float, $description: String) {
    editItem(id: $id, name: $name, cost: $cost, description: $description) {
      name
      description
      cost
      id 
  }
`;
