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
    private $operators = array('gt' => '>', 'lt' => '<');

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