import profile from "./profile";

it("should return the expected state", () => {
  const state = {};
  const payload = {
    something: "something"
  };
  expect(profile(payload));
});
