const _ = require("../src/Utils");

describe("Utils.isBlankOrEmpty", () => {
  it.each([[""], ["    "], [undefined], [null]])(
    "Should be truthy when passed '%s'",
    (val) => {
      expect(_.isBlankOrEmpty(val)).toBeTruthy();
    }
  );
});
