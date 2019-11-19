
import ListItem from './listitem.js';

/**
 * This class is for a list which contains list items
 * 
 * TO-DO:
 * - lots
 */
export default class List{
    
    constructor(container, title){
        this.container = container;
        this.listItems = [];
        this.listTitle = title;
        this.dateCreated = new Date();

        this.ul = this.createUl();
        this.title = this.createTitle();
        this.ul.appendChild(this.title);
        this.addListItem(new ListItem(this.ul));
        this.button = this.createButton();
        this.initEvents();
    }

    renderList() {
        this.container.appendChild(this.ul);
        this.container.appendChild(this.button);
    }

    initEvents() {
        var that = this;
        this.button.addEventListener("click", function(){
            console.log("clicked");
            that.addListItem(new ListItem(that.ul));
        });
    }

    addListItem(listItem) {
        console.log("tried to add");
        this.listItems.push[listItem];
        listItem.renderInput();
        var that = this;
        listItem.deleteThis.addEventListener("click", function(){
            that.deleteListItem(listItem, (that.listItems.length-1));
        });
    }

    deleteListItem(listItem, index) {
        listItem.removeListItem();
        listItem.delete();
        this.listItems.splice(index, 1);
    }

    createUl() {
        let ul =  document.createElement("ul");
        ul.setAttribute("class", "list-group list-group-flush");
        return ul;
    }

    createTitle() {
        let titleString = this.listTitle;
        let listTitle = document.createElement("h6");
        listTitle.setAttribute("class", "list-title");
        listTitle.innerHTML = `${titleString} <span class="font-italic">${this.dateCreated}</span>`;
        return listTitle;
    }

    createButton() {
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "mt-2 btn btn-outline-secondary btn-lg btn-block");
        addButton.innerText = "Add List Item";
        return addButton;
    }
}