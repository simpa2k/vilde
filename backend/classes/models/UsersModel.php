<?php

/**
 * Created by PhpStorm.
 * User: simon
 * Date: 2016-07-28
 * Time: 18:53
 */
class UsersModel extends BaseModel
{
    public function get($where)
    {
        return $this->getDB()->get('users', $where)->first();
    }

    public function getAll()
    {
        // TODO: Implement getAll() method.
    }
    
    public function updateToken($id, $token) {
        $debug = fopen('debugfile.txt', 'w');
        fwrite($debug, var_export($token, true));
        fclose($debug);
        $fields = array('token' => $token);
        $this->getDB()->update('users', $id, $fields); 
    }

}