import _isAlphanumeric from "validator/lib/isAlphanumeric";

export const isAlphanumeric = _isAlphanumeric.default
  ? _isAlphanumeric.default
  : _isAlphanumeric;
