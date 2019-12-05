<?php
/**
 *
 */

include "../connectdb.php";

session_start();

function addListItem($listItemTextInput, $listIDInput, $today, $dbo){

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
        if($listItemID = addListItem($listItemTextInput, $listIDInput, $today, $dbh)){
            echo json_encode(array("success" => true, "listItemID" => $listItemID));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}

