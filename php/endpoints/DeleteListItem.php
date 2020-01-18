<?php
include "../connectdb.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to delete a list item from the database
 */

session_start();

/**
 * SQL query function to delete list item from dataabase
 *
 * @param $dbo
 * @param $itemID - item ID
 * @return bool - returns true if one row affected
 */
function deleteItemByID($dbo, $itemID){
    $command = "DELETE FROM list_item WHERE itemID=?";
    $params = [$itemID];
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

if ($requestOK) {

    $listItemIDInput = filter_input(INPUT_POST, "itemID", FILTER_SANITIZE_SPECIAL_CHARS);

    if ($listItemIDInput !== null) {
        // if the deletion was successful then a valid JSON response is echoed
        if(deleteItemByID($dbh, $listItemIDInput)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }


}