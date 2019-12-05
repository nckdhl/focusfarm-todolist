<?php
/**
 *
 */
require "php/connectdb.php";

 session_start();

 $loggedIn = false;

 if (isset($_SESSION["userID"])){
    $loggedIn = true;
 } else {
     session_unset();
     session_destroy();
     header("Location: index.html");
     exit();
 }

?><!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>FocusFarm</title>
    <meta name="description"
        content="Another pomodoro timer with some basic to-do list functionality and lots of background music">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/globalstyles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/globalstyles.css">
    <script type="module" src="js/main.js" defer></script>
</head>

<body class="bg-secondary" id="index-body">
    <nav class="navbar navbar-expand-lg navbar-dark shadow-lg bg-dark">
        <a class="navbar-brand" href="#">FocusFarm</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="ml-auto">
            <span class="text-secondary font-italic"><?php echo "Welcome back, " . $_SESSION["firstName"] . "." ?></span>
            <button class="btn btn-outline-success m-2 my-2 my-sm-0" id="save" type="button">Save</button>
            <button class="btn btn-outline-primary my-2 my-sm-0" id="logOut" type="button">Log Out</button>
        </div>
    </nav>
    <!-- Container for New List Button and Input-->
    <div class="container input-group bg-dark shadow-lg mb-3 mt-4 rounded-lg p-2" id="new-list-button-group">
        <input type="text" id="new-list-input" class="form-control" placeholder="Add a name to your list..."
            aria-label="Recipient's username" aria-describedby="basic-addon2" required>
        <div class="input-group-append">
            <button id="new-list-button" class="btn btn-outline-light" type="submit">New List</button>
        </div>
    </div>
    <div class="container">
        <!-- Container for List and List Controls-->
        <div class="row bg-dark shadow-lg rounded-lg" id="list-container">
        </div>
    </div>
</body>

</html>