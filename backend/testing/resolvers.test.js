const { mongoose } = require("../app");
const { createClient, createClientWithUserContext } = require("./common/util");
const User = require("../models/User");
const Item = require("../models/Item");
const { DELETE_ITEM, DELETE_ALL_ITEMS } = require("./common/mutations");
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
const { editItem } = require("./common/editItem");
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
    const first = await getFirstUserExample(mutate);
    const second = await getSecondUserExample(mutate);
    const badToken = await login(mutate, "bad@asdf.com", "wr123assword");
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
    const { data } = await query({
      query: GET_ME,
    });
    expect(data).toMatchSnapshot();
  });
  test("edit item", async () => {
    const { query, mutate } = await createClientWithUserContext();
    const id = (await getFirstItemExample(mutate)).data.addItem.id;
    let { data } = await query({
      query: GET_ME,
    });
    expect(data).toMatchSnapshot();
    await editItem(mutate, id, {
      name: "Adf",
      cost: 12.2,
      description: "adszcbv",
    });
    data = (
      await query({
        query: GET_ME,
      })
    ).data;
    expect(data).toMatchSnapshot();
    await editItem(mutate, id);
    data = (
      await query({
        query: GET_ME,
      })
    ).data;
    expect(data).toMatchSnapshot();
  });
});
