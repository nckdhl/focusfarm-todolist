<?php
/**
 * I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This is the main page for the UI of the app
 */
require "php/connectdb.php";

 session_start();

 $loggedIn = false;

 // If the session is not valid the user is redirected to the login page
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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/globalstyles.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/globalstyles.css">
<!--    <script src="node_modules/jquery/dist/jquery.min.js"></script>-->
    <script type="module" src="js/main.js" defer></script>
</head>

<!-- nav bar -->
<body class="bg-secondary" id="index-body">
    <nav class="navbar navbar-expand-lg navbar-dark shadow-lg bg-dark">
        <a class="navbar-brand" href="#">FocusFarm</a>
        <div class="ml-auto">
            <span class="text-light mr-2 font-italic"><?php echo "Welcome back, " . $_SESSION["firstName"] . "." ?></span>
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
    <!-- Container for instructions -->
    <div class="container bg-dark shadow-lg mt-4 rounded lg p-2">
        <ul class="bg-dark text-light m-2">
            <li class="m-1"><em>To create a new list</em>,<br> enter the desired name of the list and click the "New List" button.</li>
            <li class="m-1"><em>To create a list item</em>,<br> enter the desired contents of the item into the input field, then press enter to save it</li>
            <li class="m-1"><em>To edit a list item</em>,<br> double click anywhere on the list item to change to input mode.</li>
            <li class="m-1"><em>To delete a list item</em>,<br> click on the X at the end of the list item. This deletion is permanent.</li>
            <li class="m-1"><em>To add a tag to a list item</em>,<br> simply type the # character before your desired tag i.e <span class="hash-tag">#hashtag</span>.<br>The tag will be highlighted in red.</li>
            <li class="m-1"><em>To load a saved list</em>,<br> click the desired saved list in the selector to the right and press the &#x2714;.</li>
            <li class="m-1"><em>To delete a saved list</em>,<br> click the desired list in the selector to the right and press the &#x2718;. This deletion is permanent.</li>
        </ul>
    </div>
</body>

</html>