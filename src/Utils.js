const _ = require("lodash");

/**
 *
 * @param {string} s The string being tested.
 * @return {boolean} true if the string is null, undefined,
 * empty or blank (only spaces).
 */
function isBlankOrEmpty(s) {
  if (this.isEmpty(s)) return true;
  if (typeof s !== "string") return false;
  return s.trim().length === 0;
}

_.mixin({
  isBlankOrEmpty,
});

module.exports = _;
