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

/**
 * Performs a search and replace in the contents using the passed array of
 * SearchAndReplace objects.
 *
 * @param {string} contents The haystack where the search and replacements
 * will be performed.
 * @param {array} sars An array of SearchAndReplace objects.
 * @return {string} If no contents, return empty, otherwise returns
 * the modified contents.
 */
function replaceMany(contents, sars) {
  if (typeof contents !== "string")
    throw Error("The contents must be a string");
  if (!contents) return "";
  sars.forEach((sar) => {
    if (sar.replace !== undefined)
      contents = contents.replace(new RegExp(sar.search, "g"), sar.replace);
  });

  return contents;
}

_.mixin({
  isBlankOrEmpty,
  replaceMany,
});

module.exports = _;
