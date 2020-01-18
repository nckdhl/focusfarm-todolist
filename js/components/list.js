import ListItem from './listitem.js';

/**
 *
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This class is for a list which contains list items
 * 
 *  This class is used to create lists as components to render to the DOM
 */
export default class List {

    /**
     * Constructor for List class
     *
     * By calling helper methods, It creates all the DOM elements necessary to
     * render a list component to the DOM.
     *
     * Fields indicating state and properties are also initialized
     *
     * Default param values are used to allow for overloading depending
     * on whether the List is created dynamically in memory or retrieved from DB
     *
     * @param container - The parent node for the list component
     * @param title - The title given to the list component by the user
     * @param listID - The unique ID for the list, retrieved from the DB
     * @param dateCreated - The date the list was created
     * @param fromDB - True if retrieved from the DB, false if created or edited in memory
     */
    constructor(container, title, listID, dateCreated = new Date(), fromDB = false) {
        // Properties and states
        this.listID = listID;
        this.listItems = []; // array of ListItem objects
        this.fromDB = fromDB;
        this.listTitle = title;
        this.dateCreated = dateCreated;

        // DOM elements
        this.container = container;
        this.div = this.createDiv();
        this.ul = this.createUl();
        console.log(this.ul);
        this.title = this.createTitle();
        this.ul.appendChild(this.title);
        this.button = this.createButton();

        // Adds event listeners
        this.initEvents();
    }

    /**
     * Creates a DOM Element that acts as the container for the list
     * @returns {HTMLElement} div
     */
    createDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "col-8 current-list");
        return div;
    }

    /**
     * Helper method called by renderList() to initialize
     * the List object with a list item input field
     * when it is first rendered to the DOM
     */
    initList(){
        // Only created if the List is not populated with data
        // from the database, or doesn't have any list items
        if (!this.fromDB | this.listItems.length == 0) {
            let firstItem = new ListItem(this.ul, this.listID);
            this.listItems.push(firstItem); // TODO test if necessary
            firstItem.renderInput();
            this.fromDB = !this.fromDB;
        }
    }

    /**
     * Renders the List object to the DOM.
     * This method is called from outside the class.
     */
    renderList() {
        this.initList();
        this.div.appendChild(this.ul);
        this.div.appendChild(this.button);
        this.container.insertAdjacentElement("afterbegin", this.div);
    }

    /**
     * Adds event listeners to relevant controls
     */
    initEvents() {
        var that = this;
        this.button.addEventListener("click", function () {
            that.fromDB = false;

            // If the input in the last list item field is valid, then
            // the list item is created
            if (that.listItems[that.listItems.length - 1].input.reportValidity()){
                that.addListItem(new ListItem(that.ul, that.listID));
            }
        });
    }

    /**
     * This method is passed a ListItem object
     * It then renders the object to the DOM
     * @param listItem ListItem object
     */
    addListItem(listItem) {
        this.listItems.push(listItem);

        listItem.renderInput();

        // If the list is from the DB
        // The input is toggled from input field to list item text
        if (this.fromDB) {
            listItem.toggleInput();
        }

        // Every list item added to the DOM gets an event listener
        // added to its delete X button
        var that = this;
        listItem.deleteThis.addEventListener("click", function () {
            // removes ListItem from DOM
            that.deleteListItem(listItem, that.listItems.indexOf(listItem));
        });
    }

    /**
     * Deletes ListItem object from the List
     * by removing it from the DOM and the array of listItems
     *
     * Calls removeListItem() function from ListItem class,
     * which performs AJAX call to delete the item from DB
     * @param listItem - the ListItem to be deleted
     * @param index - it's index in the array of listItems
     */
    deleteListItem(listItem, index) {

        if (this.listItems.length > 1) {
            listItem.removeListItem();
            listItem.delete();
            this.listItems.splice(index, 1);
            console.log(this.listItems);
        }
    }

    /**
     * Creates Unordered List UL DOM element that
     * acts as container for the list items
     * @returns {HTMLElement} - UL
     */
    createUl() {
        let ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");
        return ul;
    }

    /**
     * Creates H6 heading element
     * which contains the text for the List title
     * @returns {HTMLElement} - H6
     */
    createTitle() {
        let titleString = this.listTitle;
        let listTitle = document.createElement("h6");
        listTitle.setAttribute("class", "list-title d-flex text-light");
        // If the List is populated from the DB then the date is formatted using the date format from the DB record
        // if it's created in memory, then the string is formatted to match the default DB formatting
        listTitle.innerHTML = `${titleString} <span class="font-italic ml-auto">${this.fromDB ? this.dateCreated : this.dateCreated.toLocaleDateString('en-CA')}</span>`;
        return listTitle;
    }

    /**
     * Creates Button control
     * which acts as the control to add a new ListItem
     * to the List
     * @returns {HTMLElement} - Button
     */
    createButton() {
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "mt-2 btn btn-outline-light btn-lg btn-block");
        addButton.innerText = "Add List Item";
        return addButton;
    }
}