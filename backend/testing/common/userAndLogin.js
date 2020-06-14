const { CREATE_USER, LOGIN } = require("./mutations");

const getFirstUserExample = async (mutate, customVariables = {}) => {
  const variables = {
    email: "example@gmail.com",
    password: "this is a bad password",
    restaurantName: "some restaurant name here",
    address: "123 street",
    phone: "123 3211 4564",
    facebook: "face",
    instagram: "insta",
    ...customVariables,
  };
  const user = await mutate({
    mutation: CREATE_USER,
    variables,
  });
  const token = await login(mutate, variables.email, variables.password);
  return { user, token };
};
const getSecondUserExample = async (mutate, customVariables = {}) => {
  const variables = {
    email: "example1123123@gmail.com",
    password: "this is a bad password123123",
    restaurantName: "some restaurant name here",
    address: "123 street",
    phone: "123 3211 4564",
    youtube: "youtube",
    twitter: "twitter",
    ...customVariables,
  };
  const user = await mutate({
    mutation: CREATE_USER,
    variables,
  });
  const token = await login(mutate, variables.email, variables.password);
  return { user, token };
};
const login = async (mutate, email, password) => {
  return mutate({
    mutation: LOGIN,
    variables: {
      email,
      password,
    },
  });
};
module.exports = { getFirstUserExample, getSecondUserExample, login };
