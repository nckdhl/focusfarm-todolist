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

$credentialsOK = false;

if (isset($_SESSION["userID"])){
    $credentialsOK = true;
}

$emailInput = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
$passwordInput = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

$validation = [];

if ($emailInput !== null and $passwordInput !== null) {

    $userRecord = getCredentials($emailInput, $dbh);

    if ($userRecord) {

        $passwordHash = $userRecord["password"];
        $userID = $userRecord["userID"];
        $firstName = $userRecord["first_name"];

        // TODO add password hash checks after password hashing for
        //  registration is implemented

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



