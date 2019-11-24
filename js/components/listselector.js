/**
 * 
 */
export default class ListSelector {

    constructor(container) {
        this.container = container;
        this.listCount = 0;
        this.lists = [];

        this.selectorContainer = this.createDiv();
        this.selectorLabel = this.createLabel();
        this.selectorControl = this.createSelect();
        this.selectorLoadButton = this.createLoadButton();
        this.selectorDeleteButton = this.createDeleteButton();
    }

    renderSelector() {
        this.selectorContainer.appendChild(this.selectorLabel);
        this.selectorContainer.appendChild(this.selectorControl);
        this.container.appendChild(this.selectorContainer);
    }

    insertList(list){
        this.lists.push(list);
        this.listCount++;
        let listOption = this.createOption(this.listCount)
        listOption.innerText = list.listTitle;
    }

    createOption(id = ""){
        let option = document.createElement("option");
        option.setAttribute("id", id);
        this.selectorControl.appendChild(option);
        return option;
    }

    createDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group col-3 bg-secondary rounded-lg pt-0 pb-5 m-0 shadow-lg");
        return div;
    }

    createLabel() {
        let label = document.createElement("label");
        label.setAttribute("for", "list-selection-control");
        return label;
    }

    createSelect() {
        let select = document.createElement("select");
        select.setAttribute("class", "form-control h-100 pb-3 m-0");
        select.setAttribute("id", "list-selection-control");
        select.multiple = true;
        return select;
    }

    createLoadButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-primary");
        button.innerText = "Load";
        return button;
    }

    createButtonGroup() {
        let buttonGroup = document.createElement("div");
        buttonGroup.setAttribute("")
    }

    createDeleteButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-primary");
        button.innerText = "Delete";
        return button;
    }
}