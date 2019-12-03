import Registration from './components/registration.js';

window.addEventListener("load", function () {
    let body = document.querySelector("body");
    let loginButton = document.querySelector("button");
    let loginForm = document.forms[0];
    let emailInput = document.forms[0][0];
    let passwordInput = document.forms[0][1];
    let register = document.querySelector("#register");
    let registration = new Registration(body);


    loginButton.addEventListener("click", function () {
        event.preventDefault();

        if (emailInput.reportValidity() && passwordInput.reportValidity()) {
            let email = emailInput.value;
            let password = passwordInput.value;

            let params = `email=${email}&password=${password}`;

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
                        window.location.replace("../main.php");
                    } else {
                        emailInput.setCustomValidity("Invalid username or password");
                    }
                });
        }


    });

    registration.button.addEventListener("click", function(){
        event.preventDefault();

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
                    if ((data.valid && data.inserted) | data.loggedIn) {
                        // FIXME add checks for data.inserted so that a valid entry
                        //  that was not successfully inserted also has a meaningul message
                        console.log(data);
                        window.location.replace("../main.php");
                    } else {
                        console.log(data);
                        registration.inputEmail.setCustomValidity("Invalid username, password or name");
                    }
                });
        }
    })

    register.addEventListener("click", function (){
        body.removeChild(loginForm);
        registration.renderRegistration();
    });

    registration.signInLink.addEventListener("click", function(){
        body.removeChild(registration.form);
        body.appendChild(loginForm);
    });

});