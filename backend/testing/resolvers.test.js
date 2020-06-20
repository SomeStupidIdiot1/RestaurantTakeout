const { mongoose } = require("../app");
const { createClient, createClientWithUserContext } = require("./common/util");
const User = require("../models/User");
const Item = require("../models/Item");
const { GET_ME } = require("./common/queries");
const {
  getFirstUserExample,
  getSecondUserExample,
  getBadUserExample,
  login,
} = require("./common/userAndLogin");
const {
  getFirstItemExample,
  getSecondItemExample,
} = require("./common/addItem");
const { editItem } = require("./common/editItem");
const { deleteItem, deleteAllItems } = require("./common/deleteItem");
const { deleteUser } = require("./common/deleteUser");
const { editUserContact, editUserCredentials } = require("./common/editUser");

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
    const badExample = await getBadUserExample(mutate);
    const badToken = await login(mutate, "bad@asdf.com", "wr123assword");
    expect(first.user.data).toMatchSnapshot();
    expect(second.user.data).toMatchSnapshot();
    expect(first.token.errors).not.toBeDefined();
    expect(second.token.errors).not.toBeDefined();
    expect(badToken.errors).toBeDefined();
    expect(badExample.errors).toBeDefined();
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
    await editItem(mutate, id, {
      name: "Adf",
      cost: 12.2,
      description: "adszcbv",
    });
    let data = (
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
  test("delete item", async () => {
    const { query, mutate } = await createClientWithUserContext();
    const id = (await getFirstItemExample(mutate)).data.addItem.id;
    const deletedData = (await deleteItem(mutate, id)).data;
    expect(deletedData).toMatchSnapshot();
    const { data } = await query({
      query: GET_ME,
    });
    expect(data).toMatchSnapshot();
  });
  test("delete all items", async () => {
    const { mutate } = await createClientWithUserContext();
    await getFirstItemExample(mutate);
    await getSecondItemExample(mutate);
    await deleteAllItems(mutate);
    expect(await Item.find({})).toHaveLength(0);
  });
  test("delete user", async () => {
    const { mutate } = await createClientWithUserContext();
    await getFirstItemExample(mutate);
    const { data } = await deleteUser(mutate);
    expect(data).toMatchSnapshot();
    expect(await Item.find({})).toHaveLength(0);
    expect(await User.find({})).toHaveLength(0);
  });
  test("edit user contact and credentials", async () => {
    const { query, mutate } = await createClientWithUserContext();
    const data1 = await editUserContact(mutate);
    const data2 = await editUserCredentials(mutate);
    expect(data1).toMatchSnapshot();
    expect(data2).toMatchSnapshot();
    const { data } = await query({
      query: GET_ME,
    });
    expect(data).toMatchSnapshot();
  });
});
