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
    }

    render() {
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
        div.setAttribute("class", "form-group col-3");
        return div;
    }

    createLabel() {
        let label = document.createElement("label");
        label.setAttribute("for", "list-selection-control");
        return label;
    }

    createSelect(){
        let select = document.createElement("select");
        select.setAttribute("class", "form-control");
        select.setAttribute("id", "list-selection-control");
        select.multiple = true;
        return select;
    }
}