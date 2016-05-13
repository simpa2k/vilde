<?php

class MainPageModel {
	
	private $_db,
			$_gigHandler;

	public function __construct() {

		$this->_db = DB::getInstance();
		$this->_gigHandler = new GigHandler();

	}

	public function getNews() {

        $news = $this->_db->getAll('newsitem')->results();
        uasort($news, 'sortByDateFalling');

        return $news;

	}

    public function getGigsToBePlayed() {

        return $this->_gigHandler->getGigsToBePlayed();
        
    }

	public function getPlayedGigs() {

		return $this->_gigHandler->getPlayedGigs();

	}

	public function getQuote() {

        return $this->_db->get('quote', array('id', '=', '9'))->first();

	}

	public function getDescription() {

		return $this->_db->getAll('description')->results();

	}

	public function getMembers() {

        return $this->_db->getAll('member')->results();

	}

	public function getContactPersons() {

		return $this->_db->getAll('contactperson')->results();

	}

}
