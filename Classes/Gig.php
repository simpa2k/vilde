<?php

class Gig {

	private $_date,
		$_time,
		$_price,
		$_info,
		$_ticket_link,
		$_venue;

	public function __construct($date, $time, $price, $info, $ticket_link, $venue) {

		$this->_date = $date;
		$this->_time = $time;
		$this->_price = $price;
		$this->_info = $info;
		$this->_ticket_link = $ticket_link;
		$this->_venue = $venue;

	}

}
