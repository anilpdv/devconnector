import React from "react";
import { shallow } from "enzyme";
import { SET_CURRENT_USER } from "./types";
import { setCurrentUser } from "./auth";

it("setCurrentUser action", () => {
  const expectedAction = {
    type: SET_CURRENT_USER,
    payload: {
      id: "4343",
      name: "something"
    }
  };

  expect(setCurrentUser({ id: "4343", name: "something" })).toEqual(
    expectedAction
  );
});
