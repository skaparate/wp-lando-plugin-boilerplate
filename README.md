# WordPress Lando Plugin Boilerplate Generator

![Tests](https://github.com/skaparate/wp-lando-plugin-boilerplate/workflows/Node.js%20CI/badge.svg?branch=master) [![Coverage](https://coveralls.io/repos/github/skaparate/wp-lando-plugin-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/skaparate/wp-lando-plugin-boilerplate?branch=master)

This is the boilerplate for a WordPress plugin development environment, including (and enforcing) WordPress Standards, PHP namespaces and a lando server setup that's ready to be used for testing and debugging.

The project is intended to be used with WordPress 5+, PHP 7+ and at least lando version 3.0beta.

It's also expected to be used along with VSCode. I haven't tested any other editors.

## What Does the Generator Do?

It modifies the contents under [plugin-name](/plugin-name) using the [preset.json](/preset.example), ultimately renaming the folder to the `plugin-slug` set in the `preset.json` file.

### How to Use the Generator

To use this generator, you need to have `node` installed (use nvm). I tested this with version 12.16.3 of node, but I suppose it should work with at least version 6 onwards:

1. Clone the project to your computer: `git clone https://github.com/skaparate/wp-lando-plugin-boilerplate`.
2. Rename the file `preset.example` to preset.json.
3. Fill the file with your project data (explained below).
4. Run the generator: `node generator.js`.

After that, read the instructions on the README of the plugin. It tells you where to get Lando (and docker) and explains some custom commands.

### Preset File

This file is used to tell the generator about some project settings, specifically, it includes:

* display-name: This is the display name of the plugin. It's as the WordPress `Plugin Name:` and the README title.
* plugin-slug: As the name implies, is the *machine* name of the plugin. This is used for the plugin folder name, the main file name and to derive some other variables.
* plugin-slug-prefix (**Optional**): This is a prefix that's prepended to the plugin slug. If the plugin slug is `my-plugin` and this is set to `skp`, then the slug becomes `skp-my-plugin`.
* plugin-text-domain (**Optional**): Used for i18n. It can be a string or false. If set to false, the plugin-text-domain is not removed from the files nor replaced. *When empty*, the text domain is derived from the plugin slug (not including the slug prefix).
* base-namespace: The namespace and package used for the `@package` comment and the PHP `namespace`.

## Tests

To run the tests, simply run `yarn run test`.

## That's it

I hope this is useful to someone :).
