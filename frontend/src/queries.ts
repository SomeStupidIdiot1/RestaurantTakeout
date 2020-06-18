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
