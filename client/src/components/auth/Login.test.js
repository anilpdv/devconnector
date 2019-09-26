import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./Login";

describe("Login Component", () => {
  it("should render without crashing", () => {
    shallow(<Login />);
  });

  it("should call the function onChange", () => {
    const login = shallow(<Login />);
    login.find(".form-control").simulate("change");
  });
});
