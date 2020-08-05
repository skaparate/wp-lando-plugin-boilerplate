<?php
/**
 * File that contains the plugin orchestrator class.
 *
 * @since 1.0.0
 * @package Base/Package
 */

namespace Base\Package;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Main plugin class to orchestrate the work.
 *
 * @version 1.0.0
 */
class Main {

	/**
	 * The plugin slug.
	 */
	const PLUGIN_SLUG = 'plugin-name';

	/**
	 * Current plugin version.
	 */
	const PLUGIN_VERSION = '1.0.0';

	/**
	 * Because of the features used, we require a version of
	 * PHP 7 or more to work properly.
	 *
	 * @since 1.0.0
	 */
	const MIN_PHP_VERSION = '7.0.0';

	/**
	 * Singleton instance.
	 *
	 * @since 1.0.0
	 * @var Base/Package/Main
	 */
	private static $instance = null;

	/**
	 * Holds the instances to the provided plugin shortcodes.
	 *
	 * @var array
	 */
	private $shortcode_instances = array();

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	private function __construct() {
	}

	/**
	 * Gets a singleton instance.
	 *
	 * @return Main A singleton instance of this class.
	 */
	public static function get_instance(): Main {
		if ( null === self::$instance ) {
			self::$instance = new Main();
		}

		return self::$instance;
	}

	/**
	 * Begins the plugin execution
	 */
	public function run() {
		if ( false === $this->is_php_version_requirement_met() ) {
			add_action( 'admin_notices', array( $this, 'admin_notice_minimum_php_version' ) );
			return;
		}
		
		$this->load_text_domain();
		$this->register_controllers();
	}

	/**
	 * Runs actions on the init WordPress hook.
	 */
	public function on_init() {
		$this->register_shortcodes();
	}

	/**
	 * Runs actions for the enqueue scripts WordPress hook.
	 */
	public function on_enqueue_scripts() {
		$this->register_scripts();
	}

	/**
	 * Runs action for the admin enqueue scripts WordPress hook.
	 */
	public function on_admin_enqueue_scripts() {
		$this->register_admin_scripts();
	}

	/**
	 * Runs actions for the enqueue styles WordPress hook.
	 */
	public function on_enqueue_styles() {
	}

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_text_domain() {
		load_plugin_textdomain(
			self::PLUGIN_SLUG,
			false,
			PLUGIN_NAME_URL . '/languages/'
		);
	}

	/**
	 * Registers the administration options.
	 */
	public function on_admin_menu() {
	}

	/**
	 * Check if the PHP version is equal or higher than the required by the plugin.
	 */
	private function is_php_version_requirement_met() {
		return version_compare( PHP_VERSION, self::MIN_PHP_VERSION, '>=' );
	}

	/**
	 * Register controllers.
	 */
	private function register_controllers() {
	}

	/**
	 * Registers the shortcodes for the plugin.
	 */
	private function register_shortcodes() {
	}

	/**
	 * Register scripts.
	 */
	private function register_scripts() {
		$this->register_common_scripts();
	}

	/**
	 * Registers admin side scripts and styles.
	 */
	private function register_admin_scripts() {
		$this->register_common_scripts();
	}

	/**
	 * Registers common scripts and styles for the front and back end.
	 */
	private function register_common_scripts() {
	}

	public function admin_notice_minimum_php_version() {
		?>
		<div class="notice notice-error is-dismissible">
			<p><?php echo sprintf(
				__(
					/** translators: %s is the PHP version */
					'This plugin requires a minimum PHP version of %s',
					'textdomain'
				),
				self::MIN_PHP_VERSION
			); ?></p>
		</div>
		<?php
	}
}
