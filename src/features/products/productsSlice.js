import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "productSearch/searchProducts",
  async (text) => {
    let url = `https://d17btosbk6wddi.cloudfront.net/v1/`;
    const response = await axios.get(`${url}search?q=${text}`);
    if (response.data.Error) {
      return response.data.Error;
    }
    localStorage.setItem(
      "localProducts",
      JSON.stringify(response.data.data.result)
    );
    return response.data.data.result;
  }
);

export const ProductSlice = createSlice({
  name: "productSearch",
  initialState: {
    productList: [],
    singleProduct: {},
    searchText: "",
    status: "empty",
    error: null,
  },
  reducers: {
    storeProducts: (state, { payload }) => {
      state.productList = payload;
    },

    setSingleProduct: (state, {payload}) =>{
      state.singleProduct = {...payload}
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    setDefaultStatus: (state, { payload }) => {
      let { status, text } = payload;
      state.status = status;
      state.searchText = text;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      if (Array.isArray(payload)) {
        state.status = "succeeded";
        state.productList = payload;
      } else {
        state.status = "failed";
        state.error = payload;
      }
    },
    [fetchProducts.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    },
  },
});

export const {setSingleProduct, setSearchText, setDefaultStatus } = ProductSlice.actions;
export const getSearchText = (state) => state.productSearch.searchText;
export const getStoreProducts = (state) => state.productSearch.productList;
export default ProductSlice.reducer;
