const gql = require("graphql-tag");
const { createTestClient } = require("apollo-server-testing");
const { server, mongoose } = require("../app");
const User = require("../models/User");
const Item = require("../models/Item");

const {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  CREATE_USER,
  LOGIN,
} = require("./mutations");
const { GET_ME } = require("./queries");
// beforeEach(() => {
//   jest.setTimeout(10000);
// });
afterAll(() => {
  mongoose.connection.close();
});
beforeEach(async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
});
describe("mutations", () => {
  test("logging in", async () => {
    const { query, mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: "example@gmail.com",
        password: "this is a bad password",
        restaurantName: "some restaurant name here",
        address: "123 street",
        phone: "123 3211 4564",
        facebook: "face",
        instagram: "insta",
      },
    });
    expect(res).toMatchSnapshot();
  });
});
