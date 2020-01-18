<?php

include "../connectdb.php";
include "../ListItem.php";
include "../ToDoList.php";

/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This file is an endpoint for AJAX calls to retrieve all list data from the database
 */

session_start();

$requestOK = false;
$userID = "";

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

// array of List objects
$lists = [];
// array of List Item objects
$listItems = [];

// if the session is valid
if ($requestOK){

    // selects all lists for current user
    $command = "SELECT l.listID, l.listTitle, l.dateCreated FROM list l WHERE l.userID = ?";
    $stmt = $dbh->prepare($command);
    $params = [$userID];
    $success = $stmt->execute($params);

    // maps records to List objects and instantiates them, then adds them to array
    if ($success) {
        $stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ToDoList');
        while ($list = $stmt->fetch()){
            if ($list == false){
                break;
            }
            array_push($lists, $list);
        }
    }

    // selects all list items for current user
    $command = "SELECT li.itemID, li.itemText, li.listID, li.isComplete, li.dueDate, li.dateCreated FROM list l JOIN list_item li on li.listID = l.listID WHERE l.userID = ?";
    $stmt = $dbh->prepare($command);
    $params = [$userID];
    $success = $stmt->execute($params);

    // maps records to ListItem objects and instantiates them, then adds them to array
    if ($success) {
        $stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ListItem');
        while ($listItem = $stmt->fetch()){
            if ($listItem == false){
                break;
            }

            // handles fact that SQL store booleans as zeroes and ones
            if ($listItem->getCompletion()){
                $listItem->setCompletion(true);
            } else {
                $listItem->setCompletion(false);
            }

            array_push($listItems, $listItem);
        }
    }

    // adds ListItem objects to List objects so that they can be serialized
    for ($i = 0; $i < sizeof($lists); $i ++){

        for ($j = 0; $j < sizeof($listItems); $j++){

            if ($listItems[$j]->getListID() == $lists[$i]->getListID()){
                $lists[$i]->addListItem($listItems[$j]);
            }

        }
    }

    // echoes serialized List data to HTTP
    echo json_encode($lists);

}
