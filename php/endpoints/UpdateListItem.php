<?php

include "../connectdb.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to update list item data
 */

session_start();

$requestOK = false;
$paramsOK = false;
$idOK = false;

/**
 * SQL query function to update list item record
 * @param $dbo
 * @param $itemID
 * @param $itemText
 * @param $isComplete
 * @return bool - returns true if one row is affected
 */
function updateListItem($dbo, $itemID, $itemText, $isComplete){
    $command = "UPDATE list_item SET itemText=?, isComplete=? WHERE itemID=?";
    $stmt = $dbo->prepare($command);
    $params = [$itemText, $isComplete, $itemID];
    $success = $stmt->execute($params);
    if ($success && $stmt->rowCount() == 1){
       return true;
    } else {
        return false;
    }
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

// if the session is valid
if ($requestOK){

    $listItemTextInput = filter_input(INPUT_POST, "content", FILTER_SANITIZE_SPECIAL_CHARS);
    $listItemIDInput = filter_input(INPUT_POST, "listItemID", FILTER_SANITIZE_SPECIAL_CHARS);
    $listItemIsComplete = filter_input(INPUT_POST, "isComplete", FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

    if ($listItemTextInput != null && $listItemIDInput != null){

        if ($listItemIsComplete){
            $isComplete = 1;
        } else {
            $isComplete = 0;
        }

        // if the list item is successfully updated then a valid JSON response is echoed
        if (updateListItem($dbh, $listItemIDInput, $listItemTextInput, $isComplete)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }

}
