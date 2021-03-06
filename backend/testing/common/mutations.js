const gql = require("graphql-tag");

const ADD_ITEM = gql`
  mutation addItem($name: String!, $cost: Float!, $description: String) {
    addItem(name: $name, cost: $cost, description: $description) {
      name
      description
      cost
      id
    }
  }
`;
const EDIT_ITEM = gql`
  mutation editItem(
    $id: ID!
    $name: String
    $cost: Float
    $description: String
  ) {
    editItem(id: $id, name: $name, cost: $cost, description: $description) {
      name
      description
      cost
      id
    }
  }
`;
const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      name
      description
      cost
    }
  }
`;
const DELETE_ALL_ITEMS = gql`
  mutation deleteAllItems {
    deleteAllItems
  }
`;
const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $restaurantName: String!
    $address: String!
    $phone: String!
    $facebook: String
    $youtube: String
    $instagram: String
    $twitter: String
  ) {
    createUser(
      email: $email
      password: $password
      restaurantName: $restaurantName
      address: $address
      phone: $phone
      facebook: $facebook
      youtube: $youtube
      instagram: $instagram
      twitter: $twitter
    ) {
      email
      restaurantName
      address
      phone
      facebook
      youtube
      instagram
      twitter
    }
  }
`;
const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`;
const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      email
      restaurantName
      address
      phone
      facebook
      youtube
      instagram
      twitter
      items {
        name
        description
        cost
      }
    }
  }
`;
const EDIT_USER_CONTACT = gql`
  mutation editUserContactInfo(
    $restaurantName: String
    $address: String
    $phone: String
    $facebook: String
    $youtube: String
    $instagram: String
    $twitter: String
  ) {
    editUserContactInfo(
      restaurantName: $restaurantName
      address: $address
      phone: $phone
      facebook: $facebook
      youtube: $youtube
      instagram: $instagram
      twitter: $twitter
    ) {
      email
      restaurantName
      address
      phone
      facebook
      youtube
      instagram
      twitter
    }
  }
`;
const EDIT_USER_CREDENTIALS = gql`
  mutation editUserCredentials(
    $currPassword: String!
    $email: String
    $password: String
  ) {
    editUserCredentials(
      currPassword: $currPassword
      email: $email
      password: $password
    ) {
      email
      restaurantName
      address
      phone
      facebook
      youtube
      instagram
      twitter
    }
  }
`;
module.exports = {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  CREATE_USER,
  LOGIN,
  DELETE_USER,
  EDIT_USER_CONTACT,
  EDIT_USER_CREDENTIALS,
};
