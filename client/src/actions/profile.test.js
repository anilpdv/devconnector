import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";

import {
  setProfileLoading,
  clearCurrentProfile,
  createProfile
} from "./profile";
import {
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE
} from "./types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

it("Action : set profile loading", () => {
  expect(setProfileLoading()).toEqual({
    type: PROFILE_LOADING
  });
});

it("Action : clear current profile", () => {
  expect(clearCurrentProfile()).toEqual({
    type: CLEAR_CURRENT_PROFILE
  });
});

it("Action : create profile", () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { errors: [] }
    });
  });

  const expectedActions = [{ type: GET_ERRORS, payload: { errors: [] } }];
  const store = mockStore({});
  return store.dispatch(createProfile({}, {})).then(() => {
    console.log(store.getActions());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
