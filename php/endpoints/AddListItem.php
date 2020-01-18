<?php
include "../connectdb.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to add a ListItem to the database
 */

session_start();

/**
 * SQL query function to add ListItem to the database
 *
 * @param $listItemTextInput
 * @param $listIDInput - foreign key
 * @param $today - today's date
 * @param $dbo
 * @return bool - false if failed, corresponding ListItemID if success
 */
function addListItem($listItemTextInput, $listIDInput, $today, $dbo){

    /**
     * Nested helper function to get the corresponding itemID
     * from the item inserted
     * @param $dbo
     * @param $listIDInput
     * @return bool
     */
    function getListItemID($dbo, $listIDInput){
        $command = "SELECT itemID FROM list_item WHERE listID=? ORDER BY itemID DESC LIMIT 1";
        $params = [$listIDInput];
        $stmt = $dbo->prepare($command);
        $success = $stmt->execute($params);
        if ($success) {
            $listItemID = $stmt->fetchColumn();
            return $listItemID;
        } else {
            return false;
        }
    }

    // Inserts list item to database
    $command = "INSERT INTO list_item (itemText, dateCreated, listID) VALUES (?, ?, ?)";
    $stmt = $dbo->prepare($command);
    $params = [$listItemTextInput, $today, $listIDInput];
    $success = $stmt->execute($params);
    if ($success && $stmt->rowCount() == 1){
        $listItemID = getListItemID($dbo, $listIDInput);
        if ($listItemID){
            return $listItemID;
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

    $listItemTextInput = filter_input(INPUT_POST, "content", FILTER_SANITIZE_SPECIAL_CHARS);
    $listIDInput = filter_input(INPUT_POST, "listID", FILTER_SANITIZE_SPECIAL_CHARS);

    if ($listItemTextInput !== null && $listIDInput != null) {

        // if the input is valid and the insertion worked then JSON response
        // with the corresponding ListItemID and a success value is returned
        if($listItemID = addListItem($listItemTextInput, $listIDInput, $today, $dbh)){
            echo json_encode(array("success" => true, "listItemID" => $listItemID));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}

