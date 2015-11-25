<?php
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host'      => '127.0.0.1',
        'username'  => 'root',
        'password'  => 'm432LzR33PQsaH',
        'db'        => 'spoketikoket'
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