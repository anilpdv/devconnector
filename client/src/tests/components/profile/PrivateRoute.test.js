import React from "react";
import { shallow } from "enzyme";
import { PrivateRoute } from "./PrivateRoute";

it.skip("should render without crashing", () => {
  const privateRoute = shallow(<PrivateRoute />);
  expect(privateRoute).toMatchSnapshot();
});
