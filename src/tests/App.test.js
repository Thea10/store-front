import React from "react";
import { render, screen } from "../customRender";
import Scroll from "../components/Scroll";
import App from "../App";

describe("<App />", () => {
  it("Renders <App/> correctly", () => {
    render(
      <Scroll>
        <App />
      </Scroll>
    );

    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
  });
});
