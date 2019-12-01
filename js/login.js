import Registration from './components/registration.js';

window.addEventListener("load", function () {
    let loginButton = document.querySelector("button");
    let emailInput = document.forms[0][0];
    let passwordInput = document.forms[0][1];
    let register = document.querySelector("#register");


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

    register.addEventListener("click", function (){

    }

    );
});