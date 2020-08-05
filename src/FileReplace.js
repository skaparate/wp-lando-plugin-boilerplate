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
}

module.exports = FileReplace;