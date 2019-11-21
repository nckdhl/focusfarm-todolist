import ListItem from './components/listitem.js';
import List from './components/list.js';
import ListSelector from './components/listselector.js';

window.addEventListener("load", function () {
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");
    let selector = new ListSelector(container);
    
    let listCount = 0;

    let lists = [];

    newListButton.addEventListener("click", function(event){
        event.preventDefault();
        let l = new List(container, newListNameInput.value);
        l.renderList();
        if (listCount === 0){
            selector.render();
            selector.insertList(l);
        } else {
            selector.insertList(l);
            container.removeChild(lists[lists.length - 1].div)
            // lists[lists.length - 1].ul.style.display = "none";
            // lists[lists.length - 1].button.style.display = "none";
        }
        lists.push(l);
        listCount ++;
        
    })

    // <li class="page-item"><a class="page-link" href="#">1</a></li>
    // <li class="page-item"><a class="page-link" href="#">2</a></li>
    // <li class="page-item"><a class="page-link" href="#">3</a></li>
    // function createListSelection(){
    //     console.log("List selection create called");
    //     container.insertAdjacentHTML("beforeend", 
    //         `<div class="form-group">
    //         <label for="exampleFormControlSelect2">Which list do you want to see?</label>
    //         <select multiple class="form-control" id="list-selection-control">
    //         </select>
    //       </div>`);
    // }

    // function insertListSelection(){
    //     let option = document.createElement("option");
    //     option.setAttribute("id", `${listCount}`);
    //     option.innerText = `${lists[listCount].listTitle}`;
    //     let container = document.querySelector("#list-selection-control");
    //     container.appendChild(option);
    // }
});