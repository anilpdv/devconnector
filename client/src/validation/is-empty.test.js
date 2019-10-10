import { isEmpty } from "./is-empty";
it("should return the valid input", () => {
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty({ a: "a" })).toBe(false);
});
