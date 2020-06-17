import gql from "graphql-tag";

export const ADD_ITEM = gql`
  mutation addItem($name: String!, $cost: Float!, $description: String) {
    addItem(name: $name, cost: $cost, description: $description) {
      name
      description
      cost
      id
    }
  }
`;
export const EDIT_ITEM = gql`
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
export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      name
      description
      cost
      id
    }
  }
`;
export const DELETE_ALL_ITEMS = gql`
  mutation deleteAllItems {
    deleteAllItems
  }
`;
export const CREATE_USER = gql`
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
      id
    }
  }
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`;
export const DELETE_USER = gql`
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
        id
      }
      id
    }
  }
`;