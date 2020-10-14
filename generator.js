// Configures the project
const fs = require("fs");
const path = require("path");
const presetFilePath = path.resolve("./", "preset.json");

if (!fs.existsSync(presetFilePath)) {
  console.error(
    `Error: No preset found. Please, copy the preset.example
    file and fill it with your project information`
  );
  process.exit(-1);
}

const {
  displayName,
  pluginSlug,
  basePackage,
  textDomain,
  constantPrefix,
  baseNamespace,
  autoloadNs,
  composerName,
} = require("./src/Configuration")(presetFilePath);

const Sar = require("./src/Search");
const FileReplace = require("./src/FileReplace");
const FileUtils = require("./src/FileUtils");
const fileUtils = new FileUtils(__dirname + "/plugin-name");

console.log("Base Namespace:", baseNamespace);
console.log("Base Package:", basePackage);
console.log("Constant Name:", constantPrefix);
console.log("Text Domain:", textDomain);
console.log("Autoload namespace:", autoloadNs);
console.log("Composer.json:name:", composerName);

const files = [
  new FileReplace("uninstall.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
  ]),
  new FileReplace("README.md", [
    new Sar("plugin-display-name", displayName),
    new Sar("plugin-description", preset["plugin-description"]),
    new Sar("project-repository", preset["project-repo"]),
    new Sar("plugin-name", pluginSlug),
  ]),
  new FileReplace("plugin-name.php", [
    new Sar("Base/Package", basePackage),
    new Sar("Base\\\\Package", baseNamespace),
    new Sar("PLUGIN_NAME", constantPrefix),
    new Sar("plugin-display-name", displayName),
    new Sar("plugin-text-domain", textDomain),
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

files.forEach((file) => {
  fileUtils.replaceInFile(file);
});

const pluginDir = path.resolve(__dirname, "plugin-name");

// Copy the .env.example file.
fs.copyFileSync(
  path.resolve(pluginDir, ".env.example"),
  path.resolve(pluginDir, ".env")
);

const newPluginFile = path.resolve(pluginDir, pluginSlug + ".php");
// Rename the plugin main file
fs.renameSync(path.resolve(pluginDir, "plugin-name.php"), newPluginFile);

// Rename the plugin directory
fs.renameSync(pluginDir, path.resolve(__dirname, pluginSlug));
