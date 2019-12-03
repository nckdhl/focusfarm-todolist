<?php

include "../connectdb.php";

session_start();

$requestOK = false;
$userID = "";

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
    $command = "SELECT listID, listTitle FROM list WHERE userID=?";
    $stmt = $dbh->prepare($command);
    $params = [$userID];
    $success = $stmt->execute($params);

    // TODO wrap query in try catch

// empty array holds list of ListItems from query
    $lists = [];

    if ($success){
        while ($row = $stmt->fetch()){
            $list = array("listID" => $row["listID"], "listTitle" => $row["listTitle"]);
            array_push($lists, $list);
        }
    }

    echo json_encode($lists);
} else {
    echo json_encode(array("valid" => false));
}
