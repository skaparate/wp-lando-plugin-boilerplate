<?php
/**
 * The plugin bootstrap file
 * 
 * @since   1.0.0
 * @package Base/Package
 *
 * @wordpress-plugin
 * Plugin Name:       plugin-display-name
 * Plugin URI:        plugin-uri
 * Description:       
 * Version:           1.0.0
 * Author:            
 * Author URI:        
 * License:           
 * License URI:       
 * Text Domain:       plugin-text-domain
 * Domain Path:       /languages
 */

namespace Base\Package;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Defines the plugin base path.
 */
define( 'PLUGIN_NAME', plugin_dir_path( __FILE__ ) );

/**
 * Defines the plugin base URL.
 */
define( 'PLUGIN_NAME_URL', plugins_url( '/', __FILE__ ) );

/**
 * Executes the plugin.
 */
function execute_plugin() {
	require_once PLUGIN_NAME . '/src/autoload.php';
	$main = \Base\Package\Main::get_instance();
	$main->run();

	add_action( 'init', array( $main, 'on_init' ) );
	add_action( 'admin_menu', array( $main, 'on_admin_menu' ) );
	add_action( 'wp_enqueue_scripts', array( $main, 'on_enqueue_scripts' ) );
	add_action( 'admin_enqueue_scripts', array( $main, 'on_admin_enqueue_scripts' ) );
}

add_action( 'plugins_loaded', 'Base\Package\execute_plugin', 0 );
