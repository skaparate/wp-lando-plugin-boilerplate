const Sar = require("./src/SearchAndReplace");
const FileReplace = require("./src/FileReplace");

module.exports = ({
  basePackage,
  baseNamespace,
  displayName,
  pluginSlug,
  textDomain,
  constantPrefix,
  pluginDescription,
  pluginRepo,
}) => [
  new FileReplace("uninstall.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
  ]),
  new FileReplace("README.md", [
    new Sar("plugin-display-name", displayName),
    new Sar("plugin-description", pluginDescription),
    new Sar("project-repository", pluginRepo),
    new Sar("plugin-name", pluginSlug),
  ]),
  new FileReplace("plugin-name.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
    new Sar("PLUGIN_NAME", constantPrefix),
    new Sar("plugin-display-name", displayName),
    new Sar("plugin-text-domain", textDomain),
    new Sar("plugin-description", pluginDescription),
  ]),
  new FileReplace(".phpcs.xml", [
    new Sar("plugin-name", pluginSlug),
    new Sar("plugin-text-domain", textDomain),
  ]),
  new FileReplace(".lando.yml", [new Sar("plugin-name", pluginSlug)]),
  new FileReplace(".env.example", [new Sar("plugin-name", pluginSlug)]),
  new FileReplace("tests/bootstrap.php", [new Sar("plugin-name", pluginSlug)]),
  new FileReplace("src/class-main.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
    new Sar("PLUGIN_NAME", constantPrefix),
    new Sar("plugin-name", pluginSlug),
  ]),
  new FileReplace("src/autoload.php", [
    new Sar("base\\\\\\\\package", autoloadNs),
  ]),
  new FileReplace("src/utils/class-logger.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
  ]),
  new FileReplace("composer.json", [new Sar("plugin/name", composerName)]),
];
