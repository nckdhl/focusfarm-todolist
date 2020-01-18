<?php
/**
 *  *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This page is an endpoint used to register a new user
 */
include "connectdb.php";

session_start();

/**
 * SQL Query function that checks if user already exists
 * Uses the email entered to check against database
 * @param $email - email input
 * @param $dbo - PDO DBO
 * @return bool - true they exist, false if they don't
 */
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
}

/**
 * SQL Query function that inserts new user to database
 * @param $email
 * @param $password
 * @param $firstName
 * @param $lastName
 * @param $dbo - PDO DBO
 * @return bool - true if one record inserted, false if failed
 */
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
}

// If the user is already logged in, valid JSON is returned
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

    // Queries database to see if user exists
        if (!doesUserExist($emailInput, $dbh)){

            // hashes password
            $passwordHash = password_hash($passwordInput, PASSWORD_DEFAULT);

            // Inserts record to database and returns JSON to HTTP response if success
            if (insertRecord($emailInput, $passwordHash, $firstNameInput, $lastNameInput, $dbh)){
                $isValid = array("inserted" => true, "valid" => true);
                echo json_encode($isValid);
            }
        } else {
            // if failed, session is destroyed and invalid JSON to HTTP response
            session_unset();
            session_destroy();
            echo json_encode($notValid);
        }


} else {
    // if failed, session is destroyed and invalid JSON to HTTP response
    echo json_encode($notValid);
    session_unset();
    session_destroy();
}


