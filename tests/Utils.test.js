const path = require("path");
const fs = require("fs");
const _ = require("../src/Utils");
const configParser = require("../src/Configuration");

const validJson = {
  "display-name": "My amazing plugin",
  "plugin-slug": "my-amazing-plugin",
  "plugin-slug-prefix": "",
  "plugin-text-domain": false,
  "base-namespace": "Skaparate/My_Amazing_Plugin",
};

const readTestFile = (fname) =>
  fs.readFileSync(path.resolve(__dirname, "test-files", fname), {
    encoding: "utf8",
  });
const readFile = (fname) =>
  fs.readFileSync(path.resolve("plugin-name", fname), { encoding: "utf8" });

describe("Utils.isBlankOrEmpty", () => {
  it.each([[""], ["    "], [undefined], [null]])(
    "Should be truthy when passed '%s'",
    (val) => {
      expect(_.isBlankOrEmpty(val)).toBeTruthy();
    }
  );
});

describe("Utils.replaceMany", () => {
  const configuration = configParser(validJson);
  const files = require("../FileReplacements")(configuration);

  it("Should correctly modify the plugin bootstrap file", () => {
    const fileReplace = files.filter((i) => i.name === "plugin-name.php")[0];
    const expected = readTestFile("expected-plugin-bootstrap.php");
    const actual = _.replaceMany(
      readFile(fileReplace.name),
      fileReplace.searches
    );
    expect(actual).toEqual(expected);
  });

  it("Should correctly modify the README file", () => {
    const fileReplace = files.filter((i) => i.name === "README.md")[0];
    expect(fileReplace).not.toBeUndefined();
    expect(fileReplace.name).toEqual("README.md");
    const expected = readTestFile("expected-readme.md");
    const actual = _.replaceMany(
      readFile(fileReplace.name),
      fileReplace.searches
    );
    expect(actual).toEqual(expected);
  });
});
