import { create, enforce, test } from "vest";

export default create((data = {}) => {
  test("userName", "Username is required", () => {
    enforce(data.userName).isNotEmpty();
  });
});
