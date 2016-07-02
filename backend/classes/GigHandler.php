<?php
require_once 'core/init.php';

class GigHandler {

	private $_db,
			$_dateUtilities;

	public function __construct() {

        $this->_db = DB::getInstance();

		$this->_dateUtilities = new DateUtilities();

	}

    private function getGigsByDateSorted($operator, $date, $sortingOrder = "") {

        $columns = "g.*, city, address, webpage";
        $sql = "SELECT $columns FROM venue v, gig g WHERE g.venue_name = v.name AND g.date $operator '$date' ORDER BY g.date $sortingOrder";

        return $this->_db->query($sql, array())->results();
    }

	public function getGigsToBePlayed() {

        $currentDate = date('Y-m-d');
        $gigsToBePlayed = $this->getGigsByDateSorted('>=', $currentDate);

		return $gigsToBePlayed;

	}

	public function getPlayedGigs() {

        $currentDate = date('Y-m-d');
        $playedGigs = $this->getGigsByDateSorted('<', $currentDate, "DESC");

        $playedGigsByYear = array();

		foreach($playedGigs as $index => $gig) {

            $gigDate = $gig->date;
            $gigYear = $this->_dateUtilities->year($gigDate);

            $playedGigsByYear[$gigYear][$index] = $gig;

		}

		return $playedGigsByYear;

	}
}
