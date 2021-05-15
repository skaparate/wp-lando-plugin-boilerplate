<?php
/**
 * Template related utilities.
 *
 * @since 1.0.0
 * @package Base/Package
 */

namespace Base\Package\Utils;

if (! defined('ABSPATH')) {
    die;
}

/**
 * Class in charge of finding and manipulating templates.
 */
class Template {
	// phpcs:disable Generic.CodeAnalysis.UnusedFunctionParameter
	/**
	 * Loads the template identified by the name.
	 *
	 * @param string $name The name or path to the template.
	 * @param array  $tpl The context variables to be passed to the file.
	 */
	public static function load( string $name, $tpl = array() ) {
		$fname = self::join_paths(
			PLUGIN_SLUG,
			'src',
			'templates',
			$name . '.php'
		);

		if ( file_exists( $fname ) ) {
			include $fname;
			return;
		}

		Logger::log( "Could not load the file '$fname'" );
	}
	// phpcs:enable Generic.CodeAnalysis.UnusedFunctionParameter

	/**
	 * Joins the arguments as a path.
	 *
	 * @param mixed ...$args The paths to be joined.
	 * @return string The joined path.
	 */
	public static function join_paths( ...$args ) {
		$paths = array();

		foreach ( $args as $arg ) {
			if ( '' !== $arg ) {
				$paths[] = $arg;
			}
		}

		return preg_replace( '#/+#', '/', implode( DIRECTORY_SEPARATOR, $paths ) );
	}
}
