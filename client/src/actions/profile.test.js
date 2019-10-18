import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";

import {
  setProfileLoading,
  clearCurrentProfile,
  createProfile,
  getCurrentProfile,
  deleteProfile,
  deleteExperience
} from "./profile";

import {
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  SET_CURRENT_USER
} from "./types";

import { getCurrentProfileMock, createProfileMock } from "./mocks/actions";
import { create } from "istanbul-reports";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const respondWith = (status, response) => {
  return moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status,
      response
    });
  });
};

jest.setTimeout(30000);

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

it("Action : getCurrentProfile", () => {
  respondWith(200, getCurrentProfileMock());
  const expectedActions = [
    { type: GET_PROFILE, payload: getCurrentProfileMock() }
  ];

  const store = mockStore({});
  return store.dispatch(getCurrentProfile()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("Action : create profile", () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: createProfileMock()
    });
  });

  const expectedActions = [{ type: GET_ERRORS, payload: createProfileMock() }];
  const store = mockStore({});
  return store.dispatch(createProfile({}, {})).then(() => {
    console.log(store.getActions());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("Action : Delete profile", () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {}
    });
  });

  const expectedActions = [{ type: SET_CURRENT_USER, payload: {} }];

  const store = mockStore({});
  return store.dispatch(deleteProfile()).then(() => {
    console.log(store.getActions());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("Action : create profile", () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {}
    });
  });

  const store = mockStore({});
  const history = { push: jest.fn() };
  return store.dispatch(createProfile({}, history)).then(() => {
    expect(history.push).toHaveBeenCalledWith("/dashboard");
  });
});

it("Action : delete experience", () => {
  respondWith(200, { profile: { id: 1 } });
  const store = mockStore({});
  const expectedActions = [
    { type: GET_PROFILE, payload: { profile: { id: 1 } } }
  ];
  return store.dispatch(deleteExperience("id")).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
