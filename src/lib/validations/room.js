import { create, enforce, test } from "vest";
import { isAlphanumeric } from "validator";

export const createRoom = create((data = {}) => {
  test("roomName", "Room name is required", () => {
    enforce(data.roomName).isNotEmpty();
  });

  test("roomName", "Room name must have at least 3 characters", () => {
    enforce(data.roomName?.length >= 3).isTruthy();
  });

  test("roomName", "Room name can not be longer than 9 characters", () => {
    enforce(data.roomName?.length <= 9).isTruthy();
  });

  test("roomName", "Room name can only have letters and numbers", () => {
    enforce(isAlphanumeric(data.roomName)).isTruthy();
  });

  test("roomName", "Room name can not be 'create'", () => {
    enforce(data.roomName !== "create").isTruthy();
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
