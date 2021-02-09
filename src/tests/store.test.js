import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect";
import * as actions from "../features/products/productsSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("store actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const store = mockStore({});

  it("searches for a product", () => {
    const searchText = "hello";
    fetchMock.getOnce("/productSearch", { response: 200 });
    return store.dispatch(actions.fetchProducts(searchText)).then(() => {
      const actualActions = store.getActions();
      expect(actualActions).toBeTruthy();
    });
  });
});

 