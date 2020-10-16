<?php
/**
 * UI utilities.
 *
 * @package Base/Package/Utils
 */

namespace Base\Package\Utils;

/**
 * Class in charge of common UI tasks.
 */
class UI {

	/**
	 * Displays an popup notice on the administrator side.
	 *
	 * @param string $message The message being displayed on the notice.
	 */
	public static function error_notice( string $message ) {
		$classes = array( 'notice', 'is-dismissible', 'notice-error' );
		Template::load( 'admin-notice', compact( 'message', 'classes' ) );
	}
}
