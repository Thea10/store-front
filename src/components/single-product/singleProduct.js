import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";

export const SingleProduct = ({ product }) => {
  let { productImage, name, selling_price, merchant, slug, reviewed } = product;
  return (
    <Link role="link" className="app__single__product" to={`/products/${product._id}/${slug}`}>
      <div >
        <div className="single__product__image">
          <img src={productImage} alt={name} />
        </div>
        <div className="single__product__details">
          <h4>{name}</h4>
        </div>

        <div className="single__product__details bolder">
          <Rating name="read-only"  value={reviewed ? 4 : 0} readOnly size={"small"} />

          <h4 className="item__price">
            {selling_price}
          </h4>

          <h4 to={`/products/${product._id}/${slug}`}>{merchant.name}</h4>
        </div>
      </div>
    </Link>
  );
};
