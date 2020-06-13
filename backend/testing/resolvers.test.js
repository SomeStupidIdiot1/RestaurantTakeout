const { mongoose } = require("../app");
const { createClient, createClientWithUserContext } = require("./common/util");
const User = require("../models/User");
const Item = require("../models/Item");
const {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
} = require("./common/mutations");
const { GET_ME } = require("./common/queries");
const {
  getFirstUserExample,
  getSecondUserExample,
  login,
} = require("./common/userAndLogin");
const {
  getFirstItemExample,
  getSecondItemExample,
} = require("./common/addItem");
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
    expect(first.user.data).toMatchSnapshot();
    expect(second.user.data).toMatchSnapshot();
    expect(first.token.errors).not.toBeDefined();
    expect(second.token.errors).not.toBeDefined();
    expect(badToken.errors).toBeDefined();
  });
  test("add item", async () => {
    const { query, mutate } = await createClientWithUserContext();
    await getFirstItemExample(mutate);
    await getSecondItemExample(mutate);
    const getMe = await query({
      query: GET_ME,
    });
    expect(getMe.data).toMatchSnapshot();
  });
});
