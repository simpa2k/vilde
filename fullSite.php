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
        <link rel="stylesheet" type="text/css" href="static/css/base.css">
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
        
            <div class="section" id="shows">
                <p class="section-heading">KONSERTER</p>
                    <p id="current-gig">16 Oktober - OCEANEN, Stigbergstorget 8, Göteborg. Insläpp kl. 19.</p>
                    <br/>
                    <p class="small-heading" id="dropdown-menu-button">Tidigare spelningar &raquo;</p>
                        <h5 class="dropdown-menu-item">2015</h5>
                        <p class="dropdown-menu-item">15 Maj - Stallet, Stockholm</p>
                        <p class="dropdown-menu-item">27 Mars - Teaterhögskolan Göteborg</p>
            </div>
            <div class="section" id="about">
                <p class="section-heading">OM SPÖKET</p>
                    <a href="static/images/about.jpg"><img src="static/images/about.jpg"></a>
                    <p class="large-text">
                        Spöket i Köket är ett svenskt/danskt tiohövdat folkmusikmonster med svans. Svansen består av lika delar polska, reel, vals, polka, strathspey, schottis, jig, visa och dans! 
                        Spöket spelar fiol, vevlira, footstomping, hel blåssektion och en massa annat, och musiken kommer från nordisk och kanadensisk folkmusiktradition och från spökets egna huvuden.
                        <br/>
                        <br/>
                        Musikerna är tio och instrumenten tjugo! Musiken är lounge/rave-folk och bandet är Spöket i Köket!
                    </p>
            </div>
            <div class="section" id="musikochfilm">
                <p class="section-heading">MUSIK OCH MEDIA</p>
                    <p class="small-heading">Spöket på bild:</p>
                    <div id="album-container">
                        <a href="https://www.spoketikoket.com/gallery.php?folder=Pressfoto Mars - 15"><img id="album-thumbnail" src="static/images/Pressfoto Mars - 15/albumcover/pressfoto0315.jpg"></a>
                        <p class="large-text">Pressfoto Mars - 15</p>
                    </div>
                    <div id="album-container">
                        <a href="https://www.spoketikoket.com/gallery.php?folder=Stallet Maj - 15"><img id="album-thumbnail" src="static/images/Stallet Maj - 15/albumcover/spoketikoketStallet.jpg"></a>
                        <p class="large-text">Stallet Maj - 15</p>
                    </div>
                    <div id="album-container">
                        <a href="https://www.spoketikoket.com/gallery.php?folder=Folk at Heart - 15"><img id="album-thumbnail" src="static/images/Folk at Heart - 15/albumcover/folkAtHeart15.jpg"></a>
                        <p class="large-text">Folk at Heart - 15</p>
                    </div>
                    <p class="small-heading">Spöket i Köket på YouTube:</p>
                    <a href="https://www.youtube.com/channel/UCBnvUMnm1tU1O2ioTnUNJNw">https://www.youtube.com/channel/UCBnvUMnm1tU1O2ioTnUNJNw</a>
                    <br/>
                    <br/>
                    
                    <iframe sandbox="allow-same-origin allow-scripts" 
                            width="560" height="315" 
                            src="https://www.youtube.com/embed/AWKObuONzvI" 
                            frameborder="0" 
                            allowfullscreen>
                    </iframe>
                    
                    <p class="small-heading">Spöket i Köket på Soundcloud:</p>
                    <a href="https://soundcloud.com/sp-ket-i-k-ket">https://soundcloud.com/sp-ket-i-k-ket</a>
                    <br/>
                    <br/>
                        
                    <iframe sandbox="allow-same-origin allow-scripts" 
                            width="100%" height="166" 
                            scrolling="no" 
                            frameborder="no" 
                            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/188004270&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
                    </iframe>
            </div>
            <div class="section" id="kontakt">
                <p class="section-heading">KONTAKT</p>
                    <p class="small-heading">Bokning, press, säga hej och allting:</p>
                        <p>Mail: spoketikoket@gmail.com</p>
                        <p>Tel SE: Nisse Blomster - +46(0)735591230</p>
                        <p>Tel DK: Mads Kjøller-Henningsen - +45 50 42 18 35</p>
            </div>
            
            <div id="footer">
                <p>Sidan byggd av Simon Olofsson</p>
            </div>
        </div>
        
        <input type="radio" name="to-top-radio" id="not-visible" checked />
        <input type="radio" name="to-top-radio" id="visible" />
        <div id="to-top">
            <p class="large-text">To the top</p>
        </div>
            
        <script type="text/javascript" src="js/spoketikoket.js"></script>
    </body>
</html>
