import React from "react";
import { shallow } from "enzyme";
import { PrivateRoute } from "./PrivateRoute";

it("should render without crashing", () => {
  const privateRoute = shallow(<PrivateRoute />);
  expect(privateRoute).toMatchSnapshot();
});
