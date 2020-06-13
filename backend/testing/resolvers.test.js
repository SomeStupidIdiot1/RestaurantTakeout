const { mongoose } = require("../app");
const { createClient } = require("./common/util");
const User = require("../models/User");
const Item = require("../models/Item");
const {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
  CREATE_USER,
  LOGIN,
} = require("./common/mutations");
const { GET_ME } = require("./common/queries");
const {
  getFirstUserExample,
  getSecondUserExample,
  login,
} = require("./common/userAndLogin");
afterAll(() => {
  mongoose.connection.close();
});
beforeEach(async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
});
describe("mutations", () => {
  test("normal login", async () => {
    const { mutate } = createClient();

    const first = await getFirstUserExample(mutate, {
      email: "example@gmail.com",
      password: "this is a bad password",
    });
    const second = await getSecondUserExample(mutate, {
      email: "example123@gmail.com",
      password: "this is a bad password",
    });
    const badToken = await login(mutate, "example@gmail.com", "wrong password");
    const badToken2 = await login(
      mutate,
      "adsf@gmail.com",
      "wradsfong password"
    );
    console.log(first.token);
    expect(first.user).toMatchSnapshot();
    expect(second.user).toMatchSnapshot();
    expect(first.token.errors).not.toBeDefined();
    expect(second.token.errors).not.toBeDefined();
    expect(badToken.errors).toBeDefined();
    expect(badToken2.errors).toBeDefined();
  });
  test("add item", async () => {
    const { query, mutate } = createClient();
    const { token } = await getFirstUserExample(mutate);
    await mutate({
      mutation: ADD_ITEM,
      variables: {
        email,
        password,
      },
      
    });
  });
});
