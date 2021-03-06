const { EDIT_ITEM } = require("./mutations");

const editItem = async (mutate, id, customVariables = {}) => {
  const variables = {
    id,
    ...customVariables,
  };
  return mutate({
    mutation: EDIT_ITEM,
    variables,
  });
};
module.exports = {
  editItem,
};
