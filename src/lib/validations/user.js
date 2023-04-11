import { create, enforce, test } from "vest";
import { isAlphanumeric } from "./_shared.js";

export default create((data = {}) => {
  test("userName", "Username is required", () => {
    enforce(data.userName).isNotEmpty();
  });

  test("userName", "Username must have at least 3 characters", () => {
    enforce(data.userName?.length >= 3).isTruthy();
  });

  test("userName", "Username can not be longer than 9 characters", () => {
    enforce(data.userName?.length <= 9).isTruthy();
  });

  test("userName", "Username can only have letters and numbers", () => {
    enforce(isAlphanumeric(data.userName)).isTruthy();
  });
});
