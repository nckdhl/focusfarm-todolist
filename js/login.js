import Registration from './components/registration.js';

/**
 *
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This file is used by index.html to act as the logic for the login/registration UI
 *
 */
window.addEventListener("load", function () {
    // Assigns all important DOM elements to variables
    let body = document.querySelector("body");
    let loginButton = document.querySelector("button");
    let loginForm = document.forms[0];
    let emailInput = document.forms[0][0];
    let passwordInput = document.forms[0][1];
    let register = document.querySelector("#register");
    let registration = new Registration(body);

    // When the log in button is clicked this event is fired
    loginButton.addEventListener("click", function () {
        event.preventDefault();

        // resets js input validity state
        emailInput.setCustomValidity('');

        // checks validity of required elements
        if (emailInput.reportValidity() && passwordInput.reportValidity()) {
            let email = emailInput.value;
            let password = passwordInput.value;

            let params = `email=${email}&password=${password}`;

            // AJAX call to send login credentials to database
            // returns true and redirects to main.php if the login was successful and
            // false if it was not, which then causes validity popup on input field
            fetch("php/login.php", {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }, // parameter format
                    body: params
                })
                .then(response => response.json())
                .then(function (data) {
                    if (data[0].valid) {
                        console.log(data);
                        window.location.replace("main.php");
                    } else {
                        // fires validity popup on input field
                        emailInput.setCustomValidity("Invalid username or password");
                        emailInput.reportValidity();
                    }
                });
        }


    });

    // when the user clicks the register button this event is fired
    registration.button.addEventListener("click", function(){
        event.preventDefault();

        // resets js input validity state
        emailInput.setCustomValidity('');

        // checks validity of all required input fields
        if (registration.inputEmail.reportValidity() && registration.inputFirstName.reportValidity() &&
            registration.inputLastName.reportValidity() && registration.inputPassword.reportValidity()) {
            let email = registration.inputEmail.value;
            let firstName = registration.inputFirstName.value;
            let lastName = registration.inputLastName.value;
            let password = registration.inputPassword.value;

            let params = `email=${email}&firstName=${firstName}&lastName=${lastName}&password=${password}`;

            fetch("php/register.php", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, // parameter format
                body: params
            })
                .then(response => response.json())
                .then(function (data) {
                    // if the registration information was valid and inserted or the user
                    // was already logged in, the user is redirected to main.php
                    if ((data.valid && data.inserted) | data.loggedIn) {
                        console.log(data);
                        window.location.replace("main.php");
                    } else {
                        // Input validity popup is shown with message
                        // if registration failed
                        console.log(data);
                        registration.inputEmail.setCustomValidity("Invalid username, password or name");
                        emailInput.reportValidity();
                    }
                });
        }
    })

    // When the user clicks on the register link
    // the registration form is shown
    register.addEventListener("click", function (){
        body.removeChild(loginForm);
        registration.renderRegistration();
    });

    // When the user clicks on the sign in link,
    // the sign in form is shown
    registration.signInLink.addEventListener("click", function(){
        body.removeChild(registration.form);
        body.appendChild(loginForm);
    });

});