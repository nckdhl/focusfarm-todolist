
// function createList(){
//     let ul = document.createElement("ul");
//     ul.setAttribute("class", "list-group list-group-flush");
// }

export class ListItem {

    constructor(listContainer){
        this.listContainer = listContainer;
        this.hasPomodoro = false;
        this.hasCategory = false;
        this.hasTag = false;

        this.pomodoroCount = 0;
        this.category = {};
        this.tags = [];
        this.li = document.createElement("li");
    }

    render() {
        li.setAttribute("class", "listItem list-group-item d-flex justify-content-between align-items-center");
        if (this.hasPomodoro){
            li.appendChild(this.createPomodoro());
        }
        if (this.hasCategory){
            let category = document.createElement("span");
            category.setAttribute = ("class", "categorySpan");
            li.appendChild(category);
        }
        if (this.hasTag){
            let tag = this.tag
        }

    }

    setText(text) {
        this.li.innerText = text;
    }

    addPomodoro() {
        this.hasPomodoro = true;
        this.pomodoros++;
    }

    createPomodoro() {
        let pomodoro = document.createElement("span");
        pomodoro.setAttribute = ("class", "badge badge-primary badge-pill ml-auto p-2");
        pomodoro.innerText = pomodoroCount;
    }

    setCategory(category) {
        this.hasCategory = true;
        this.category = category;
    }

    addTag(tag) {
        this.hasTag = true;
        this.tags.push(tag);
    }

}