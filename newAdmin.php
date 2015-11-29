<?php 
require_once 'core/init.php';

// Setting header
header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');

$user = new User();

If($user->isLoggedIn()) {
    // Instantiating database
    $db = DB::getInstance('utf8');
    
    //Instantiating gallery and setting gallery path
    $gallery = new Gallery();
    $gallery->setPath('static/images/');
    $images = $gallery->getImages();
    
    //Checking for input. Doing it before initializing variables, so they update content properly on site reload
    if ( Input::exists() ) {

        if($_FILES) {
            //Getting the form that the image was posted from
            $postingForm = $gallery->getPosition($_FILES);
            $uplImage = $_FILES[$postingForm];
            //Changing the filename to the name of the form that it was posted from
            $filename = $postingForm . '.jpg';
            $targetPath = "static/images/" . $filename;
            
            if(!move_uploaded_file($uplImage['tmp_name'], $targetPath)) {
                $imageUploadErrors[] = "Error code " . $uplImage['error'] . ". Please try again.";
            }
            
            $pathToImages = "static/images/";
            $pathToThumbs = "static/images/thumbnails/";
            
            if($gallery->createThumbnail($pathToImages, $pathToThumbs, 256)) {
                $imageUploadErrors[] = "Successfully made thumbnail.";
            } else {
                $imageUploadErrors[] = "Something went wrong.";
            }
        }
        
        if($_POST) {
            foreach($_POST as $item_id => $item ) {
                if(is_numeric($item_id)) {
                    $db->update('admin_main_page', $item_id, array(
                    'content' => Input::get($item_id)
                ));
                }
            }
            
            $fields = array(
                    'id'               => NULL,
                    'date'             => $_POST['date'],
                    'ticketLink'       => $_POST['ticketLink'],
                    'dateAndLocation'  => $_POST['dateAndLocation'],
                    'address'          => $_POST['address'],
                    'additionalInfo'   => $_POST['additionalInfo']
                );
                    
            $db->insert('konserter', $fields);
        }
    }
    
    // Initializing variables
    $currentDate = date('Y-m-d');
    
    $allGigs = $db->getAll('konserter')->results();
    $counter = 0;
    
    $about = $db->get('admin_main_page', array('type', '=', 'about'))->first();
    
    $noGigs = $db->get('admin_main_page', array('type', '=', 'noGigs'))->first();
    $kontaktRubrik = $db->get('admin_main_page', array('type', '=', 'kontaktRubrik'))->first();
    $kontaktMail = $db->get('admin_main_page', array('type', '=', 'kontaktMail'))->first();
    $kontaktTelSE = $db->get('admin_main_page', array('type', '=', 'kontaktTelSE'))->first();
    $kontaktTelDK = $db->get('admin_main_page', array('type', '=', 'kontaktTelDK'))->first();
    
    // Using variables for textarea sizes, for ease of editing
    $rows = 10;
    $contactRows = 2;
    $cols = 25;
    
    $years = array();
    
    $allGigs = $db->sortArrayByDate($allGigs);
    
    //Make a list of every year with associated entries
    foreach($allGigs as $gig) {
        
        $date = $gig->{'date'};
        $explodedDate = explode('-', $date);
        $year = $explodedDate[0];
                                
        if(!in_array($year, $years)) {
            $years[] = $year;
        }
    }

    ?>
    
    <!DOCTYPE html>
    <html>
        <head>
            <title>Spöket i köket</title>
            <!--Setting viewport for mobile devices-->
            <meta name="viewport" content="width=device-width, initial-scale=0.5">
            <link rel="stylesheet" type="text/css" href="static/css/alternate_admin.css">
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
                        <?php 
                            
                            foreach($allGigs as $index => $gig) {
                                
                                $dateAndLocation = $gig->{'dateAndLocation'};
                                $dateAndLocation = explode(',', $dateAndLocation);
                                    
                                //Formatting the next gig differently. The formatting is based on the info of the
                                //first gig that was displayed on the web site and the division into several fields 
                                //in the database structure was done so that the gig could be displayed with less 
                                //info once it had been played.
                                if( ($gig->{'date'} > $currentDate) && ($counter == 0) ) {
                                    
                                    echo '<p id="current-gig">' . $dateAndLocation[0] .
                                    ', ' . $allGigs[0]->{'address'} . ', ' . $dateAndLocation[1] .
                                    ' ' . $allGigs[0]->{'additionalInfo'} . '</p>';
                                    
                                    if($allGigs[0]->{'ticketLink'}) {
                                    
                                        echo '<a class="small-small-heading" href="' . $gig->{'ticketLink'} .
                                        '">Klicka här för att köpa biljetter!</a></p>';    
                                    }
                                    
                                    unset($allGigs[$index]);
                                    
                                } else if ( ($gig->{'date'} < $currentDate) && ($counter == 0) ) {
                                    
                                    //If there are no upcoming gigs
                                    echo '<p id="current-gig">' . $noGigs->content . '</p>';  
                                  
                                    
                                } else if ( $gig->{'date'} > $currentDate && ($counter > 0) ) {
                                    //All the rest of the gigs that are yet to be played
                                    echo '<p class="upcoming-gig">' . $dateAndLocation . '</p>';
                                        
                                    if($gig->{'ticketLink'}) {
                                        echo '<a class="small-small-heading" href="' . $gig->{'ticketLink'} .
                                        '">Klicka här för att köpa biljetter!</a></p>';    
                                    }
                                    
                                    unset($allGigs[$index]);
            
                                }
                                
                                $counter++;   
                                
                                    
                            }
                            
                            //Displaying gigs that have already been played in a kind of dropdown menu
                            echo '<br/><p class="small-heading" id="dropdown-menu-button">Här har vi spelat tidigare &raquo;</p>';
                            foreach($years as $year) {
                                echo '<h5 class="dropdown-menu-item">' . $year . '</h5>';
                                foreach($allGigs as $gig) {
                                    $entryDate = $gig->{'date'};
                                    $explodedEntryDate = explode('-', $entryDate);
                                    $entryYear = $explodedEntryDate[0];
                                    
                                    if($entryYear == $year) {
                                        echo '<p class="dropdown-menu-item">' . $gig->{'dateAndLocation'} . '</p>';
                                    }
                                }
                            }
                        
                        ; ?>
                        
                        <form action="" method="post">
                            Lägg till ett nytt gig!
                            <br/>
                            Datum för giget: <input type="text" name="date">
                            <br/>
                            Länk till biljettköp: <input type="text" name="ticketLink">
                            <br/>
                            Datum och plats: <input type="text" name="dateAndLocation">
                            <br/>
                            Adress: <input type="text" name="address">
                            <br/>
                            Ytterligare information: <input type="text" name="additionalInfo">
                            <br/>
                            <input type="submit">
                        </form>            
                </div>
                
                <div class="section" id="about">
                    <p class="section-heading">OM SPÖKET</p>
                        <a href="static/images/about.jpg"><img src="static/images/about.jpg"></a>
                        
                    <form action="" method="post">
                        <textarea rows="<?php echo $rows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $about->id; ?>"
                                  ><?php echo $about->content; ?></textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
                </div>
                    
                <div class="section" id="musikochfilm">
                    <p class="section-heading">MUSIK OCH MEDIA</p>
                        <p class="small-heading">Spöket på bild:</p>
                        <div id="album-container">
                            <a href="https://www.spoketikoket.com/gallery.php?folder=Pressfoto Mars - 15"><img class="medium-thumbnail" src="static/images/Pressfoto Mars - 15/albumcover/pressfoto0315_med.jpg"></a>
                            <p class="large-text">Pressfoto Mars - 15</p>
                        </div>
                        <div id="album-container">
                            <a href="https://www.spoketikoket.com/gallery.php?folder=Stallet Maj - 15"><img class="medium-thumbnail" src="static/images/Stallet Maj - 15/albumcover/spoketikoketStallet_med.jpg"></a>
                            <p class="large-text">Stallet Maj - 15</p>
                        </div>
                        <div id="album-container">
                            <a href="https://www.spoketikoket.com/gallery.php?folder=Folk at Heart - 15"><img class="medium-thumbnail" src="static/images/Folk at Heart - 15/albumcover/folkAtHeart15_med.jpg"></a>
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
                        
                        <iframe sandbox="allow-same-origin allow-scripts"
                                width="560" height="315" 
                                src="https://www.youtube.com/embed/aFsEZgCkrxA" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                        
                        <p class="small-heading">Spöket i Köket på Soundcloud:</p>
                        <a href="https://soundcloud.com/sp-ket-i-k-ket">https://soundcloud.com/sp-ket-i-k-ket</a>
                        <br/>
                        <br/>
                        
                        <div class="soundcloud-div">
                        <iframe sandbox="allow-same-origin allow-scripts" 
                                width="100%" height="166" 
                                scrolling="no" 
                                frameborder="no" 
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/193838040&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
                        </iframe>
                        
                        <iframe sandbox="allow-same-origin allow-scripts" 
                                width="100%" height="166" 
                                scrolling="no" 
                                frameborder="no" 
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/188004270&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false">
                        </iframe>
                        </div>
                        
                        <iframe sandbox="allow-same-origin allow-scripts"
                                width="100%" height="332" 
                                scrolling="no" 
                                frameborder="no" 
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/188004885&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true">
                        </iframe>
                        
                </div>
                
                <div class="section" id="kontakt">
                    <p class="section-heading">KONTAKT</p>
                        <p class="small-heading"><?php echo $kontaktRubrik->content; ?></p>
                            
                    <form class="small-form" action="" method="post">
                        <textarea class="small-textarea"
                                  rows="<?php echo $contactRows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $kontaktMail->id; ?>"
                                  ><?php echo $kontaktMail->content; ?>
                        </textarea>
                        <textarea class="small-textarea"
                                  rows="<?php echo $contactRows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $kontaktTelSE->id; ?>"
                                  ><?php echo $kontaktTelSE->content; ?>
                        </textarea>
                        <textarea class="small-textarea"
                                  rows="<?php echo $contactRows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $kontaktTelDK->id; ?>"
                                  ><?php echo $kontaktTelDK->content; ?>
                        </textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
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
<?php
} else {
    Redirect::to('/');
}
