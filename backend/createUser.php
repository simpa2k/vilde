<?php

require_once('core/init.php');

$username = 'admin';
$password = 'adminpassword';
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$db = DB::getInstance();

try {
    $db->insert('user', array(

        'username' => $username,
        'password' => $hashedPassword,

    ));
} catch(Exception $e) {
    die($e->getMessage());
}
