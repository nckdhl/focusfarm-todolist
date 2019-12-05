/**
 * 
 */
export default class ListSelector {

    constructor(container) {
        this.container = container;
        this.listCount = 0;
        this.lists = [];

        this.selectorContainer = this.createDiv();
        this.selectorControl = this.createSelect();
        this.selectorLoadButton = this.createLoadButton();
        this.selectorDeleteButton = this.createDeleteButton();
    }

    renderSelector() {
        this.selectorContainer.appendChild(this.selectorControl);
        this.selectorContainer.appendChild(this.selectorLoadButton);
        this.selectorContainer.appendChild(this.selectorDeleteButton);
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
        option.setAttribute("id", `option${id}`);
        this.selectorControl.appendChild(option);
        return option;
    }

    removeList(index){
        this.lists.splice(index, 1);
        this.selectorControl.remove(index);
    }

    createDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group text-center col-4 bg-secondary rounded-lg mt-3 pt-2 pb-5 mt-1 shadow-lg");
        return div;
    }

    createSelect() {
        let select = document.createElement("select");
        select.setAttribute("class", "form-control bg-dark text-light custom-select h-100");
        select.setAttribute("id", "list-selection-control");
        select.multiple = true;
        return select;
    }

    createLoadButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "mb-4 mr-4 mt-1 btn badge-pill btn-primary");
        button.innerHTML = "&#x2714;";
        return button;
    }

    createDeleteButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "mb-4 mt-1 btn badge-pill btn-danger");
        button.innerHTML = "&#x2718";
        return button;
    }
}