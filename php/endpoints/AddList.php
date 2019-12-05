<?php

include "../connectdb.php";

session_start();

function addList($listTitleInput, $today, $dbo){

    function getListID($dbo){
        $command = "SELECT listID FROM list WHERE userID=? ORDER BY listID DESC LIMIT 1";
        $params = [$_SESSION["userID"]];
        $stmt = $dbo->prepare($command);
        $success = $stmt->execute($params);
        if ($success) {
            $userID = $stmt->fetch();
            return $userID;
        } else {
            return false;
        }
    }

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

    if ($listTitleInput !== null) {
        if($listID = addList($listTitleInput, $today, $dbh)){
            echo json_encode(array("success" => true, "listID" => $listID));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}
