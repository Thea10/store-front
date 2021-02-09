import React from "react";
import { Link } from "react-router-dom";
import empty from "../../images/empty.png";

export const EmptyProducts = ({ text }) => {
  return (
    <div className="app__empty__products">
      <h4> {text} </h4>
      <img src={empty} />
      <h4 className=" home__link">
        <Link to="/" title="Home">Home</Link>
      </h4>
    </div>
  );
};
