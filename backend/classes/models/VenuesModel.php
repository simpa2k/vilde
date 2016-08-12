<?php

/**
 * Created by PhpStorm.
 * User: simon
 * Date: 2016-08-06
 * Time: 11:15
 */
class VenuesModel extends BaseModel {
    
    public function get($where) {
        return $this->getDB()->get('venue', $where)->results();
    }

    public function getAll() {
        return $this->getDB()->getAll('venue')->results();
    }
    
    public function insert($fields) {
        $this->getDB()->insert('venue', $fields);
    }

    public function update($primaryKey, $fields) {
        $this->getDB()->update('venue', $primaryKey, $fields);
    }

}