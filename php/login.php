<?php
/**
 *  *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This page is an endpoint used to login a new user
 */

include "connectdb.php";

session_start();

/**
 * SQL query function used to get user credentials from DB
 * @param $email
 * @param $dbo
 * @return bool - false if no record, returns record if it is found
 */
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

    // an attempt is made to retrieve the user's record from the db
    $userRecord = getCredentials($emailInput, $dbh);

    if ($userRecord) {

        $passwordHash = $userRecord["password"];
        $userID = $userRecord["userID"];
        $firstName = $userRecord["first_name"];

        // if the password matches the hash the $credentialsOk is true
         if (password_verify($passwordInput, $passwordHash)){

             $_SESSION["userID"] = $userID;
             $_SESSION["firstName"] = $firstName;
             $credentialsOK = true;
         }

    }
}

// if the credentials are valid
// a valid JSON HTTP response is given
// otherwise the session is destroyed
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



