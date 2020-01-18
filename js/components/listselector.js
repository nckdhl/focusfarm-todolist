/**
 *
 * I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This class is for a list selector component, which is the
 *  selector element on the UI used to navigate through the users' saved lists
 *
 */
export default class ListSelector {

    /**
     * Constructor for ListSelector class
     *
     * By calling helper methods, It creates all the DOM elements necessary to
     * render a list selector component to the DOM.
     *
     * Fields indicating state and properties are also initialized
     *
     * @param container - parent node of list selector component
     */
    constructor(container) {
        // Properties and states
        this.listCount = 0;
        this.lists = [];

        // DOM elements
        this.container = container;
        this.selectorContainer = this.createDiv();
        this.selectorControl = this.createSelect();
        this.selectorLoadButton = this.createLoadButton();
        this.selectorDeleteButton = this.createDeleteButton();
    }

    /**
     * Renders the ListSelector object to the DOM
     */
    renderSelector() {
        this.selectorContainer.appendChild(this.selectorControl);
        this.selectorContainer.appendChild(this.selectorLoadButton);
        this.selectorContainer.appendChild(this.selectorDeleteButton);
        this.container.appendChild(this.selectorContainer);
    }

    /**
     * Inserts new list to selector and adds it to the DOM
     * @param list - list to be inserted
     */
    insertList(list){
        this.lists.push(list);
        this.listCount++;
        let listOption = this.createOption(this.listCount)
        // Text inside option is set to the list title
        listOption.innerHTML = list.listTitle;
    }

    /**
     * Creates <option> element for inside selector
     * @param id
     * @returns {HTMLElement}
     */
    createOption(id = ""){
        let option = document.createElement("option");
        option.setAttribute("id", `option${id}`);
        this.selectorControl.appendChild(option);
        return option;
    }

    /**
     * Helper method to remove list from selector at
     * certain index, also removes list from list array
     * @param index
     */
    removeList(index){
        this.lists.splice(index, 1);
        this.selectorControl.remove(index);
    }

    /**
     * Creates DIV element that is the wrapper for
     * the list selector
     * @returns {HTMLElement} - <div>
     */
    createDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group text-center col-4 bg-secondary rounded-lg mt-3 pt-2 pb-5 mt-1 shadow-lg");
        return div;
    }

    /**
     * Creates select element
     * @returns {HTMLElement} - <select>
     */
    createSelect() {
        let select = document.createElement("select");
        select.setAttribute("class", "form-control bg-dark text-light custom-select h-100");
        select.setAttribute("id", "list-selection-control");
        select.multiple = true;
        return select;
    }

    /**
     * Creates button element that acts
     * as a control to load a saved list to the DOM
     * @returns {HTMLElement} - <button>
     */
    createLoadButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "mb-4 mr-4 mt-1 btn badge-pill btn-primary");
        button.innerHTML = "&#x2714;";
        return button;
    }

    /**
     * Creates button element that acts
     * as a control to delete a saved list
     * @returns {HTMLElement} - <button>
     */
    createDeleteButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "mb-4 mt-1 btn badge-pill btn-danger");
        button.innerHTML = "&#x2718";
        return button;
    }
}