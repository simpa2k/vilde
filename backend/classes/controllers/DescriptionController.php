<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-07-01
 * Time: 22:57
 */
class DescriptionController extends BaseController {
    public function __construct($model) {
        parent::__construct($model);
    }

    public function getAction($request) {

        if (isset($request->urlElements[2])) {
            return $request->urlElements[2];
        } else {
            return $this->handleQuery($request);
        }

    }

    public function post($request) {
        return $request->parameters;
    }

    public function put($request) {

    }

    public function delete($request) {

    }
}