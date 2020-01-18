<?php

include "../connectdb.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to add a List to the database
 */
session_start();

/**
 * SQL query function to add List to database
 * @param $listTitleInput
 * @param $today - todays date
 * @param $dbo
 * @return bool - true if success, false if fail
 */
function addList($listTitleInput, $today, $dbo){

    /**
     * Nested helper function to perform a SQL query
     * that retrieves just the last List's listID for logged in user
     * @param $dbo
     * @return bool
     */
    function getListID($dbo){
        $command = "SELECT listID FROM list WHERE userID=? ORDER BY listID DESC LIMIT 1";
        $params = [$_SESSION["userID"]];
        $stmt = $dbo->prepare($command);
        $success = $stmt->execute($params);
        if ($success) {
            $listID = $stmt->fetchColumn();
            return $listID;
        } else {
            return false;
        }
    }

    // Inserts list into database for logged in user
    $command = "INSERT INTO list (listTitle, dateCreated, userID) VALUES (?, ?, ?)";
    $stmt = $dbo->prepare($command);
    $params = [$listTitleInput, $today, $_SESSION["userID"]];
    $success = $stmt->execute($params);
    if ($success && $stmt->rowCount() == 1){
        $listID = getListID($dbo);
        if ($listID){
            return $listID;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

$requestOK = false;
$userID = "";
$today = date("Y-m-d");

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

    $listTitleInput = filter_input(INPUT_POST, "listTitle", FILTER_SANITIZE_SPECIAL_CHARS);

    // if the input is valid and the insertion worked then JSON response
    // with the corresponding ListID and a success value is returned
    if ($listTitleInput !== null) {
        if($listID = addList($listTitleInput, $today, $dbh)){
            echo json_encode(array("success" => true, "listID" => $listID));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}
