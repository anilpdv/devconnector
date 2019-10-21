import React from "react";
import { shallow } from "enzyme";
import { Navbar } from "./navbar";

describe("<Navbar/>", () => {
  const logoutUser = jest.fn();
  const clearCurrentProfile = jest.fn();
  const auth = { isAuthenticated: true };

  const props = {
    logoutUser,
    clearCurrentProfile,
    auth
  };
  const navbar = shallow(<Navbar {...props} />);
  it("should render without crashing", () => {
    expect(navbar).toMatchSnapshot();
  });

  describe("when the logout is clicked", () => {
    beforeEach(() => {
      navbar.find(".logout").simulate("click");
    });

    it("should call the function `logoutUser` ", () => {
      expect(logoutUser).toHaveBeenCalled();
    });

    it("should call the function `clearCurrentProfile`", () => {
      expect(clearCurrentProfile).toHaveBeenCalled();
    });
  });
});
