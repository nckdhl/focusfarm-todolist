<?php

include "connectdb.php";

session_start();

function doesUserExist($email, $dbo){
    $command = "SELECT userID, first_name, password FROM user WHERE email=?";
    $stmt = $dbo->prepare($command);
    $params = [$email];
    $success = $stmt->execute($params);
    if ($stmt->rowCount() == 0){
        return false;
    } else {
        return true;
    }
    // TODO add try catch exception handling
}

function insertRecord($email, $password, $firstName, $lastName, $dbo){
    $command = "INSERT INTO user (email, password, first_name, last_name)
                 VALUES (?, ?, ?, ?)";
    $stmt = $dbo->prepare($command);
    $params = [$email, $password, $firstName, $lastName];
    $success = $stmt->execute($params);
    if ($success and $stmt->rowCount() == 1){
        return true;
    } else {
        return false;
    }
    // TODO add try catch exception handling
}

if (isset($_SESSION["userID"])){
    echo json_encode(array("loggedIn" => true));
    die();
}

$firstNameInput = filter_input(INPUT_POST, "firstName", FILTER_SANITIZE_SPECIAL_CHARS);
$lastNameInput = filter_input(INPUT_POST, "lastName", FILTER_SANITIZE_SPECIAL_CHARS);
$emailInput = filter_input(INPUT_POST, "email", FILTER_SANITIZE_SPECIAL_CHARS);
$passwordInput = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

$userPreExisting = true;
$notValid = array("valid" => false, "inserted" => false);

if ($emailInput !== null and $passwordInput !== null and
    $firstNameInput !== null and $lastNameInput !== null) {

        // TODO add password hashing

        if (!doesUserExist($emailInput, $dbh)){
            if (insertRecord($emailInput, $passwordInput, $firstNameInput, $lastNameInput, $dbh)){
                $isValid = array("inserted" => true, "valid" => true);
                echo json_encode($isValid);
                // FIXME make JSON inserted and valid keys more relevant for error messages
                //  that will be returned to javascript
            }
        } else {
            session_unset();
            session_destroy();
            echo json_encode($notValid);
        }


} else {
    echo json_encode($notValid);
    session_unset();
    session_destroy();
}


