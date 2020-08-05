# plugin-display-name

The plugin description.

## Development

To setup the development environment, please install the following:

1. [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/). Refer to their respective pages for installation instructions.
2. Install [lando](https://docs.lando.dev/basics/installation.html).
3. Clone this repository:

```
git clone project-repository plugin-name
```

4. Copy the file [.env.example](.env.example) as `.env`. There's should be no need to modify the `.env` file.
5. Start the lando containers:

```
cd plugin-name/
lando start
```

This can take some time, since it has to download the required containers, plus it also downloads and installs WordPress and the WordPress test libraries required for Integration Tests.

5. Install the plugin dependencies with Composer:

```
lando composer install
```

This step installs the `phpab` library, used to generate the autoload script, the WordPress standards libraries and PHPUnit (for unit testing).

### Scripts

I've setup lando to provide some additional commands:

- `lando phpunitd`: This command runs the xdebug command so you can listen on vscode (the required configuration is provided on the [.vscode folder](.vscode)).

- `lando update-autoloader`: Will update the autoloader script for the plugin (`src/autoloader.php`).

- `lando test`: Runs the project tests. It's basically a shortcut to `composer test`.

For VSCode to work properly, I recommend the plugins:

- PHP Intelephense
- PHP Sniffer & Beatufier
- PHP Debug, for using xdebug.

## Running

After installing lando you already have a running WordPress instance, so you can go to plugin-name.lndo.site (/wp-admin) and see it working.
