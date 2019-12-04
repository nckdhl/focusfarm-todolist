/**
 * This class is for a list item in the to-do list
 *
 */
export default class ListItem {

    constructor(listContainer, listID = null, hasTag = false, isComplete = false,
                isInput = false, dateCreated = new Date(), content = "") {
        this.listContainer = listContainer;
        this.listID = listID;
        this.hasTag = hasTag;
        this.isComplete = isComplete;
        this.isInput = isInput;
        this.dateCreated = dateCreated;
        this.content = content;

        // TODO add these features later
        //this.hasText = false;
        //this.hasPomodoro = false;
        //this.hasCategory = false;
        //this.pomodoroCount = 0;

        this.category;
        this.tags = [];
        this.li = this.createLi();
        this.checkBox = this.createCheckBox();
        this.text = this.createText();
        //this.categorySpan = this.createCategory();
        //this.pomodoro = this.createPomodoro();
        //this.start = this.createStart();
        this.deleteThis = this.createDelete();

        this.input = this.createInput();

        this.listContainer.appendChild(this.li);

        this.initEvents();
    }

    renderInput() {
        this.li.appendChild(this.input);
        this.input.focus();
    }

    renderListItem() {
        this.li.appendChild(this.checkBox);
        this.li.appendChild(this.text);
        //this.li.appendChild(this.categorySpan);
        //this.li.appendChild(this.pomodoro);
        //this.li.appendChild(this.start);
        this.li.appendChild(this.deleteThis);
    }

    removeListItem() {
        this.li.removeChild(this.checkBox);
        this.li.removeChild(this.text);
        //this.li.removeChild(this.categorySpan);
        //this.li.removeChild(this.pomodoro);
        //this.li.removeChild(this.start);
        this.li.removeChild(this.deleteThis);
    }

    delete() {
        this.listContainer.removeChild(this.li);
    }

    toggleInput() {
        if (!this.isInput) {
            this.li.removeChild(this.input);
            this.renderListItem();
            if (this.content != ""){
                this.setText(this.content);
            } else if (this.input.value == "") {
                this.setText("Doubleclick here to edit.");
            }
            this.scanForTags();
            this.isInput = !this.isInput;
        } else {
            this.removeListItem();
            this.renderInput();
            this.input.focus();
            this.isInput = !this.isInput;
        }
    }

    initEvents() {
        var that = this;
        this.li.addEventListener("dblclick", function () {
            that.content = that.input.value;
            that.toggleInput();
        });
        this.input.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                that.content = that.input.value;
                that.toggleInput();
            }
        })
        this.checkBox.addEventListener("change", function () {
            if (that.checkBox.checked) {
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
        if (this.tags) {
            this.hasTag = true;
        }
        if (this.hasTag) {
            this.tags.forEach(function (tag) {
                that.text.innerHTML = string.replace(tag, `<span class="hash-tag">${tag}<span>`);
            })
        }
        console.log(this.tags);
    }

    createText() {
        let span = document.createElement("span");
        span.innerText = this.content;
        return span;
    }

    createLi() {
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item d-flex bg-dark text-light");
        return li;
    }

    createInput() {
        let input = document.createElement("input");
        input.setAttribute("class", "form-control no-outline");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Type here... press enter to save.");
        input.required = true;
        input.value = this.content;
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
        deleteThis.setAttribute("class", "start-pomodoro badge badge-pill badge- ml-auto p-2");
        deleteThis.innerHTML = "&#10060;";
        return deleteThis;
    }

    setText(text) {
        this.text.innerText = text;
    }

    // TODO add these features later
    /*addPomodoro() {
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
    }*/

    /*createCategory() {
        let categorySpan = document.createElement("span");
        return categorySpan;
    }

    removeCategory() {
        this.hasCategory = false;
        this.category = {};
    }*/

    // TODO add tag functionality

    addTag(tag) {
        this.hasTag = true;
        this.tags.push(tag);
    }

    createTag() {
        // ADD tag 
    }

}