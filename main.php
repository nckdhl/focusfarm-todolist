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

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
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