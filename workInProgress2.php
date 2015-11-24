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
        <!--Setting viewport for mobile devices. Maximum-scale preventing mobile Safari from changing scale when
            switching to landscape mode.-->
        <meta name="viewport" content="width=device-width, initial-scale=0.5">
        <link rel="stylesheet" type="text/css" href="static/css/base.css">
    </head>
    <body id="body">
        <div id="background">
            <!--<img src="static/images/spoketbackground.jpg">-->
        </div>
        
        <div id="main">
            <div id="header">
                <!--<p class="heading"></p></p>
                <p class="heading"></p>
                <p class="heading"></p>
                <p class="heading"></p>
                <a class="heading-link" href="kul.php"></a>-->
                <p class="heading">Aj, aj, aj!</p>
            </div>
        
            <div class="section" id="shows">
                <p class="section-heading">Vi ber om ursäkt</p>
                    <p class="large-text">
                        Spöket i kökets hemsida är inte riktigt färdig än, men håll ut! Tills vidare kan ni besöka vår <a href="https://www.facebook.com/spoketikoket">facebooksida</a>. På återseende!
                    </p>
            </div>
            <div class="section" id="about">
                <!--<h1 class="section-heading">About</h1>
                    <img src="static/images/thumbnails/IMG_0003.jpg">
                    <p class="section-text">
                        Enligt den vanligaste myten är spöken människor som dött, och som av någon anledning hemsöker en plats,
                        exempelvis sin dödsplats, kyrkor, på kyrkogårdar, på galgbackar, där de bodde, eller,
                        om de varit missdådare, på de platser där de övat sina illgärningar. Även slott och herresäten
                        är klassiska spökplatser. I modern tid verkar stora opersonliga platser ha övertagit en del av deras roll
                        som spökvisten, en av de populäraste varianterna av moderna spökhistorier är underjordiska kulvertar
                        under exempelvis stora sjukhus (som i Lars von Triers teveserie Riket). Det finns också legender om
                        spöken som rör sig över stora områden, exempelvis över hela länder, regioner eller hav –
                        Ahasverus och den flygande holländaren är exempel på sådana sägner.
                        De flesta spökberättelser utspelar sig under natten, eftersom berättelsen till stor del bygger
                        på mörkerrädsla. I svensk folktro blev ett spöke under dagen osynligt och orörligt, och den som
                        råkade passera en sådan dagståndare kunde bli gastkramad. Det har även förekommit föreställningar
                        om att själens vårdande kunde leva vidare efter att dess skyddsling gått bort, och en sådan herrelös
                        vård är den ursprungliga vålnaden. Spöken förekommer i isländska sagor, där en av termerna som används
                        om dem är draug. I senare norsk folktro var draugen namnet på ett drunkningsoffers vålnad.
                        Enligt vissa modernare myter består spöken av ektoplasma, och denna läran om spöken kallas ektologi.
                    </p>-->
            </div>
            <div class="section" id="musikochfilm">
                <!--<h1 class="section-heading">Musik och film</h1>
                    <img src="static/images/thumbnails/IMG_0014.jpg">
                    <p class="section-text">
                        Enligt den vanligaste myten är spöken människor som dött, och som av någon anledning hemsöker en plats,
                        exempelvis sin dödsplats, kyrkor, på kyrkogårdar, på galgbackar, där de bodde, eller,
                        om de varit missdådare, på de platser där de övat sina illgärningar. Även slott och herresäten
                        är klassiska spökplatser. I modern tid verkar stora opersonliga platser ha övertagit en del av deras roll
                        som spökvisten, en av de populäraste varianterna av moderna spökhistorier är underjordiska kulvertar
                        under exempelvis stora sjukhus (som i Lars von Triers teveserie Riket). Det finns också legender om
                        spöken som rör sig över stora områden, exempelvis över hela länder, regioner eller hav –
                        Ahasverus och den flygande holländaren är exempel på sådana sägner.
                        De flesta spökberättelser utspelar sig under natten, eftersom berättelsen till stor del bygger
                        på mörkerrädsla. I svensk folktro blev ett spöke under dagen osynligt och orörligt, och den som
                        råkade passera en sådan dagståndare kunde bli gastkramad. Det har även förekommit föreställningar
                        om att själens vårdande kunde leva vidare efter att dess skyddsling gått bort, och en sådan herrelös
                        vård är den ursprungliga vålnaden. Spöken förekommer i isländska sagor, där en av termerna som används
                        om dem är draug. I senare norsk folktro var draugen namnet på ett drunkningsoffers vålnad.
                        Enligt vissa modernare myter består spöken av ektoplasma, och denna läran om spöken kallas ektologi.
                        
                        <iframe sandbox="allow-same-origin allow-scripts" 
                                width="100%" height="166" 
                                scrolling="no" 
                                frameborder="no" 
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/188004270&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
                        </iframe>
                        
                        <iframe sandbox="allow-same-origin allow-scripts" 
                                width="560" height="315" 
                                src="https://www.youtube.com/embed/AWKObuONzvI" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </p>-->
            </div>
            <div class="section" id="kontakt">
                <!--<h1 class="section-heading">Kontakt</h1>
                    <img src="static/images/thumbnails/IMG_0015.jpg">
                    <p class="section-text">
                        Enligt den vanligaste myten är spöken människor som dött, och som av någon anledning hemsöker en plats,
                        exempelvis sin dödsplats, kyrkor, på kyrkogårdar, på galgbackar, där de bodde, eller,
                        om de varit missdådare, på de platser där de övat sina illgärningar. Även slott och herresäten
                        är klassiska spökplatser. I modern tid verkar stora opersonliga platser ha övertagit en del av deras roll
                        som spökvisten, en av de populäraste varianterna av moderna spökhistorier är underjordiska kulvertar
                        under exempelvis stora sjukhus (som i Lars von Triers teveserie Riket). Det finns också legender om
                        spöken som rör sig över stora områden, exempelvis över hela länder, regioner eller hav –
                        Ahasverus och den flygande holländaren är exempel på sådana sägner.
                        De flesta spökberättelser utspelar sig under natten, eftersom berättelsen till stor del bygger
                        på mörkerrädsla. I svensk folktro blev ett spöke under dagen osynligt och orörligt, och den som
                        råkade passera en sådan dagståndare kunde bli gastkramad. Det har även förekommit föreställningar
                        om att själens vårdande kunde leva vidare efter att dess skyddsling gått bort, och en sådan herrelös
                        vård är den ursprungliga vålnaden. Spöken förekommer i isländska sagor, där en av termerna som används
                        om dem är draug. I senare norsk folktro var draugen namnet på ett drunkningsoffers vålnad.
                        Enligt vissa modernare myter består spöken av ektoplasma, och denna läran om spöken kallas ektologi.
                    </p>-->
            </div>
        </div>
        
        <input type="radio" name="to-top-radio" id="not-visible" checked />
        <input type="radio" name="to-top-radio" id="visible" />
        <div id="to-top">
            <p>To the top</p>
        </div>
            
        <script type="text/javascript" src="js/spoketikoket.js"></script>
    </body>
</html>
