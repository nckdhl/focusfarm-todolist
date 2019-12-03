<?php

session_start();

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
