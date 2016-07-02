<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-16
 * Time: 10:24
 */

abstract class BaseModel {

    private $db;

    public function __construct() {

        $this->db = DB::getInstance();
        
    }

    public function getDB() {

        return $this->db;

    }

    public abstract function get($where);

    public abstract function getAll();
}