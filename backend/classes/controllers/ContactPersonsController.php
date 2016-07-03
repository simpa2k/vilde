<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-07-02
 * Time: 13:35
 */
class ContactPersonsController extends BaseController {
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

    public function postAction($request) {
        return $request->parameters;
    }
}