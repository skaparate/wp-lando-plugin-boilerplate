/**
 * A data object mapping a file name to an array of SearchAndReplace
 * objects.
 */
class FileReplace {
  /**
   *
   * @param {string} name The file name to be modified.
   * @param {array} searches A list of search and replacements
   * to perform on the file.
   */
  constructor(name, searches) {
    this.name = name;
    this.searches = searches;
  }

  /**
   * Adds a new search to the array.
   *
   * @param {SearchAndReplace} sar The search and replace to add.
   */
  addSearch(sar) {
    this.searches.push(sar);
  }
}

module.exports = FileReplace;
