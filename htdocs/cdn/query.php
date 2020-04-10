<?php

$mysqli = new mysqli('localhost', 'root', '');
if(isset($_GET['q'])) $q = $mysqli->real_escape_string($_GET['q']);

echo '{';

if($_GET['a'] == "class" && isset($q)) {
    $result = $mysqli->query('SELECT * FROM `test`.`Course` WHERE `course_id` = $q');
    $row = $result->fetch_assoc();
    echo
        '"id":' . $row['course_id'] . ',' .
        '"title":"' . $row['course_title'] . '",' .
        '"department":"' . $row['department'] . '",' .
        '"description":"' . $row['course_description'] . '",' .
        '"fall":' . $row['fall'] . ',' .
        '"spring":' . $row['spring'] . ',' .
        '"summer":' . $row['summer'];
} else if($_GET['a'] == 'major') {
    $result = $mysqli->query('SELECT * FROM `test`.`Course`');
    echo '"classes":[';
    $num_rows = $result->num_rows;
    for($i = 0; $i < $num_rows; $i++) {
        $row = $result->fetch_assoc();
        echo
            '{' .
            '"id":' . $row['course_id'] . ',' .
            '"title":"' . $row['course_title'] . '",' .
            '"department":"' . $row['department'] . '",' .
            '"description":"' . str_ireplace("\n\t", "", $row['course_description']) . '",' . // This line is prone to line breaks in the DB which will break JSON
            '"fall":' . $row['fall'] . ',' .
            '"spring":' . $row['spring'] . ',' .
            '"summer":' . $row['summer'] .
            '}';
        if($i != $num_rows - 1) {
            echo ',';
        }
    }
    echo ']';
} else if($_GET['a'] == 'prereq') {
    $result = $mysqli->query('SELECT * FROM `test`.`PreREQ`');
    echo '"prereqs":[';
    $num_rows = $result->num_rows;
    for($i = 0; $i < $num_rows; $i++) {
        $row = $result->fetch_assoc();
        echo
            '{' .
            '"course":' . $row['course_id'] . ',' .
            '"prereq":' . $row['pre_req_id'] .
            '}';
        if($i != $num_rows - 1) {
            echo ",";
        }
    }
    echo ']';
} else if($_GET['a'] == 'coreq') {
    $result = $mysqli->query('SELECT * FROM `test`.`CoREQ`');
    echo '"coreqs":[';
    $num_rows = $result->num_rows;
    for($i = 0; $i < $num_rows; $i++) {
        $row = $result->fetch_assoc();
        echo
            '{' .
            '"course":' . $row['course_id'] . ',' .
            '"coreq":' . $row['co_req_id'] .
            '}';
        if($i != $num_rows - 1) {
            echo ",";
        }
    }
    echo ']';
}

echo '}';