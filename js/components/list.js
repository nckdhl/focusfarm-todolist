import ListItem from './listitem.js';

/**
 *
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This class is for a list which contains list items
 * 
 *
 */
export default class List {

    constructor(container, title, listID, dateCreated = new Date(), fromDB = false) {
        this.container = container;
        this.listID = listID;
        this.listItems = [];
        this.fromDB = fromDB;
        if (title == ""){
            this.listTitle = "No title";
        } else {
            this.listTitle = title;
        }
        this.dateCreated = dateCreated;
        this.div = this.createDiv();
        this.ul = this.createUl();
        this.title = this.createTitle();
        this.ul.appendChild(this.title);
        this.button = this.createButton();
        this.initEvents();
    }

    createDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "col-8 current-list");
        return div;
    }


    initList(){
        if (!this.fromDB | this.listItems.length == 0) {
            let firstItem = new ListItem(this.ul, this.listID);
            this.listItems.push(firstItem);
            firstItem.renderInput();
            this.fromDB = !this.fromDB;
        }
    }

    renderList() {
        this.initList();
        this.div.appendChild(this.ul);
        this.div.appendChild(this.button);
        this.container.insertAdjacentElement("afterbegin", this.div);
    }

    initEvents() {
        var that = this;
        this.button.addEventListener("click", function () {
            that.fromDB = false;

            if (that.listItems[that.listItems.length - 1].input.reportValidity()){
                that.addListItem(new ListItem(that.ul, that.listID));
            }
        });
    }

    addListItem(listItem) {
        this.listItems.push(listItem);

        listItem.renderInput();
        if (this.fromDB) {
            listItem.toggleInput();
        }
        var that = this;
        listItem.deleteThis.addEventListener("click", function () {
            that.deleteListItem(listItem, that.listItems.indexOf(listItem));
        });
    }

    deleteListItem(listItem, index) {
            
        if (this.listItems.length > 1) {
            listItem.removeListItem();
            listItem.delete();
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
        listTitle.setAttribute("class", "list-title d-flex text-light");
        listTitle.innerHTML = `${titleString} <span class="font-italic ml-auto">${this.fromDB ? this.dateCreated : this.dateCreated.toLocaleDateString('en-CA')}</span>`;
        return listTitle;
    }

    createButton() {
        let addButton = document.createElement("button");
        addButton.setAttribute("class", "mt-2 btn btn-outline-light btn-lg btn-block");
        addButton.innerText = "Add List Item";
        return addButton;
    }
}