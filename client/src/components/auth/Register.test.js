import React from "react";
import { shallow, mount } from "enzyme";
import { Register } from "./Register";

describe("Register components", () => {
  const register = shallow(<Register />);
  it("should render without crashing", () => {
    expect(register).toMatchSnapshot();
  });
});
