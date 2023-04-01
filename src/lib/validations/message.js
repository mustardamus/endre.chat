import { create, enforce, test } from "vest";

export default create((data = {}) => {
  test("message", "Message is required", () => {
    enforce(data.message).isNotEmpty();
  });

  test("roomId", "roomId is required", () => {
    enforce(data.roomId).isNotEmpty();
  });
});
