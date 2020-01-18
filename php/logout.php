<?php
/**
 *  *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This page is an endpoint used to logout a user
 */
session_start();

// If the user is logged in, the session is destroyed and a success JSON response is given
if (isset($_SESSION["userID"])){
    echo json_encode(array("success" => true));
    session_unset();
    session_destroy();
} else {
    session_unset();
    session_destroy();
    header("Location: ../index.html");
    exit();
}
