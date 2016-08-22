<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-06-30
 * Time: 18:27
 */
class QuotesModel extends BaseModel {

    public function get($where) {

        return $this->getDB()->get('quote', $where)->results();

    }

    public function getAll() {

        return $this->getDB()->getAll('quote')->results();

    }
    
    public function insert($fields) {
        $this->getDB()->insert('quote', $fields);
    }

    public function update($primaryKey, $fields) {
        $this->getDB()->update('quote', $primaryKey, $fields);
    }

    public function delete($where) {
        $this->getDB()->delete('quote', $where);
    }

}