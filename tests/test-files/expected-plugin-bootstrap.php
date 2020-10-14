<?php
/**
 * The plugin bootstrap file
 * 
 * @since   1.0.0
 * @package Skaparate/My_Amazing_Plugin
 *
 * @wordpress-plugin
 * Plugin Name:       My amazing plugin
 * Plugin URI:        plugin-uri
 * Description:       plugin-description
 * Version:           1.0.0
 * Author:            
 * Author URI:        
 * License:           
 * License URI:       
 * Text Domain:       plugin-text-domain
 * Domain Path:       /languages
 */

namespace Skaparate\My_Amazing_Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Defines the plugin base path.
 */
define( 'MY_AMAZING_PLUGIN', plugin_dir_path( __FILE__ ) );

/**
 * Defines the plugin base URL.
 */
define( 'MY_AMAZING_PLUGIN_URL', plugins_url( '/', __FILE__ ) );

/**
 * Executes the plugin.
 */
function execute_plugin() {
	require_once MY_AMAZING_PLUGIN . '/src/autoload.php';
	$main = \Skaparate\My_Amazing_Plugin\Main::get_instance();
	$main->run();

	add_action( 'init', array( $main, 'on_init' ) );
	add_action( 'admin_menu', array( $main, 'on_admin_menu' ) );
	add_action( 'wp_enqueue_scripts', array( $main, 'on_enqueue_scripts' ) );
	add_action( 'admin_enqueue_scripts', array( $main, 'on_admin_enqueue_scripts' ) );
}

add_action( 'plugins_loaded', 'Skaparate\My_Amazing_Plugin\execute_plugin', 0 );
