/**
 *
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This class is for a regisration form component
 *
 */
export default class Registration {

    /**
     * Constructor for Registration class
     *
     * By calling helper methods, It creates all the DOM elements necessary to
     * render a list component to the DOM.
     *
     * Fields indicating state and properties are also initialized
     *
     * @param container - the parent for the component, in this case the body
     */
    constructor(container){
        // DOM elements
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

    /**
     * Renders registration component to the DOM
     */
    renderRegistration() {
        this.form.append(this.title, this.inputEmail,
            this.inputFirstName,
            this.inputLastName,
            this.inputPassword, this.signInLink, this.button);
        this.container.appendChild(this.form);
    }

    /**
     * Creates form element
     * @returns {HTMLElement} - <form>
     */
    createForm(){
        let form = document.createElement("form");
        form.setAttribute("class", "form-signin rounded-lg bg-dark p-4 text-light");
        return form;
    }

    /**
     * Creates div element
     * that holds the title and subtitle
     * for the form
     * @returns {HTMLElement} - <div>
     */
    createTitle() {
        let div = document.createElement("div");
        div.innerHTML = `<h2 class="h1 mb-3 font-weight-normal">FocusFarm</h2>
                        <h2 class="h4 mb-3 font-weight-normal">Please register</h2>`;
        div.setAttribute("class", "m2");
        return div;
    }

    /**
     * Creates input fields for the form,
     * depending on the type passed, a different type
     * of input field is created
     * @param type - the type of input
     * @returns {HTMLElement} - <input>
     */
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

    /**
     * Creates <a> link to render the sign in form
     * @returns {HTMLElement} - <a>
     */
    createLink(){
        let div = document.createElement("div");
        div.setAttribute("class", "checkbox mb-3")
        div.innerHTML = `<a id="signIn" href="#">Sign In</a>`;
        return div;
    }

    /**
     * Creates button to sign in
     * @returns {HTMLElement} - <button>
     */
    createButton(){
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-lg btn-outline-light btn-block");
        button.setAttribute("type", "submit");
        button.innerText = "Register";
        return button;
    }

}


