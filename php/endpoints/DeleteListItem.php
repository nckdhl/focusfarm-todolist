<?php
/**
 *
 */
include "../connectdb.php";

session_start();

function deleteItemByID($dbo, $itemID){
    $command = "DELETE FROM list_item WHERE itemID=?";
    $params = [$itemID];
    $stmt = $dbo->prepare($command);
    $success = $stmt->execute($params);
    return ($success && $stmt->rowCount() == 1);
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

if ($requestOK) {

    $listItemIDInput = filter_input(INPUT_POST, "itemID", FILTER_SANITIZE_SPECIAL_CHARS);

    if ($listItemIDInput !== null) {
        if(deleteItemByID($dbh, $listItemIDInput)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }


}