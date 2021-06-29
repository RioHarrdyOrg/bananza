<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bananzacz' );

/** MySQL database username */
define( 'DB_USER', 'bananzacz' );

/** MySQL database password */
define( 'DB_PASSWORD', 'MMD8ftWH' );

/** MySQL hostname */
define( 'DB_HOST', 'uvdb57.active24.cz' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', 'utf8_general_ci' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */

define('AUTH_KEY',         'j$UUZGy$:u&q;|>e2`ct40RZ5WVQITI3h5~IJar+c(PaAdldq%T9w+,d#Bs,N$C1');
define('SECURE_AUTH_KEY',  'aZgu{Hok)<RjUG?)AVW&0TO(+{lQ:Z#$=0B<!,y(Evk@@pzb:<+lF2+?]SiaqA:]');
define('LOGGED_IN_KEY',    'f3t-1ipX[_0K)G QB.%f/ws6JQ7R|x/qH=wr.YI!|lj&]m|a/tjv8~FX8+^-.$Nv');
define('NONCE_KEY',        '7tDT|ZJFtSiCd/$}u$L3GR>+-HhL%r[p}Ju{hNt<]8|nd_?uZ%cR|-MZ_3-zm]>g');
define('AUTH_SALT',        '!HIMd|]Bs6P}_`)4v0{b xc9a-TFibD%_r__kzqdvg}Vhl,nL+3/d6+L;UP6_*[3');
define('SECURE_AUTH_SALT', 'E^t?K3u,lRA*fp@7}r_w2{VLpwSlW(40A;9byF~YR@<|[|w-X.>{<IF_TAK0hgRL');
define('LOGGED_IN_SALT',   '%z5~2J|/,deQ?9=>jc$;b7+iQ3+KP#])b)--HH,_(4*dc>e!S-u]0ng4)pk^6s2~');
define('NONCE_SALT',       'Sf6X:FKG.Ae?/r|gU&/J^w>esyhox*bCpzt*Sr$XUdCi6~qk3FWKUo[w+o[vj6;R');


/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
