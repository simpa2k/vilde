<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-15
 * Time: 18:01
 */

class GigsController extends BaseController {

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
        $this->getModel()->insert($request->parameters);
    }
    
    private function retrievePrimaryKey($requestParameters) {
        $dateAndTime = array();

        forEach($requestParameters as $key => $value) {
            if($key == 'date' || $key == 'time') {
                $dateAndTime[$key] = $value;
            }
        }
        
        return $dateAndTime;
    }
    
    public function put($request) {
        $id = $request->parameters['id'];
        $this->getModel()->update("id = $id", $request->parameters);
    }
    
    public function delete($request) {
        $id = $this->filterParameters(array('id'), $request->parameters);
        $this->getModel()->delete($this->formatParameters($id)); 
    }

}