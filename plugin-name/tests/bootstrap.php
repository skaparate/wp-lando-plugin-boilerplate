<?php
/**
 * Bootstrap the tests to include the autoloading plugin.
 *
 * @package Base/Package/Tests
 */

define( '_TEST_ROOT', dirname( dirname( __FILE__ ) ) );

$dotenv = Dotenv\Dotenv::createImmutable( _TEST_ROOT, '.env' );
$dotenv->load();

require_once _TEST_ROOT . '/vendor/autoload.php';

$wp_test_libs = _TEST_ROOT . DIRECTORY_SEPARATOR . $_ENV['WP_TEST_LIBS_DIR'];
require_once $wp_test_libs . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
	require _TEST_ROOT . '/plugin-name.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

require_once $wp_test_libs . '/includes/bootstrap.php';
