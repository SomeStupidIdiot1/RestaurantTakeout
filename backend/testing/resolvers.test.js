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
afterAll(() => {
  mongoose.connection.close();
});
beforeEach(async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
});
describe("mutations", () => {
  test("normal login", async () => {
    const firstEmail = "example@gmail.com";
    const firstPass = "this is a bad password";
    const secondEmail = "example1123123@gmail.com";
    const secondPass = "this is a bad password123123";
    const { mutate } = createTestClient(server);
    const firstUser = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: firstEmail,
        password: firstPass,
        restaurantName: "some restaurant name here",
        address: "123 street",
        phone: "123 3211 4564",
        facebook: "face",
        instagram: "insta",
      },
    });
    const secondUser = await mutate({
      mutation: CREATE_USER,
      variables: {
        email: secondEmail,
        password: secondPass,
        restaurantName: "some restaurant123123 name here",
        address: "123123 street",
        phone: "983 3211 4564",
        twitter: "twitter",
        youtube: "youtube",
      },
    });
    const token1 = await mutate({
      mutation: LOGIN,
      variables: {
        email: firstEmail,
        password: firstPass,
      },
    });
    const token2 = await mutate({
      mutation: LOGIN,
      variables: {
        email: secondEmail,
        password: "random bad password",
      },
    });
    expect(firstUser).toMatchSnapshot();
    expect(secondUser).toMatchSnapshot();
    expect(token1.errors).toBe(undefined);
    expect(token2.errors).not.toBe(undefined);
  });
});
