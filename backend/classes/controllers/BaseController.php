<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-15
 * Time: 18:14
 */

require_once 'core/init.php';

class BaseController {

    private $model;
    private $operators = array('gt' => '>',
                               'gte' => '>=',
                               'lt' => '<',
                               'lte' => '<=');

    public function __construct($model) {

        $this->model = $model;

    }

    protected function getModel() {

        return $this->model;

    }

    protected function translateOperator($operator) {

        if(array_key_exists($operator, $this->operators)) {

            return $this->operators[$operator];

        } else {

            return $operator;

        }

    }

    public function handleQuery($request) {

        if($request->parameters) {

            $results = $this->model->get($this->filter($request->parameters));
            return $results;

        } else {

            return $this->model->getAll();

        }

    }
    
    /*
     * The following method is used to parse the request
     * parameters and present them in a format that's readable as
     * sql where-conditions to the database wrapper. 
     * However, due to lack of time there are some inconsistencies
     * in what format the database wrapper expects where conditions to be in
     * for different types of operations.
     * Currently the request parameters must be filtered when inserting
     * and when deleting but not when updating.
     */

    protected function filter($parameters) {

        $where = array();

        foreach($parameters as $parameterName => $parameter) {

            $parameterParts = explode('=', $parameter);

            if(sizeof($parameterParts) == 1) {
                $where[] = array($parameterName, '=', $parameterParts[0]);
            } else {
                $where[] = array($parameterName, $this->translateOperator($parameterParts[0]), $parameterParts[1]);
            }

        }

        return $where;

    }

}