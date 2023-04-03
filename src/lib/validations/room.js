import { create, enforce, test } from "vest";

export const createRoom = create((data = {}) => {
  test("roomName", "Room name is required", () => {
    enforce(data.roomName).isNotEmpty();
  });

  test("filterId", "Filter must be set", () => {
    enforce(data.filterId).isNotEmpty();
  });
});

export const joinRoom = create((data = {}) => {
  test("roomId", "roomId is required", () => {
    enforce(data.roomId).isNotEmpty();
  });

  test("userName", "Username is required", () => {
    enforce(data.userName).isNotEmpty();
  });
});
