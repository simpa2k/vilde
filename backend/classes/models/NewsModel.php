<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-16
 * Time: 16:43
 */
class NewsModel extends BaseModel {

    public function get($where) {

        return $this->getDB()->get('newsitem', $where)->results();

    }

    public function getAll() {

        return $this->getDB()->getAll('newsitem')->results();

    }
}