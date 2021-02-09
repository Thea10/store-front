import React from "react";
import { useDispatch } from "react-redux";
import { SingleProduct } from "../../components/single-product/singleProduct";
import { EmptyProducts } from "./emptyProducts";
import { setDefaultStatus } from "./productsSlice";
import "./products.scss"

export const ProductsList = ({ products, searchText, headText }) => {
  let headContent;
  const dispatch = useDispatch();
  const clearSearch = () => {
    dispatch(setDefaultStatus({ status: "empty", text: "" }));
  };

  if (searchText) {
    headContent = (
      <div>
        <h4>Search  for {searchText}</h4>
        <button className="app__clear__button" onClick={clearSearch}>
          Clear Search
        </button>
      </div>
    );
  } else {
    headContent = <h4>{headText}</h4>;
  }
  return (
    <div className="app__products">
      {headContent}
      {products.length > 0 ? (
        <div className="app__products__list">
          {products.map((product) => {
            return <SingleProduct key={product._id} product={product} />;
          })}
        </div>
      ) : (
        <EmptyProducts text={"No Products"} />
      )}
    </div>
  );
};
