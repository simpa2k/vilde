<?php
require_once 'vendor/autoload.php';
require_once 'core/init.php';

$loader = new Twig_Loader_Filesystem('templates/');
$twig = new Twig_Environment($loader);

$model = new MainPageModel();
$dateUtilities = new DateUtilities();

$gigsToBePlayed = $model->getGigsToBePlayed();

foreach($gigsToBePlayed as $gig) {

	if($gig->price == null) {
		$gig->price = 'Gratis!';
	} else {
		$gig->price = $gig->price . ":-";
	}

    $gig->date = $dateUtilities->dayAndMonth($gig->date);

}

echo $twig->render('main.twig', array(
		
		"news"	=> $model->getNews(),
		
		"quotes" => array(
			0 => $model->getQuote(6),
			1 => $model->getQuote(7)
		),
		
		"gigs" => $gigsToBePlayed,

		"description" => $model->getDescription(),
		
		"contact" => array(
				
				"mail" => "vildeland@gmail.se",
				"contactpersons" => $model->getContactPersons()

		)
		
));
