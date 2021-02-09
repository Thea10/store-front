import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsList } from "../../features/products/productsList";
import {
  getStoreProducts,
  setSingleProduct,
} from "../../features/products/productsSlice";
import { Link } from "react-router-dom";
import { EmptyProducts } from "../../features/products/emptyProducts";
import "../../features/products/products.scss";
import { Rating } from "@material-ui/lab";

export const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();
  let detailContent;
  let { _productId } = match.params;
  let storeProducts = useSelector(getStoreProducts);
  let localProducts = JSON.parse(localStorage.getItem("localProducts"));
  if (storeProducts.length < 1) {
    storeProducts = localProducts;
  }
  const product = storeProducts.find((item) => item._id === _productId);

  if (product) {
    dispatch(setSingleProduct(product));
    let {
      productImage,
      name,
      selling_price,
      merchant,
      description,
      stock,
      reviewed,
    } = product;
    const similarProducts = storeProducts.filter((item) => {
      if (
        item._id !== _productId &&
        (item.merchant.name === merchant.name ||
          item._tags.some((tag) => product._tags.includes(tag)))
      ) {
        return item;
      }
    });

    detailContent = (
      <div className="app__product__desc">
        <h4 className="home__link">
          <Link to="/" title="Home">
            Home
          </Link>
        </h4>
        <div className="product__desc">
          <div className="product__desc__img">
            <img src={productImage} alt={name} />
          </div>

          <div className="product__desc__details">
            <h1>{name}</h1>

            <h4>Vendor: {merchant.name}</h4>
            <Rating
                  name="read-only"
                  value={reviewed ? 4 : 0}
                  readOnly
                  size={"small"}
                />
            <div className="select__size">
              <h5>
                Price: <span className="d__card"> {selling_price}</span>
              </h5>
              <h5>
                Stock Available:
                <span className="d__card">
  
                  {stock} {stock > 1 ? "items" : "item"}
                </span>
              </h5>
            </div>

            <div className="select__size">
              <h4 className="size__option">
                <input type="radio" /> Size L
              </h4>
              <h4 className="size__option">
                <input type="radio" /> Size M
              </h4>
            </div>
            <div className="select__size">
              <div className="qty__option">
                <h4>Choose quantity</h4>
                <input type="number" min="1" max={stock} />
              </div>

              <button className="cart__button"> Add to Cart </button>
            </div>

            <small> {description} </small>
          </div>
        </div>
        <ProductsList products={similarProducts} headText="Similar Products" />
      </div>
    );
  } else {
    detailContent = <EmptyProducts text="Product Not found" />;
  }

  return detailContent;
};
