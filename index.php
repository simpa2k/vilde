<?php
require_once 'vendor/autoload.php';
require_once 'core/init.php';

$loader = new Twig_Loader_Filesystem('templates/');
$twig = new Twig_Environment($loader);

$model = new MainPageModel();
$dateUtilities = new DateUtilities();

$gigsToBePlayed = $model->getGigsToBePlayed();

foreach($gigsToBePlayed as $gig) {

    $gig->date = $dateUtilities->dayAndMonth($gig->date);

}

echo $twig->render('main.twig', array(
		
		"news"	=> $model->getNews(),
		
		"quote" => $model->getQuote(),
		
		"gigs" => $gigsToBePlayed,

		"description" => $model->getDescription(),
		
		"contact" => array(
				
				"mail" => "vildeland@gmail.se",
				"contactpersons" => $model->getContactPersons()

		)
		
));
