<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-16
 * Time: 10:24
 */

class GigsModel extends BaseModel {

    public function get($where) {

        return $this->getDB()->get('gig', $where)->results();

    }

    public function getAll() {

        return $this->getDB()->getAll('gig')->results();

    }
}