import React from "react";
import { shallow, mount } from "enzyme";
import { Register } from "./Register";

describe("Register components", () => {
  const register = shallow(<Register />);
  it("should render without crashing", () => {
    expect(register).toMatchSnapshot();
  });

  it("should call the function", () => {
    register.find("form").simulate("submit", {
      preventDefault: () => {},
      target: { name: "name", value: "abn" }
    });
    expect(register.instance().onSubmit).toHaveBeenCalled();
  });
});
