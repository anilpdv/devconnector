import React from "react";
import { shallow } from "enzyme";
import { CreateProfile } from "./CreateProfile";

const createProfile = jest.fn();
const props = { createProfile };
const createProfileComponent = shallow(<CreateProfile {...props} />);

const helperChange = (className, value) => {
  createProfileComponent.find(className).simulate("change", {
    target: { value }
  });
};

describe("component <CreateProfile/>", () => {
  it("should render without crashing", () => {
    expect(createProfileComponent).toMatchSnapshot();
  });

  describe("on changing the state of the component", () => {
    helperChange(".status", "Developer");
    helperChange(".skills", "Nodejs,Reactjs,javascript");
    helperChange(".handle", "anilpdv");
    createProfileComponent
      .find("form")
      .simulate("submit", { preventDefault: () => {} });
  });

  it("should call the `createProfile` function", () => {
    expect(createProfile).toHaveBeenCalled();
  });
});
