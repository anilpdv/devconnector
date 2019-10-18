import React from "react";
import { shallow } from "enzyme";
import { SET_CURRENT_USER } from "./types";
import { setCurrentUser } from "./auth";
import configureMockStore from "redux-mock-store";
import { getLoginUser } from "./mocks/actions";
import moxios from "moxios";
import thunk from "redux-thunk";
import decoded from "jwt-decode";
import { loginUser } from "./auth";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

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

it("mau e", () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: getLoginUser()
    });
  });
  const { token } = getLoginUser();
  const decode = decoded(token);
  const expectedAction = [setCurrentUser(decode)];
  const store = mockStore({});
  return store
    .dispatch(loginUser({ email: "anilpdv@gmail.com", password: "something" }))
    .then(res => {
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedAction);
    });
});
