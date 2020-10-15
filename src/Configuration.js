// const _ = require("lodash");
const _ = require("./Utils");
const ConfigurationError = require("./ConfigurationError");

/**
 * Validates that the JSON contains the required values.
 *
 * @param {string} json The parsed JSON data.
 * @return {array} An array with validation errors or empty.
 */
function validateData(json) {
  return ["display-name", "plugin-slug", "base-namespace"]
    .filter((i) => _.isBlankOrEmpty(json[i]))
    .map((i) => `No '${i}' provided`);
}

/**
 * Parses the preset configuration data.
 *
 * @param {string} json The parsed preset file json data.
 * @return {Object} A configuration object with the required data.
 */
function parseConfiguration(json) {
  if (_.isEmpty(json)) throw Error("No preset data");

  const errors = validateData(json);

  if (errors.length > 0) {
    throw new ConfigurationError(errors);
  }

  const configuration = (function () {
    this.displayName = json["display-name"].trim();
    this.pluginSlug = json["plugin-slug"].trim();
    this.basePackage = json["base-namespace"].trim();
    this.constantPrefix = "";
    this.baseNamespace = this.basePackage.replace(/\//g, "\\");
    this.autoloadNs = basePackage.replace(/\//g, "\\\\").toLowerCase();
    this.pluginDescription = json["plugin-description"];
    this.pluginRepo = json["plugin-repo"];

    const splitPackage = this.basePackage.split("/");

    if (splitPackage.length > 2) {
      this.composerName = splitPackage.slice(0, 2).join("/");
    } else {
      this.composerName = this.basePackage;
    }

    this.composerName = this.composerName.replace(/_/g, "-").toLowerCase();

    if (json["plugin-text-domain"] === false) {
      this.textDomain = undefined;
    } else if (_.isBlankOrEmpty(json["plugin-text-domain"])) {
      this.textDomain = this.pluginSlug;
    } else {
      this.textDomain = json["plugin-text-domain"].trim();
    }

    if (!_.isBlankOrEmpty(json["plugin-slug-prefix"])) {
      this.constantPrefix =
        _.snakeCase(json["plugin-slug-prefix"].trim()).toUpperCase() + "_";
    }

    this.constantPrefix += _.snakeCase(this.pluginSlug).toUpperCase();
    return this;
  })();

  return configuration;
}

module.exports = parseConfiguration;
