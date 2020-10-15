/**
 * Represents the error thrown when one or more required
 * configuration values are missing.
 */
class ConfigurationError extends Error {
  /**
   *
   * @param {array} errors The errors that were found.
   */
  constructor(errors) {
    super(`Invalid configuration: ${errors.join("\n")}`);
    this._errors = errors;
  }

  /**
   * Retrieves the errors that caused this
   * exception.
   * @return {array} An array of string with the error messages.
   */
  get errors() {
    return this._errors;
  }
}

module.exports = ConfigurationError;
