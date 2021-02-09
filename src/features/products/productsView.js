import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/header/Header";
import { ProductsList } from "./productsList";
import { EmptyProducts } from "./emptyProducts";
import { fetchProducts, getStoreProducts } from "./productsSlice";
import loader from "../../images/loader.svg";
import "./products.scss";

export function ProductsView() {
  let listContent;
  const dispatch = useDispatch();
  const storeStatus = useSelector((state) => state.productSearch.status);
  const searchText = useSelector((state) => state.productSearch.searchText);
  const error = useSelector((state) => state.productSearch.error);
  const products = useSelector(getStoreProducts);

  useEffect(() => {
    if (storeStatus === "empty") {
      dispatch(fetchProducts(""));
    }
  }, [storeStatus, dispatch]);

  if (storeStatus === "loading") {
    listContent = (
      <div>
        <img src={loader} alt="loading" />
        <h4>Loading Items</h4>
      </div>
    );
  } else if (storeStatus === "succeeded") {
    listContent = (
      <ProductsList
        products={products}
        headText="All Products"
        searchText={searchText}
      />
    );
  } else if (storeStatus === "failed") {
    listContent = <EmptyProducts text={error} />;
  }

  return (
    <div className="app__products__view">
      <Header />
      <h2>Our Products</h2>

      {listContent}
    </div>
  );
}
