<?php
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host'      => 'spoketikoket.com.mysql',
        'username'  => 'spoketikoket_co',
        'password'  => 'Udp6RYmy',
        'db'        => 'spoketikoket_co'
    ),
    'session' => array(
        'session_name' => 'user',
        'token_name'   => 'token'
    )
);

spl_autoload_register(function($class) {
    require_once 'Classes/' . $class . '.php';
});

require_once 'functions/sanitize.php';
require_once 'functions/monthConversion.php';