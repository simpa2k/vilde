<?php
require_once 'core/init.php';

header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Spöket i köket</title>
        <link rel="stylesheet" type="text/css" href="static/css/base.css">
    </head>
    <body>
        <div id="background">
            <img src="static/images/IMG_0293.jpg">
        </div>
        
        <div id="body">
            <h1>Det här är kulsidan!</h1>
        </div>
    </body>
</html>