import React from "react";
import { render, screen } from "../customRender";
import { ProductsList } from "../features/products/productsList";
import { SingleProduct } from "../components/single-product/singleProduct";

describe("products list views", () => {
  it("should show empty component if products < 0", () => {
    const products = [];
    render(
      <ProductsList
        headText="All Products"
        searchText={null}
        products={products}
      />
    );
    expect(screen.getByText(/No Products/i)).toBeInTheDocument();
  });

  it("should display products if products > 0", () => {
    const products = [
      {
        name: "Bag",
        merchant: { name: "Amazon" },
        price: 1200,
        _id: 1,
        reviewed: true,
      },
    ];
    render(
      <ProductsList
        headText="All Products"
        searchText={null}
        products={products}
      />
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should display product ", () => {
    const product = {
      name: "Bag",
      merchant: { name: "Amazon" },
      price: 1200,
      _id: 1,
      reviewed: true,
    };
    render(<SingleProduct product={product} />);
    const productDetailText = document.querySelectorAll(
      "single__product__details"
    );
    expect(productDetailText).toBeTruthy();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
