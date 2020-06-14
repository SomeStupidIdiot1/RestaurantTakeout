const { DELETE_ALL_ITEMS, DELETE_ITEM } = require("./mutations");

const deleteItem = async (mutate, id) => {
  return mutate({
    mutation: DELETE_ITEM,
    variables: { id },
  });
};
const deleteAllItems = async (mutate) => {
  return mutate({
    mutation: DELETE_ALL_ITEMS,
  });
};
module.exports = {
  deleteItem,
  deleteAllItems,
};
