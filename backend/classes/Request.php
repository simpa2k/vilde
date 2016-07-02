<?php
/**
 * Created by PhpStorm.
 * User: simpa2k
 * Date: 2016-05-15
 * Time: 16:33
 */

class Request {
    public $urlElements,
        $verb,
        $parameters,
        $format;

    public function __construct() {
        $this->verb = $_SERVER['REQUEST_METHOD'];
        $this->urlElements = explode('/', $_SERVER['PATH_INFO']);

        $this->parseIncomingParams();
        $this->format = 'json';
        if(isset($this->parameters['format'])) {
            $this->format = $this->parameters['format'];
        }

        return true;
    }

    public function parseIncomingParams() {
        $parameters = array();

        if(isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parameters);
        }

        $body = file_get_contents("php://input");
        $contentType = false;
        if(isset($_SERVER['CONTENT_TYPE'])) {
            $contentType = $_SERVER['CONTENT_TYPE'];
        }

        switch($contentType) {
            case "application/json":
                $bodyParams = json_decode($body);
                if($bodyParams) {
                    foreach($bodyParams as $paramName => $paramValue) {
                        $parameters[$paramName] = $paramValue;
                    }
                }
                
                $this->format = 'json';
                break;
        }

        $this->parameters = $parameters;
    }

}