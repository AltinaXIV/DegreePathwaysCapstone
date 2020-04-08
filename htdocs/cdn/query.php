<?php

$mysqli = new mysqli("localhost", "root", "");
$q = $mysqli->real_escape_string($_GET['q']);

if($_GET['action'] == "class") {
    $result = $mysqli->query("SELECT * FROM `test`.`Course` WHERE `course_id` = $q");
    $row = $result->fetch_assoc();
    echo "{" .
        "id:" . $row['course_id'] . "," .
        "title:\"" . $row['course_title'] . "\"," .
        "department:\"" . $row['department'] . "\"," .
        "description:\"" . $row['course_description'] . "\"," .
        "fall:" . $row['fall'] . "," .
        "spring:" . $row['spring'] . "," .
        "summer:" . $row['summer'] .
        "}";

}


