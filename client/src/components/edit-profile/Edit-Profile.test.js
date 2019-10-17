import React from "react";
import { shallow } from "enzyme";
import EditProfile from "./Edit-Profile";

const wrapper = shallow(<EditProfile />);
it("should render without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});
