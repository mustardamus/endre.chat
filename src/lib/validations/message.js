import { create, enforce, test } from "vest";

export default create((data = {}) => {
  test("message", "Message is required", () => {
    enforce(data.message).isNotEmpty();
  });

  test("message", "Username can not be longer than 255 characters", () => {
    enforce(data.message.length <= 255).isTruthy();
  });

  test("roomId", "roomId is required", () => {
    enforce(data.roomId).isNotEmpty();
  });

  test("id", "id is required", () => {
    enforce(data.id).isNotEmpty();
  });
});
