import React from "react";
import { Dashboard } from "./dashboard";
import { shallow } from "enzyme";

describe("should render without crashing", () => {
  const getCurrentProfile = jest.fn();
  const props = {
    getCurrentProfile
  };
  const dashboard = shallow(<Dashboard {...props} />);

  it("<Dashborad/>", () => {
    expect(dashboard).toMatchSnapshot();
  });

  it("should call the `getCurrentProfile` func as th component mounts", () => {
    expect(getCurrentProfile).toHaveBeenCalled();
  });
});
