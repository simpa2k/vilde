<?php 
require_once 'core/init.php';

// Setting header
header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');

// Instantiating database
$db = DB::getInstance();

// Initializing text sections
$shows = $db->get('admin_main_page', array('type', '=', 'shows'))->first();
$about = $db->get('admin_main_page', array('type', '=', 'about'))->first();
$musikOchFilm = $db->get('admin_main_page', array('type', '=', 'musikOchFilm'))->first();
$kontakt = $db->get('admin_main_page', array('type', '=', 'kontakt'))->first();

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Spöket i köket</title>
        <!--Setting viewport for mobile devices-->
        <meta name="viewport" content="width=device-width, initial-scale=0.5">
        <link rel="stylesheet" type="text/css" href="static/css/test.css">
    </head>
    <body id="body">
        <div id="background"></div>
        
        <div id="main">
            <div id="header">
                <p class="heading">KONSERTER</p>
                <p class="heading">OM SPÖKET</p>
                <p class="heading">MUSIK OCH MEDIA</p>
                <p class="heading">KONTAKT</p>
                <!--<a class="heading-link" href="kul">Kul!</a>-->
            </div>
            
            <div id="left">
                <div class="sand"></div>
                <div class="blue"></div>
                <div class="sand"></div>
            </div>
            
            <div id="right">
                <div class="sand"></div>
                <div class="blue"></div>
                <div class="sand"></div>
            </div>
            
            <div id="footer">
                <p>Sidan byggd av Simon Olofsson</p>
            </div>
        </div>
        
        <input type="radio" name="to-top-radio" id="not-visible" checked />
        <input type="radio" name="to-top-radio" id="visible" />
        <div id="to-top">
            <p class="large-text">Upp igen</p>
        </div>
            
        <script type="text/javascript" src="js/spoketikoket.js"></script>
    </body>
</html>
