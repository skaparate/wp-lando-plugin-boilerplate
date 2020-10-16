<?php
/**
 * Template for the admin notices.
 *
 * @package Base/Package/Templates
 */

defined( 'ABSPATH' ) || exit;

?>
<div class="<?php echo esc_attr( implode( ' ', $tpl['classes'] ) ); ?>">
	<p><?php echo esc_html( $tpl['message'] ); ?>
</div>
