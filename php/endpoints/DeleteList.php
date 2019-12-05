<?php

include "../connectdb.php";

session_start();

function deleteListByID($dbo, $listID){
    $command = "DELETE FROM list WHERE listID=?";
    $params = [$listID];
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

if ($requestOK){

    $listIDInput = filter_input(INPUT_POST, "listID", FILTER_SANITIZE_SPECIAL_CHARS);

    if ($listIDInput !== null) {
        if(deleteListByID($dbh, $listIDInput)){
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false));
        }
    }
}