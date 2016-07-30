<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-16
 * Time: 10:24
 */

class GigsModel extends BaseModel {

    public function get($where = array()) {

        $action = 'SELECT *';
        $table = 'gig, venue';
        $joinCondition = array( 0 => array('venue_name', 'name'));

        return $this->getDB()->action($action, $table, $where, $joinCondition)->results();

    }

    public function getAll() {

        return $this->get();
        
    }
    
    public function insert($fields) {
       $this->getDB()->insert('gig', $fields); 
    }
}