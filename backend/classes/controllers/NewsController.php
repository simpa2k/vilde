<?php

/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-16
 * Time: 16:43
 */
class NewsController extends BaseController {

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
        $debug = fopen('debugfile.txt', 'w');
        fwrite($debug, var_export($request->parameters, true));
        fclose($debug);
        $this->getModel()->insert($request->parameters);
    }
    
    public function put($request) {
        $id = $request->parameters['id'];
        $this->getModel()->update($id, $request->parameters);
    }
    
    public function delete($request) {
        $id = $this->filterParameters(array('id'), $request->parameters);
        $this->getModel()->delete($this->formatParameters($id)); 
    }
}