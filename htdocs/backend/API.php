<?php
namespace SCI\Acalog;

use \mysqli;
use \DOMDocument;
use \DOMXPath;
use \DateTime;
use \DateInterval;

class API {

    public function __construct() { }

    public static function request($req) {
        /*base url for the api plus additional parts needed for whatever request
         * is being made */
        $url = 'http://pitt.apis.acalog.com/v1/' . $req['url'];
        /*opts is the query variables that need to be set for the request, I
         * merge it with the default opts array because those always need to be
         * there */
        $opts = array_merge(
            $req['opts'],
            [
                'format' => 'xml',
                'organization' => '1',
                'key' => '679b66c1f1d145940bee435552557e646cca4545'
            ]
        );
        $flat_opts = [];
        foreach($opts as $k => $v) {
            $flat_opts[] = $k . '=' . urlencode($v);
        }
        $request = $url . '?' . implode('&', $flat_opts);
        $xml = API::_get_from_cache($request);
        if($xml == null) {
            $xml = file_get_contents($request);
            API::_add_to_cache($request, $xml);
        }
        $dom = new DOMDocument('1.0', 'UTF-8');
        $dom->loadXML($xml);
        while(strpos($dom->saveXML(), 'xi:include') !== false) {
            $dom->xinclude();
        }
        $response = new DOMXPath($dom);
        $uri = $dom->lookupnamespaceURI(NULL);
        $response->registerNamespace('c', $uri); 
        return $response;
    }

    private function _get_from_cache($request) {
        $db = new mysqli('localhost', 'root', 'password', 'class_database_capstone');
        $query = 'SELECT id, data, cached_on FROM cache WHERE url = ?';
        if($stmt = $db->prepare($query)) {
            $stmt->bind_param('s', $request);
            $stmt->execute();
            $stmt->bind_result($id, $data, $cached_on);
            if($stmt->fetch()) {
                $today = new DateTime();
                $july1 = new DateTime($today->format('t') . '07-01');
                $cached_on = new DateTime($cached_on);
                if(
                    ($today >= $july1 && $cached_on < $july1) ||
                    $cached_on->add(new DateInterval('P1W')) < $today
                ) {
                    API::_remove_from_cache($id);
                    return null;
                } else {
                    return $data;
                }
            } else {
                return null;
            }
            $stmt->close();
        }
        $db->close();
    }

    private function _add_to_cache($request, $data) {
        $db = new mysqli('localhost', 'root', 'password', 'class_database_capstone');
        $query = 'INSERT INTO cache(url, data, cached_on) VALUES(?, ?, NOW())';
        if($stmt = $db->prepare($query)) {
            $stmt->bind_param('ss', $request, $data);
            $stmt->execute();
            $stmt->close();
        }
        $db->close();
    }

    private function _remove_from_cache($id) {
        $db = new mysqli('localhost', 'root', 'password', 'class_database_capstone');
        $query = 'DELETE FROM cache where id = ?';
        if($stmt = $db->prepare($query)) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $stmt->close();
        }
        $db->close();
    }

}
