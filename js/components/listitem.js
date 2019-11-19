
/**
 * This class is for a list item in the to-do list
 * 
 * TO-DO:
 * - category functionality
 * - 
 */
export  default class ListItem{

    constructor(listContainer){
        this.listContainer = listContainer;
        this.hasPomodoro = false;
        //this.hasCategory = false;
        this.hasTag = false;
        this.isComplete = false;
        this.isInput = false;
        this.dateCreated = new Date();

        this.pomodoroCount = 0;
        this.category;
        this.tags = [];
        this.li = this.createLi();
        this.checkBox = this.createCheckBox();
        this.text = document.createElement("span");
        this.categorySpan = this.createCategory();
        this.pomodoro = this.createPomodoro();
        this.start = this.createStart();
        this.deleteThis = this.createDelete();

        this.input = this.createInput();

        this.listContainer.appendChild(this.li);

        this.initEvents();
    }

    renderInput() {
        this.li.appendChild(this.input);
    }

    renderListItem() {
        this.li.appendChild(this.checkBox);
        this.li.appendChild(this.text);
        this.li.appendChild(this.categorySpan);
        this.li.appendChild(this.pomodoro);
        this.li.appendChild(this.start);
        this.li.appendChild(this.deleteThis);
    }

    removeListItem() {
        this.li.removeChild(this.checkBox);
        this.li.removeChild(this.text);
        this.li.removeChild(this.categorySpan);
        this.li.removeChild(this.pomodoro);
        this.li.removeChild(this.start);
        this.li.removeChild(this.deleteThis);
    }

    delete() {
        this.listContainer.removeChild(this.li);
    }

    initEvents() {
        var that = this;
        this.li.addEventListener("dblclick", function(){
            if (!that.isInput){
                that.li.removeChild(that.input);
                that.renderListItem();
                that.setText(that.input.value);
                that.scanForTags();
                that.isInput = !that.isInput;
                console.log("first one");
            } else {
                that.removeListItem();
                that.renderInput();
                that.isInput = !that.isInput;
                console.log("second one");
            }
        });
        this.checkBox.addEventListener("change", function(){
            if (that.checkBox.checked){
                that.text.style.textDecoration = "line-through";
                that.isComplete = true;
            } else {
                that.text.style.textDecoration = "initial";
                that.isComplete = false;
            }
        })
    }

    scanForTags() {
        var that = this;
        let string = this.text.innerText;
        this.tags = string.match(/\B(\#[a-zA-Z]+\b)/g);
        if (this.tags){
            this.hasTag = true;
        }
        if (this.hasTag){
            this.tags.forEach(function(tag) {
                that.text.innerHTML = string.replace(tag, `<span class="hash-tag">${tag}<span>`);
            })
        }
        console.log(this.tags);
    }
    
    createLi() {
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item d-flex");
        return li;
    }

    createInput() {
        let input = document.createElement("input");
        input.setAttribute("class", "form-control no-outline");
        input.setAttribute("type", "text");
        return input;
    }

    createCheckBox() {
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "form-check-input mr-auto");
        return checkbox;
    }

    createStart() {
        let start = document.createElement("span");
        start.setAttribute("class", "start-pomodoro badge badge-pill badge- ml-1 p-2");
        start.innerText = "Start";
        return start;
    }

    createDelete() {
        let deleteThis = document.createElement("span");
        deleteThis.setAttribute("class", "start-pomodoro badge badge-pill badge- ml-1 p-2");
        deleteThis.innerHTML = "&#10060;";
        return deleteThis;
    }

    setText(text) {
        this.text.innerText = text;
    }

    addPomodoro() {
        this.hasPomodoro = true;
        this.pomodoroCount++;
        this.pomodoro.innerText = this.pomodoroCount;
    }

    createPomodoro() {
        let pomodoro = document.createElement("span");
        pomodoro.setAttribute("class", "badge badge-primary badge-pill ml-auto p-2");
        pomodoro.innerText = this.pomodoroCount;
        return pomodoro;
    }

    setCategory(category) {
        this.category = category;
        this.categorySpan.setAttribute("class", "badge badge-info badge-pill ml-auto p-2");
        this.categorySpan.innerText = this.category.title;
        this.categorySpan.style.backgroundColor = this.category.color;
    }

    createCategory() {
        let categorySpan = document.createElement("span");
        return categorySpan;
    }

    removeCategory() {
        this.hasCategory = false;
        this.category = {};
    }

    addTag(tag) {
        this.hasTag = true;
        this.tags.push(tag);
    }

    createTag() {
        // ADD tag 
    }

}