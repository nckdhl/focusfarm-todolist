<?php

include "../connectdb.php";
$userID = 1;

$command = "SELECT listID, listTitle FROM list WHERE userID=?";
$stmt = $dbh->prepare($command);
$params = [$userID];
$success = $stmt->execute($params);

// empty array holds list of ListItems from query
$lists = [];

if ($success){
    while ($row = $stmt->fetch()){
        $list = array("listID" => $row["listID"], "listTitle" => $row["listTitle"]);
        array_push($lists, $list);
    }
}
// echo var_dump($lists);
// echo var_dump($success);
// prints JSON for the HTTP response
echo json_encode($lists);