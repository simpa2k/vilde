<?php

class Location {

	private $_city,
		$_address;

	public function __construct($city, $address) {

		$this->_city = $city;
		$this->_address = $address;

	}
}
