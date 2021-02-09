import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.scss";
import { ProductDetail } from "./components/single-product/productDetail";
import { ProductsView } from "./features/products/productsView";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"  component={ProductsView} />
        <Route
          exact
          path="/products/:_productId/:slug"
          component={ProductDetail}
        />
      </Switch>
    </div>
  );
}

export default App;
