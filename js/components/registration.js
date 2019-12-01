/**
 * 
 */
export default class Registration {

    constructor(container){
        this.container = container;

        this.inputEmail = createEmailInput();
        this.inputFirstName = createFirstNameInput();
        this.inputLastName = createLastNameInput();
        this.inputPassword = createPasswordInput();


    }
}

