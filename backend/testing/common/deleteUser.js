const { DELETE_USER } = require("./mutations");

const deleteUser = async (mutate) =>
  mutate({
    mutation: DELETE_USER,
  });
module.exports = {
  deleteUser,
};
