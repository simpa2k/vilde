<?php

/**
 * Created by PhpStorm.
 * User: simon
 * Date: 2016-08-22
 * Time: 23:37
 */
class QuotesectionsModel extends BaseModel {

    public function get($where) {
        
        //If only 'id' is provided in the where clause
        //it will be ambiguous. Prefixing it fixes that.
        if($where[0][0] == 'id') {
            $where[0][0] = 'quotesection.id';
        }

        $action = 'SELECT *';
        $table = 'quote, quotesection';
        $joinCondition = array( 0 => array('quote_id', 'quote.id'));

        return $this->getDB()->action($action, $table, $where, $joinCondition)->results();
    }

    public function getAll() {
        return $this->get();
    }
    
    public function update($primaryKey, $fields) {
        $this->getDB()->update('quotesection', $primaryKey, $fields);
    }
}