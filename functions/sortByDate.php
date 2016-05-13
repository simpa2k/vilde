<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-09
 * Time: 17:38
 */

function sortByDateRising($entry1, $entry2) {
    
    return strcmp($entry1->date, $entry2->date);

}

function sortByDateFalling($entry1, $entry2) {

    return strcmp($entry2->date, $entry1->date);

}