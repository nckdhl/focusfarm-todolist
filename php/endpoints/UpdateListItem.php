<?php
/**
 *
 */
include "../connectdb.php";

session_start();

$requestOK = false;
$paramsOK = false;
$idOK = false;

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
    $listItemIDInput = filter_input(INPUT_POST, "listItemID", FILTER_SANITIZE_SPECIAL_CHARS);
    $listItemIsComplete = filter_input(INPUT_POST, "isComplete", FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

    if ($listItemTextInput != null && $listItemIDInput != null){

        if ($listItemIsComplete){
            $isComplete = 1;
        } else {
            $isComplete = 0;
        }

        if (updateListItem($dbh, $listItemIDInput, $listItemTextInput, $isComplete)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }

}
