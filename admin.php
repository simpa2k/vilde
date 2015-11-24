<?php
require_once 'core/init.php';

header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');

$user = new User();

if ( $user->isLoggedIn() ) {
    $db = DB::getInstance();
    $gallery = new Gallery();
    $gallery->setPath('static/images/');
    $images = $gallery->getImages();
    
    $imageUploadErrors = array();

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
        
        foreach($_POST as $item_id => $item ) {
            $db->update('admin_main_page', $item_id, array(
                'content' => Input::get($item_id)
            ));
        }
    }
    
    // Initializing variables after checking for input, so they're not set before the database gets updated on post.
    $shows = $db->get('admin_main_page', array('type', '=', 'shows'))->first();
    $about = $db->get('admin_main_page', array('type', '=', 'about'))->first();
    $musikOchFilm = $db->get('admin_main_page', array('type', '=', 'musikochfilm'))->first();
    $kontakt = $db->get('admin_main_page', array('type', '=', 'kontakt'))->first();

    // Using variables for textarea sizes, for ease of editing
    $rows = 30;
    $cols = 25;

?>
    <!DOCTYPE html>
    <html>
        <head>
            <title>Spöket i köket</title>
            <!--Setting viewport for mobile devices. Maximum-scale preventing mobile Safari from changing scale when
                switching to landscape mode.-->
            <meta name="viewport" content="width=device-width, initial-scale=0.5">
            <link rel="stylesheet" type="text/css" href="static/css/admin.css">
        </head>
        <body id="body">
            <div id="background">
                <!--<img src="static/images/spoketbackground.jpg">-->
            </div>
            
            <div id="main">
                <div id="header">
                    <p class="heading">Konserter</p>
                    <p class="heading">Om spöket</p>
                    <p class="heading">Musik och media</p>
                    <p class="heading">Kontakt</p>
                    <!--<a class="heading-link" href="kul.php">Kul!</a>-->
                </div>
                
                <div class="section" id="shows">
                    <h1 class="section-heading">Konserter</h1>
                    <div class="image-form">
                        <a href="static/images/shows.jpg"><img src="static/images/thumbnails/shows.jpg"></a>
                        <form class="image-form" enctype="multipart/form-data" action="" method="post">
                            <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
                            <input name="shows" type="file">
                            <input type="submit" value="Ladda upp en ny bild">
                        </form>
                        <!-- This code can be used to display image upload errors. The error messages seem to be completely
                             irrelevant, however.
                        <p><?php /*if($imageUploadErrors) {
                                    foreach($imageUploadErrors as $error) {
                                        echo $error, '<br>';
                                    }
                                 };*/
                            ?>
                        </p>-->
                    </div>
                    <form action="" method="post">
                        <textarea rows="<?php echo $rows; ?>"
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $shows->id; ?>"
                                  ><?php echo $shows->content; ?></textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
                </div>
                    
                <div class="section" id="about">
                    <h1 class="section-heading">Om spöket</h1>
                    <div class="image-form">
                        <a href="static/images/about.jpg"><img src="static/images/thumbnails/about.jpg"></a>
                        <form class="image-form" enctype="multipart/form-data" action="" method="post">
                            <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
                            <input name="about" type="file">
                            <input type="submit" value="Ladda upp en ny bild">
                        </form>
                        <!-- This code can be used to display image upload errors. The error messages seem to be completely
                             irrelevant, however.
                        <p><?php /*if($imageUploadErrors) {
                                    foreach($imageUploadErrors as $error) {
                                        echo $error, '<br>';
                                    }
                                 };*/
                            ?>
                        </p>-->
                    </div>
                    <form action="" method="post">
                        <textarea rows="<?php echo $rows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $about->id; ?>"
                                  ><?php echo $about->content; ?></textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
                </div>
                <div class="section" id="musikochfilm">
                    <h1 class="section-heading">Musik och media</h1>
                    <div class="image-form">
                        <a href="static/images/musikOchFilm.jpg"><img src="static/images/thumbnails/musikOchFilm.jpg"></a>
                        <form class="image-form" enctype="multipart/form-data" action="" method="post">
                            <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
                            <input name="musikOchFilm" type="file">
                            <input type="submit" value="Ladda upp en ny bild">
                        </form>
                        <!-- This code can be used to display image upload errors. The error messages seem to be completely
                             irrelevant, however.
                        <p><?php /*if($imageUploadErrors) {
                                    foreach($imageUploadErrors as $error) {
                                        echo $error, '<br>';
                                    }
                                 };*/
                            ?>
                        </p>-->
                    </div>
                    <form action="" method="post">
                        <textarea rows="<?php echo $rows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $musikOchFilm->id; ?>"
                                  ><?php echo $musikOchFilm->content; ?>
                        </textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
                                
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
                </div>
                <div class="section" id="kontakt">
                    <h1 class="section-heading">Kontakt</h1>
                    <div class="image-form">
                        <a href="static/images/kontakt.jpg"><img src="static/images/thumbnails/kontakt.jpg"></a>
                        <form class="image-form" enctype="multipart/form-data" action="" method="post">
                            <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
                            <input name="kontakt" type="file">
                            <input type="submit" value="Ladda upp en ny bild">
                        </form>
                        <!-- This code can be used to display image upload errors. The errors seem to be completely
                             irrelevant, however.
                        <p><?php /*if($imageUploadErrors) {
                                    foreach($imageUploadErrors as $error) {
                                        echo $error, '<br>';
                                    }
                                 };*/
                            ?>
                        </p>-->
                    </div>
                    <form action="" method="post">
                        <textarea rows="<?php echo $rows; ?>" 
                                  cols="<?php echo $cols; ?>" 
                                  name="<?php echo $kontakt->id; ?>"
                                  ><?php echo $kontakt->content; ?></textarea>
                        <input type="submit" value="Uppdatera">
                    </form>
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
<?php
} else {
    Redirect::to('/');
}