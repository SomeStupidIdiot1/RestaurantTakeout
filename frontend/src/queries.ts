import gql from "graphql-tag";

export const GET_ME = gql`
  query {
    me {
      email
      restaurantName
      address
      phone
      items {
        name
        description
        cost
        id
      }
      id
      facebook
      youtube
      instagram
      twitter
    }
  }
`;
export const GET_ITEMS = gql`
  query {
    getItems {
      name
      description
      cost
      id
    }
  }
`;
