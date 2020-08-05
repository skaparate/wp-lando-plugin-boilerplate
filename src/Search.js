/**
 * A search object containing the search and replacement of a string.
 */
class SearchAndReplace {
    /**
     * Builds a Search instance.
     * 
     * @param {string} search The string being searched for.
     * @param {string} replace The replacement of the found string.
     */
    constructor(search, replace) {
        this.search = search;
        this.replace = replace;
    }
}

module.exports = SearchAndReplace;