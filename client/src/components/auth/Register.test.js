import React from "react";
import { shallow, mount } from "enzyme";
import Register from "./Register";

describe("Register components", () => {
  it("should render without crashing", () => {
    shallow(<Register />);
  });
  it("should render without crashing", () => {
    mount(<Register />);
  });
});
