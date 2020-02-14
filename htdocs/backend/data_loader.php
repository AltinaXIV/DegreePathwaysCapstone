<?php 
    include 'API.php'; 
    use \SCI\Acalog\API;

    $xpath = API::request([
        'url' => 'content',
        'opts' => [
            'method' => 'getCatalogs'
        ]
    ]);

    
    $elements = $xpath->query("//*[@id]");

    if (!is_null($elements)) {
        foreach ($elements as $element) {
            echo "<br/>[". $element->nodeName. "]";
        
            $nodes = $element->childNodes;
            foreach ($nodes as $node) {
                echo $node->nodeValue. "\n";
            }
        }
    }

    /*  1. Query for current catalog id
        2. Query for object you want, eg. "CS 1501"
        3. Query for the objects detailed information */
?>