<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-07-01
 * Time: 20:11
 */
class QuotesController extends BaseController {
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
}