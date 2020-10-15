const path = require("path");
const fs = require("fs");
const _ = require("./Utils");

/**
 * Provides functions to work with files.
 */
class FileUtils {
  /**
   *
   * @param {string} basePath The base path where files are stored.
   */
  constructor(basePath) {
    this.basePath = basePath;
  }

  /**
   * Reads the contens of the file in FileReplace, iterates the
   * search and replacements and writes the modified file to
   * disk.
   *
   * @param {FileReplace} file Instance of the file to be modified.
   * @return {string} If the file doesn't exist, the function returns
   * false, otherwise returns true.
   */
  replaceInFile(file) {
    const fpath = path.resolve(this.basePath, file.name);

    if (!fs.existsSync(fpath)) {
      console.error("Error: File", fpath, "does not exist");
      return false;
    }

    let contents = fs.readFileSync(fpath, { encoding: "utf8" });
    contents = _.replaceMany(contents, file.searches);
    fs.writeFileSync(fpath, contents, { encoding: "utf8" });
    return true;
  }
}

module.exports = FileUtils;
