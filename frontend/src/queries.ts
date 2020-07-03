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
        imgUrl
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
      imgUrl
    }
  }
`;
export const GET_ITEMS_NOT_IN_CATEGORY = gql`
  query {
    getItemsNotInCategory {
      name
      description
      cost
      id
      imgUrl
    }
  }
`;
export const GET_CATEGORIES = gql`
  query {
    getCategories {
      name
      desc
      id
      items {
        name
        description
        cost
        id
        imgUrl
      }
    }
  }
`;
export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      email
      restaurantName
      address
      phone
      categories {
        name
        desc
        id
        items {
          name
          description
          cost
          imgUrl
        }
      }
      facebook
      youtube
      instagram
      twitter
      id
    }
  }
`;
export const GET_ID = gql`
  query {
    me {
      id
    }
  }
`;
