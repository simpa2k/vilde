<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-07-01
 * Time: 22:56
 */
class DescriptionModel extends BaseModel {
    public function get($where) {

        return $this->getDB()->get('description', $where)->results();

    }

    public function getAll() {

        return $this->getDB()->getAll('description')->results();

    }
    
    public function update($primaryKey, $fields) {
        $this->getDB()->update('description', $primaryKey, $fields);
    }
}