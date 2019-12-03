/**
 * 
 */
export default class Registration {

    constructor(container){
        this.container = container;
        this.form = this.createForm();
        this.title = this.createTitle();
        this.inputEmail = this.createInput("Email");
        this.inputFirstName = this.createInput("FirstName");
        this.inputLastName = this.createInput("LastName");
        this.inputPassword = this.createInput("Password");
        this.signInLink = this.createLink();
        this.button = this.createButton();
    }

    renderRegistration() {
        this.form.append(this.title, this.inputEmail,
            this.inputFirstName,
            this.inputLastName,
            this.inputPassword, this.signInLink, this.button);
        this.container.appendChild(this.form);
    }

    createForm(){
        let form = document.createElement("form");
        form.setAttribute("class", "form-signin rounded-lg bg-dark p-4 text-light");
        return form;
    }

    createTitle() {
        let div = document.createElement("div");
        div.innerHTML = `<h2 class="h1 mb-3 font-weight-normal">FocusFarm</h2>
                        <h2 class="h4 mb-3 font-weight-normal">Please register</h2>`;
        div.setAttribute("class", "m2");
        return div;
    }

    createInput(type) {
        let input = document.createElement("input");
        input.setAttribute("class", "sr-only");
        if (type === "Email" | type === "Password"){
            input.setAttribute("type", type);
        }
        else {
            input.setAttribute("type", "text");
        }
        input.setAttribute("id", type);
        input.setAttribute("class", "form-control");
        input.setAttribute("placeholder", type);
        input.required = true;
        return input;
    }

    createLink(){
        let div = document.createElement("div");
        div.setAttribute("class", "checkbox mb-3")
        div.innerHTML = `<a id="signIn" href="#">Sign In</a>`;
        return div;
    }

    createButton(){
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-lg btn-outline-light btn-block");
        button.setAttribute("type", "submit");
        button.innerText = "Register";
        return button;
    }

}


