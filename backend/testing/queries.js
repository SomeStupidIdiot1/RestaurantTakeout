const gql = require("graphql-tag");

const GET_LAUNCH = gql`
  query launch($id: ID!) {
    launch(id: $id) {
      id
      isBooked
      rocket {
        type
      }
      mission {
        name
      }
    }
  }
`;
