import { setProfileLoading, clearCurrentProfile } from "./profile";
import { PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

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
