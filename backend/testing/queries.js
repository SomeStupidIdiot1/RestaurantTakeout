const gql = require("graphql-tag");

const GET_ME = gql`
  query me() {
    me() {
      email
      restaurantName
      address
      phone
      id
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
  }
`;
