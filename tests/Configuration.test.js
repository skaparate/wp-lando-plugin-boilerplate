const { expect } = require("@jest/globals");
const _ = require("lodash");
const parseConfiguration = require("../src/Configuration");
const configParser = require("../src/Configuration");
const ConfigurationError = require("../src/ConfigurationError");

const validJson = {
  "display-name": "My amazing plugin",
  "plugin-slug": "my-amazing-plugin",
  "plugin-slug-prefix": "",
  "plugin-text-domain": false,
  "base-namespace": "Skaparate/My_Amazing_Plugin",
};

const mutate = (prop, val, source = null) => {
  const o = Object.assign({}, source || validJson);
  o[prop] = val;
  return o;
};

describe("Testing Configuration Data", () => {
  it.each([null, undefined, {}])(
    "Should throw an error when no data is passed",
    (data) => {
      expect(() => configParser(data)).toThrowError("No preset data");
    }
  );
});

describe.each(["display-name", "plugin-slug", "base-namespace"])(
  "Testing Parsed Data: '%s'",
  (propName) => {
    const data = [
      ["", "empty"],
      ["    ", "blank"],
      [undefined, "undefined"],
      [null, "null"],
    ].map((i) => [propName, i[1], mutate(propName, i[0])]);
    it.each(data)(
      `Should have errors when '%s' is '%s'`,
      (propName, val, json) => {
        expect(() => configParser(json)).toThrow(
          new ConfigurationError([`No '${propName}' provided`])
        );
      }
    );
  }
);

describe("Testing Return Values", () => {
  const fn = (objectProp, expected, jsonKey, jsonValue) => {
    return [
      objectProp,
      expected,
      jsonKey,
      jsonValue,
      mutate(jsonKey, jsonValue),
    ];
  };
  const textDomain = [
    fn("textDomain", "", "plugin-text-domain", false),
    fn("textDomain", validJson["plugin-slug"], "plugin-text-domain", ""),
    fn(
      "textDomain",
      "my-plugin-text-domain",
      "plugin-text-domain",
      "my-plugin-text-domain"
    ),
  ];
  const snakeSlug = _.snakeCase(validJson["plugin-slug"]).toUpperCase();
  const constantPrefix = [
    fn("constantPrefix", snakeSlug, "plugin-slug-prefix", ""),
    fn("constantPrefix", "SKP_" + snakeSlug, "plugin-slug-prefix", "skp-"),
    fn("constantPrefix", "SKP_" + snakeSlug, "plugin-slug-prefix", "skp_"),
  ];

  it.each([...textDomain, ...constantPrefix])(
    "Should have property '%s' set to '%s' when '%s' is set to '%s'",
    (objectProp, expected, jsonProp, jsonValue, object) => {
      expect(parseConfiguration(object)[objectProp]).toEqual(expected);
    }
  );

  it("Should create a valid @package from the base-namespace", () => {
    const json = Object.assign({}, validJson);
    let result = parseConfiguration(json);
    expect(result.baseNamespace).toEqual(`Skaparate\\My_Amazing_Plugin`);

    json["base-namespace"] = "Skaparate/My_Amazing_Plugin/Sub";
    result = parseConfiguration(json);
    expect(result.baseNamespace).toEqual("Skaparate\\My_Amazing_Plugin\\Sub");
  });

  it("Should create a valid autoload namespace from the base-namespace", () => {
    const json = Object.assign({}, validJson);
    let result = parseConfiguration(json);
    expect(result.autoloadNs).toEqual(`skaparate\\\\my_amazing_plugin`);

    json["base-namespace"] = "Skaparate/My_Amazing_Plugin/Sub";
    result = parseConfiguration(json);
    expect(result.autoloadNs).toEqual("skaparate\\\\my_amazing_plugin\\\\sub");
  });

  it("Should create a valid composer package name from the base-namespace", () => {
    const json = Object.assign({}, validJson);
    let result = parseConfiguration(json);
    const expected = "skaparate/my-amazing-plugin";
    expect(result.composerName).toEqual(expected);

    json["base-namespace"] = "Skaparate/My-Amazing-Plugin/Sub";
    result = parseConfiguration(json);
    expect(result.composerName).toEqual(expected);

    json["base-namespace"] = "Skaparate/My_Amazing_Plugin/Sub";
    result = parseConfiguration(json);
    expect(result.composerName).toEqual(expected);
  });
});
