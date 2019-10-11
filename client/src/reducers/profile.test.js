import profile from "./profile";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const state = {};
it("should return the loading to be true", () => {
  const expected_data = {
    loading: true
  };

  expect(profile(state, { type: PROFILE_LOADING })).toEqual(expected_data);
});

it("should return the data with payload data", () => {
  const expected_data = {
    profile: {
      name: "anil",
      id: "233"
    },
    loading: false
  };

  expect(
    profile(state, { type: GET_PROFILE, payload: expected_data.profile })
  ).toEqual(expected_data);
});

it("profile reducer CLEAR_CURRENT_PROFILE", () => {
  const expected_data = {
    profile: null
  };

  expect(profile(state, { type: CLEAR_CURRENT_PROFILE })).toEqual(
    expected_data
  );
});
