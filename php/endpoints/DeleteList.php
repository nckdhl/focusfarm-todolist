<?php

include "../connectdb.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to delete a list from the database
 */

session_start();

/**
 * SQL query function to delete list from the database
 * @param $dbo
 * @param $listID
 * @return bool - returns true if affected 1 row
 */
function deleteListByID($dbo, $listID){
    $command = "DELETE FROM list WHERE listID=?";
    $params = [$listID];
    $stmt = $dbo->prepare($command);
    $success = $stmt->execute($params);
    return ($success && $stmt->rowCount() == 1);
}

// session validation
if (isset($_SESSION["userID"])){
    $requestOK = true;
    $userID = $_SESSION["userID"];
} else {
    session_unset();
    session_destroy();
    header("Location: ../../index.html");
    exit();
}

if ($requestOK){

    $listIDInput = filter_input(INPUT_POST, "listID", FILTER_SANITIZE_SPECIAL_CHARS);

    if ($listIDInput !== null) {
        // if the list was deleted a valid JSON response is echoed
        if(deleteListByID($dbh, $listIDInput)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}