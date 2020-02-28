<?php 
    include 'API.php'; 
    use \SCI\Acalog\API;

    /*  1. Query for current catalog id
    2. Query for object you want, eg. "CS 1501"
    3. Query for the objects detailed information */


    // Query for current catalog id
    $xpath = API::request([
        'url' => 'content',
        'opts' => [
            'method' => 'getCatalogs'
        ]
    ]);

    
    // Gets XML data
    $elements = $xpath->query("//*[@id]");

    // Gets the id of the first catalog listed in the XML which is also the most recent
    $undergrad_catalog = NULL;
    $catalog_id = NULL;
    if (!is_null($elements)) {
        foreach ($elements as $element) {
            if($element->nodeName == "catalog"){
                $attribute_map = $element->attributes;
                $catalog_id = $attribute_map->getNamedItem("id")->nodeValue;        // gets the current catalog's id
                $nodes = $element->childNodes;
                foreach ($nodes as $node) {
                    if (strpos($node->nodeValue, 'Catalog') !== false) {      
                        $undergrad_catalog = $node->nodeValue;
                        //$catalog_id = NULL;
                        break;
                    } else {
                        continue;
                    }
                }
                break;
            }
        }
        
        if($undergrad_catalog == NULL){
            echo "\nCATALOG COULD NOT BE FOUND\n";
        }

        if($catalog_id == NULL){
            echo "\nCATALOG ID COULD NOT BE FOUND\n";
        }

        echo $undergrad_catalog . " - ";
        echo $catalog_id . "\n";

    } else {
        echo "\nEMPTY QUERY ERROR\n";
    }

    // Query for course
    $xpath = API::request([
        'url' => 'content',
        'opts' => [
            'method' => 'getHierarchy',
            'catalog' => $catalog_id
        ]
    ]);

    $elements = $xpath->query("//*[@id]");
        
    // currently prints all elements and their associated ids and their associated children node
    // eventually will be ------ getting course IDS for all sorts of courses
    if (!is_null($elements)) {
        foreach ($elements as $element) {
            echo "<br/>[". $element->nodeName. "]";
        
            $nodes = $element->childNodes;
            foreach ($nodes as $node) {
                echo $node->nodeValue. "\n";
            }
        }
    }

    //// Query for course information
    //$xpath = API::request([
    //    'url' => 'content',
    //    'opts' => [
    //        'method' => 'getItems'
    //        'catalog' => $catalog_id
    //        'type' => 'courses'
    //        'ids[]' => $course_id
    //    ]
    //]);
    //

    
    // Parse course information and insert in an indexed 2D Array
    $course_info_array = array(
        "0" => array("Department", "Course ID", "Course Description", "Enrollment Requirements", "Offer Date"),
    );

    $index = 0;
    foreach()(
        $curr_course_arr = ( , , , );

        // where parsing and inserting data to curr_course_arr occurs

        $course_info_array[$index] = $curr_course_arr;
        $index++;
    )

    // Add course information to database
    $DB_HOST = '127.0.0.1:3306';
    $db_user = "root";
    $db_pass = "password";
    $db_name = "class_database_capstone";

    $connect = mysqli_connect($DB_HOST, $db_user, $db_pass, $db_name) or die("Failed to connect to MySQL: " . mysqli_error());

    if ($connection->connect_error) {
        die("Connection failed: " . $connect->connect_error);
    }

    // input data into MySQL database
    if(is_array($course_info_array)){
        foreach ($course_info_array as $curr_course) {
            $department = mysql_real_escape_string($course_info_array[$curr_course][0]);
            $course_id = mysql_real_escape_string($course_info_array[$curr_course][1]);
            $course_description = mysql_real_escape_string($course_info_array[$curr_course][3]);
            $enrollment_req = mysql_real_escape_string($course_info_array[$curr_course][4]);
            $offer_date = mysql_real_escape_string($course_info_array[$curr_course][5]);
            // NEED TO CHANGE FIELD NAMES FOR INSERT
            $new_insert = "INSERT INTO class_database_capstone (field1, field2, field3, field4, field5)
                            VALUES ( '". $department."','".$course_id."','".$course_description."','".$enrollment_req."','".$offer_date."' )";
            
            // check for error
            if ($connect->query($new_insert) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error at index: "  $curr_course . "<br>" . $new_insert . "<br>" . $connect->error;
            }

            mysqli_query($connect, $new_insert);
        }
    }

    $connect->close;
?>