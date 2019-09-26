import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("App Test", () => {
  it("should render without crashing", () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

  it("should render every children without crashing", () => {
    const app = mount(<App />);
    expect(app).toMatchSnapshot();
  });
});
