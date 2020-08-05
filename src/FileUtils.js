const path = require('path');
const fs = require('fs');

/**
 * Provides functions to work with files.
 * 
 * @param {string} basePath The base path where the files are stored.
 */
class FileUtils {

    constructor(basePath) {
        this.basePath = basePath;
    }

    /**
     * Replaces a search string in the file contents.
     * 
     * @param {FileReplace} file Instance of the file to be modified.
     */
    replaceInFile(file) {
        const fpath = path.resolve(this.basePath, file.name);

        if (!fs.existsSync(fpath)) {
            console.error('Error: File', fpath, 'does not exist');
            return false;
        }

        let contents = fs.readFileSync(fpath, { encoding: 'utf8' });

        if (contents) {
            file.searches.forEach(sar => {
                if (sar.search && sar.replace) {
                    contents = contents.replace(
                        new RegExp(sar.search, 'g'),
                        sar.replace);
                }
            });
            fs.writeFileSync(fpath, contents, { encoding: 'utf8' });
        }
    }
}

module.exports = FileUtils;
