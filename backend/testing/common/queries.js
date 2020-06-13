const gql = require("graphql-tag");

const GET_ME = gql`
  query me {
    me {
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
module.exports = { GET_ME };
