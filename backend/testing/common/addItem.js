const { ADD_ITEM } = require("./mutations");

const getFirstItemExample = async (mutate, customVariables = {}) => {
  const variables = {
    name: "somename",
    cost: 123.5,
    ...customVariables,
  };
  return mutate({
    mutation: ADD_ITEM,
    variables,
  });
};
const getSecondItemExample = async (mutate, customVariables = {}) => {
  const variables = {
    name: "somenadsfame",
    cost: 123.5123,
    description: "some desc",
    ...customVariables,
  };
  return mutate({
    mutation: ADD_ITEM,
    variables,
  });
};
module.exports = {
  getFirstItemExample,
  getSecondItemExample,
};
