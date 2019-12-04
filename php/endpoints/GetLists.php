<?php

include "../connectdb.php";
include "../ListItem.php";
include "../ToDoList.php";

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

$lists = [];
$listItems = [];

if ($requestOK){
    $command = "SELECT l.listID, l.listTitle, l.dateCreated FROM list l WHERE l.userID = ?";
    $stmt = $dbh->prepare($command);
    $params = [$userID];
    $success = $stmt->execute($params);

    if ($success) {
        $stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ToDoList');
        while ($list = $stmt->fetch()){
            if ($list == false){
                break;
            }
            array_push($lists, $list);
        }
    }

    $command = "SELECT li.itemID, li.itemText, li.listID, li.isComplete, li.dueDate, li.dateCreated FROM list l JOIN list_item li on li.listID = l.listID WHERE l.userID = ?";
    $stmt = $dbh->prepare($command);
    $params = [$userID];
    $success = $stmt->execute($params);

    if ($success) {
        $stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ListItem');
        while ($listItem = $stmt->fetch()){
            if ($listItem == false){
                break;
            }
            array_push($listItems, $listItem);
        }
    }

    for ($i = 0; $i < sizeof($lists); $i ++){

        for ($j = 0; $j < sizeof($listItems); $j++){

            if ($listItems[$j]->getListID() == $lists[$i]->getListID()){
                $lists[$i]->addListItem($listItems[$j]);
            }

        }
    }

    echo json_encode($lists);

}
