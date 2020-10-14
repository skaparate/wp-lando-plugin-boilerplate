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

const preset = JSON.parse(fs.readFileSync(presetFilePath));
const configuration = require("./src/Configuration")(preset);
const { pluginSlug } = configuration;

const FileUtils = require("./src/FileUtils");
const fileUtils = new FileUtils(__dirname + "/plugin-name");

const files = require("./FileReplacements")(configuration);

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
