import React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "./Login";

describe("Login Component", () => {
  const login = mount(<Login />);
  it("should render without crashing", () => {
    expect(login).toMatchSnapshot();
  });

  describe("when the user input in to form", () => {
    beforeEach(() => {
      login.find(".email").simulate("change", {
        target: {
          value: "pdvanil007@gmail.com"
        }
      });
      login.find(".password").simulate("change", {
        target: {
          value: "password"
        }
      });
    });

    it("should match the email", () => {
      console.log(login.state());
      expect(login.state().email).toEqual("pdvanil007@gmail.com");
    });

    it("should match the password", () => {
      expect(login.state().password).toEqual("password");
    });
  });
});

describe("Login ", () => {
  const mockfn = jest.fn();
  const props = { errors: {}, loginUser: mockfn };
  const login = shallow(<Login {...props} />);

  beforeEach(() => {
    login.find(".email").simulate("change", {
      target: {
        value: "pdvanil007@gmail.com"
      }
    });
    login.find(".password").simulate("change", {
      target: {
        value: "password"
      }
    });

    login.find("form").simulate("submit", {
      preventDefault: () => {}
    });
  });

  it("should call the function with user data", () => {
    expect(mockfn).toHaveBeenCalledWith({
      email: "pdvanil007@gmail.com",
      password: "password"
    });
  });
});
