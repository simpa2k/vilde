<?php
require_once 'core/init.php';

// Setting header
header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');


$gallery = new Gallery();

if($_GET) {
    $gallery->setPath('static/images/' . $_GET['folder']);
} else {
    Redirect::to('/');
}

$images = $gallery->getImages(array('jpg'));

?>

<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $_GET['folder']; ?></title>
        <link rel="stylesheet" href="static/css/gallery.css">
    </head>
    <body>
        <div id="background"></div>
        
        <div id="main">
            <?php if($images): ?>
                <div class="gallery-cf">
                    <?php foreach($images as $image): ?>
                    <a href="<?php echo $image['full']; ?>"><img class="gallery-item" src="<?php echo $image['thumb']; ?>"></a>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                There are no images.
            <?php endif ?>
        </div>
    </body>
</html>