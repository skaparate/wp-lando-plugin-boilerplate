<?php
/**
 * Class used to debug.
 *
 * @package Base/Package/Utils
 */

namespace Base\Package\Utils;

if (! defined('ABSPATH')) {
    die;
}

/**
 * Utility class to log messages for debugging.
 */
class Logger {
	/**
	 * Logs the message.
	 *
	 * @param String $msg The message.
	 */
	public static function log( $msg, $is_error = false ) {
        if ( $is_error || ( defined( WP_DEBUG ) && WP_DEBUG === true ) ) {
            error_log( $msg );
        }
	}
}