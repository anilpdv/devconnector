import React from "react";
import { shallow } from "shallow";
import { CreateProfile } from "./CreateProfile";

it("should render without crashing", () => {
  const createProfile = shallow(<CreateProfile />);
  expect(createProfile).toMatchSnapshot();
});
