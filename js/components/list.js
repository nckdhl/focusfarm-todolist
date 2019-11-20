import ListItem from './listitem.js';

/**
 * This class is for a list which contains list items
 * 
 * TO-DO:
 * - lots
 */
export default class List {

    constructor(container, title) {
        this.container = container;
        this.listItems = [];
        this.listTitle = title;
        this.dateCreated = new Date();

        this.ul = this.createUl();
        this.title = this.createTitle();
        this.ul.appendChild(this.title);
        this.initList();
        //this.addListItem(new ListItem(this.ul));
        this.button = this.createButton();
        this.initEvents();
    }

    initList(){
        let firstItem = new ListItem(this.ul);
        this.listItems.push(firstItem);
        firstItem.renderInput();
    }

    renderList() {
        this.container.appendChild(this.ul);
        this.container.appendChild(this.button);
    }

    initEvents() {
        var that = this;
        this.button.addEventListener("click", function () {
            console.log("clicked");
            that.addListItem(new ListItem(that.ul));
            console.log(that.listItems);
        });
    }

    addListItem(listItem) {
        console.log("tried to add");
        var that = this;
        this.listItems.push(listItem);
        console.log(listItem);
        let lastItem = this.listItems.length - 1;
        console.log(lastItem);
        if (lastItem > 1 && !(this.listItems[lastItem - 1].isInput)) {
            this.listItems[lastItem - 1].toggleInput();
        }

        listItem.renderInput();
        listItem.deleteThis.addEventListener("click", function () {
            that.deleteListItem(listItem, that.listItems.indexOf(listItem));
        });
    }

    // const removeItem = (items, i) =>
    //     items.slice(0, i - 1).concat(items.slice(i, items.length))

    // let filteredItems = removeItem(items, 3)
    // filteredItems = removeItem(filteredItems, 5)
    // //["a", "b", "d", "e"]

    deleteListItem(listItem, index) {
        const removeItem = (items, i) =>
            items.slice(0, i - 1).concat(items.slice(i, items.length))

        // let filteredItems = removeItem(items, 3)
        // filteredItems = removeItem(filteredItems, 5)
        //["a", "b", "d", "e"]
        if (this.listItems.length > 1) {
            listItem.removeListItem();
            listItem.delete();
            //this.listItems = removeItem(this.listItems, index);
            this.listItems.splice(index, 1);
            console.log(this.listItems);
        }
    }

    createUl() {
        let ul = document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");
        return ul;
    }

    createTitle() {
        let titleString = this.listTitle;
        let listTitle = document.createElement("h6");
        listTitle.setAttribute("class", "list-title d-flex");
        listTitle.innerHTML = `${titleString} <span class="font-italic ml-auto">${this.dateCreated.toLocaleDateString("en-US")}</span>`;
        return listTitle;
    }

    createButton() {
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "mt-2 btn btn-outline-secondary btn-lg btn-block");
        addButton.innerText = "Add List Item";
        return addButton;
    }
}