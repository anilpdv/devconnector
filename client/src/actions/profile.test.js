import { setProfileLoading } from "./profile";
import { PROFILE_LOADING } from "./types";
it("should return expected action", () => {
  expect(setProfileLoading()).toEqual({
    type: PROFILE_LOADING
  });
});
