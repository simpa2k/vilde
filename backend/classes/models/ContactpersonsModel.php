<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-07-02
 * Time: 13:34
 */
class ContactPersonsModel extends BaseModel {
    public function get($where) {

        return $this->getDB()->get('contactperson', $where)->results();

    }

    public function getAll() {

        return $this->getDB()->getAll('contactperson')->results();

    }
}