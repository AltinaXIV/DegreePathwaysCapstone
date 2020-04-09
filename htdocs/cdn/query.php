<?php

$mysqli = new mysqli("localhost", "root", "");
if(isset($_GET['q'])) $q = $mysqli->real_escape_string($_GET['q']);

echo "{";

if($_GET['action'] == "class" && isset($q)) {
    $result = $mysqli->query("SELECT * FROM `test`.`Course` WHERE `course_id` = $q");
    $row = $result->fetch_assoc();
    echo
        '"id":' . $row['course_id'] . ',' .
        '"title":"' . $row['course_title'] . '",' .
        '"department":"' . $row['department'] . '",' .
        '"description":"' . $row['course_description'] . '",' .
        '"fall":' . $row['fall'] . ',' .
        '"spring":' . $row['spring'] . ',' .
        '"summer":' . $row['summer'];
} else if($_GET['action'] == "major") {
    $result = $mysqli->query("SELECT * FROM `test`.`Course`");
    echo '"classes":[';
    $num_rows = $result->num_rows;
    for($i = 0; $i < $num_rows; $i++) {
        $row = $result->fetch_assoc();
        echo
            "{" .
            '"id":' . $row['course_id'] . ',' .
            '"title":"' . $row['course_title'] . '",' .
            '"department":"' . $row['department'] . '",' .
            '"description":"' . $row['course_description'] . '",' .
            '"fall":' . $row['fall'] . ',' .
            '"spring":' . $row['spring'] . ',' .
            '"summer":' . $row['summer'] .
            "}";
        if($i != $num_rows - 1) {
            echo ",";
        }
    }
    echo "]";
}

echo "}";