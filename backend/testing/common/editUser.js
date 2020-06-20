const { EDIT_USER_CONTACT, EDIT_USER_CREDENTIALS } = require("./mutations");
const { PASSWORD } = require("./util");

const editUserContact = async (mutate, customVariables = {}) => {
  const variables = {
    restaurantName: "edited restaurant name here",
    address: "123 edited street",
    phone: "023 3211 4564",
    facebook: "edited face",
    instagram: "edited insta",
    twitter: "edited twitter",
    youtube: "edited youtube",
    ...customVariables,
  };
  return mutate({
    mutation: EDIT_USER_CONTACT,
    variables,
  });
};
const editUserCredentials = async (mutate, customVariables = {}) => {
  const variables = {
    currPassword: PASSWORD,
    email: "newediteemail@yahoo.com",
    password: "passwordthatworkS1@",
    ...customVariables,
  };

  return mutate({ mutation: EDIT_USER_CREDENTIALS, variables });
};
module.exports = { editUserContact, editUserCredentials };
