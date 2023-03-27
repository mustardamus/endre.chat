import { create, enforce, test } from "vest";

export default create((data = {}) => {
  test("roomName", "Room name is required", () => {
    enforce(data.roomName).isNotEmpty();
  });
});
