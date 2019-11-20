import ListItem from './components/listitem.js';
import List from './components/list.js';

window.addEventListener("load", function () {
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");

    let lists = [];

    newListButton.addEventListener("click", function(){
        let l = new List(container, newListNameInput.value);
        lists.push(l);
        l.renderList();
    })
});