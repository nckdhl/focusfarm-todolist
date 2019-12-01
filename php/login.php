<?php

include "connectdb.php";

session_start();

function getCredentials($email, $dbo){
    $command = "SELECT userID, first_name, password FROM user WHERE email=?";
    $stmt = $dbo->prepare($command);
    $params = [$email];
    $success = $stmt->execute($params);
    if ($success){
        $record = $stmt->fetch();
        return $record;
    } else {
        return false;
    }
}

$emailInput = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
$passwordInput = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

$credentialsOK = false;

$validation = [];

if ($emailInput !== null and $passwordInput !== null) {

    $paramsOK = true;
    $userRecord = getCredentials($emailInput, $dbh);

    if ($userRecord) {

        $passwordHash = $userRecord["password"];
        $userID = $userRecord["userID"];
        $firstName = $userRecord["first_name"];

        // if (password_verify($passwordHash, $passwordInput)){

        //     $_SESSION["userID"] = $userID;
        //     $_SESSION["firstName"] = $firstName;
        //     $credentialsOK = true;
        // }

        if ($passwordHash == $passwordInput){
            $_SESSION["userID"] = $userID;
            $_SESSION["firstName"] = $firstName;
            $credentialsOK = true;
        }
    }
}

if ($credentialsOK){
    $isValid = array("valid" => true);
    array_push($validation, $isValid);
    echo json_encode($validation);
} else {
    $notValid = array("valid" => false);
    array_push($validation, $notValid);
    echo json_encode($validation);
    session_unset();
    session_destroy();
}



