/**
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * This class is for a list item in the to-do list
 *
 */
export default class ListItem {

    /**
     * Constructor for ListItem class
     *
     * By calling helper methods, it creates all the DOM elements necessary to
     * render a list item component to the DOM.
     *
     * Fields indicating state and properties are also initialized
     *
     * Default param values are used to allow for overloading depending
     * on whether the List is created dynamically in memory or retrieved from DB
     *
     * @param listContainer - the parent node for the list item (the UL from the List object)
     * @param listID - the unique ID for the parent List object
     * @param hasTag - boolean value for whether the list item has tags or not
     * @param isComplete - boolean value indicating whether the list item is complete
     * @param isInput - boolean value indicating whether the list item is in an "input" state
     * @param dateCreated - date the list item was created
     * @param content - the text content of the list item
     * @param itemID - the unique ID for the ListItem, retrieved from DB
     */
    constructor(listContainer, listID = null, hasTag = false, isComplete = false,
                isInput = false, dateCreated = new Date(), content = "", itemID = -1) {
        // Properties and states
        this.listID = listID;
        this.itemID = itemID;
        this.hasTag = hasTag;
        this.isComplete = isComplete;
        this.isInput = isInput;
        this.dateCreated = dateCreated;
        this.content = content;
        this.tags = [];

        // DOM elements
        this.listContainer = listContainer;
        this.li = this.createLi();
        this.checkBox = this.createCheckBox();
        this.text = this.createText();
        this.deleteThis = this.createDelete();
        this.input = this.createInput();

        this.listContainer.appendChild(this.li);

        // Adds event listeners
        this.initEvents();
    }

    /**
     * Renders the list item to the DOM as an input field
     */
    renderInput() {
        this.li.appendChild(this.input);
        // Applies focus to input field
        this.input.focus();
    }

    /**
     * Renders the list item to the DOM as a list item <li> element
     */
    renderListItem() {
        this.li.appendChild(this.checkBox);
        this.li.appendChild(this.text);
        this.li.appendChild(this.deleteThis);

        // If the list item is complete the text is struck through
        if (this.isComplete) {
            this.checkBox.checked = true;
            this.text.style.textDecoration = "line-through";
        }
    }

    /**
     * Removes the list item from the DOM
     */
    removeListItem() {
        this.li.removeChild(this.checkBox);
        this.li.removeChild(this.text);
        this.li.removeChild(this.deleteThis);
    }

    /**
     * Deletes the list item from the database
     * using an AJAX fetch call
     */
    delete() {
        this.listContainer.removeChild(this.li);

        const deleteItemByID = (itemID) => {

            let params = `itemID=${itemID}`;

            fetch("php/endpoints/DeleteListItem.php", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.success){
                        console.log("deleted");
                    } else {
                        console.log("didn't delete");
                    }
                });
        }
        // function invoked with this ListItems unique ID
        deleteItemByID(this.itemID);

    }

    /**
     * This function toggles between <li> and <input> rendering
     * for the ListItem object
     */
    toggleInput() {
        if (!this.isInput) {
            this.li.removeChild(this.input);
            this.renderListItem();
            if (this.content != ""){
                this.setText(this.content);
            } else if (this.input.value == "") {
                this.setText("Doubleclick here to edit.");
            }
            // Text is scanned for tags which are then rendered with red font colour
            this.scanForTags();
            this.isInput = !this.isInput;
        } else {
            this.removeListItem();
            this.renderInput();
            this.input.focus();
            this.isInput = !this.isInput;
        }
    }

    /**
     * All events for the ListItem object are added in this method
     */
    initEvents() {
        // binds this to that so that this is available in event listeners
        var that = this;

        // If the list item is double clicked when it is rendered as an <li>
        // then it is toggled to be rendered as an input field
        this.li.addEventListener("dblclick", function () {
            console.log(that.isInput);
            if (that.isInput){
                that.toggleInput();
            }
        });

        // When the user is typing their list item text they press enter
        // and this event is called
        this.input.addEventListener("keyup", function (event) {

            if (event.key === "Enter") {
                event.preventDefault();
                that.content = that.input.value;


                // INSERTION AJAX CALL
                // Tests if the list item is new and needs to be inserted into the database
                // by testing conditions whether the content field is empty and
                // it has not been assigned an itemID yet
                if (that.content != "" && that.itemID == -1){
                    let params = `content=${that.content}&listID=${that.listID}`;
                    fetch("php/endpoints/AddListItem.php", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }, // parameter format
                        body: params
                    })
                        .then(response => response.json())
                        .then(function (data) {
                            // If the insertion was a success
                            // then the item is toggled back to <li> state
                            if (data.success){
                                console.log("Inserted");
                                that.itemID = data.listItemID;
                                that.toggleInput();
                            // if the insertion did not work an alert is thrown
                            } else {
                                alert("Something went wrong. Try re-entering your list item");
                            }
                        });
                }


                // UPDATE AJAX CALL
                // Tests if the list item is not empty and has already been assigned
                // an itemID, then the list item is just updated in the DB with
                // any new changes to its content or state
                if (that.content != "" && that.itemID != -1){
                    let params = `content=${that.content}&listItemID=${that.itemID}&isComplete=${that.isComplete}`;
                    fetch("php/endpoints/UpdateListItem.php", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }, // parameter format
                        body: params
                    })
                        .then(response => response.json())
                        .then(function (data) {
                            // If the update was successful
                            // the input is toggled to a <li> state
                            if (data.success){
                                console.log("Updated");
                                console.log(data);
                                that.toggleInput();
                            // if the update failed, an alert is shown
                            } else {
                                alert("Something went wrong. Try re-checking your list item");
                            }
                        });
                }
            }
        })

        // When the user ticks the checkbox next to a list item
        // this event is fired
        this.checkBox.addEventListener("change", function () {


            if (that.checkBox.checked) {
                that.text.style.textDecoration = "line-through";
                that.isComplete = true;
                console.log("Complete = true");
            } else {
                that.text.style.textDecoration = "initial";
                that.isComplete = false;
                console.log("Complete = false");
            }

            console.log(`Completion at update fetch = ${that.isComplete}`);

            // UPDATE AJAX CALL
            // When the checkbox is checked or unchecked this is updated to the database
            let params = `content=${that.content}&listItemID=${that.itemID}&isComplete=${that.isComplete}`;
            fetch("php/endpoints/UpdateListItem.php", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, // parameter format
                body: params
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.success){
                        console.log("Updated");
                        console.log(data);
                    } else {
                        alert("Something went wrong. Try re-checking your list item");
                    }
                });

        })
    }

    /**
     * This method scans the text in the list item
     * for #hashtags with a Regex pattern
     *
     * If the pattern is found the hashtags are rendered with a red font
     * and added to a list of tags
     *
     * Saving of tags to database is not yet implemented
     */
    scanForTags() {
        var that = this;
        let string = this.text.innerText;
        // Matches all #hashtags
        this.tags = string.match(/\B(\#[a-zA-Z]+\b)/g);
        if (this.tags) {
            this.hasTag = true;
        }
        if (this.hasTag) {
            // Each tag is re-rendered with red font
            this.tags.forEach(function (tag) {
                that.text.innerHTML = string.replace(tag, `<span class="hash-tag">${tag}<span>`);
            })
        }
    }

    /**
     * Creates span DOM element
     * that acts as container for the text
     * of the list item
     * @returns {HTMLElement} - <span>
     */
    createText() {
        let span = document.createElement("span");
        span.innerHTML = this.content;
        return span;
    }

    /**
     * Creates li DOM element
     * @returns {HTMLElement} - <li>
     */
    createLi() {
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item d-flex bg-dark text-light");
        return li;
    }

    /**
     * Creates input field where the user types their list item text
     * @returns {HTMLElement} - <input>
     */
    createInput() {
        let input = document.createElement("input");
        input.setAttribute("class", "form-control no-outline");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Type here... press enter to save.");
        input.required = true;
        input.value = this.content;
        return input;
    }

    /**
     * Creates checkbox type input element
     * that is used to indicate if the list item is complete
     * @returns {HTMLElement} - <input type="checkbox">
     */
    createCheckBox() {
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input mr-auto");
        return checkbox;
    }

    /**
     * Creates button element
     * that is used to delete list items
     * @returns {HTMLElement} - <button>
     */
    createDelete() {
        let deleteThis = document.createElement("span");
        deleteThis.setAttribute("class", "start-pomodoro badge badge-pill badge- ml-auto p-2");
        deleteThis.innerHTML = "&#10060;";
        return deleteThis;
    }

    /**
     * Helper method to set the innerText of the text span
     * @param text
     */
    setText(text) {
        this.text.innerHTML = text;
    }

}