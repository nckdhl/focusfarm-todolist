import ListItem from './components/listitem.js';
import List from './components/list.js';
import ListSelector from './components/listselector.js';
import Timer from './components/timer.js';

window.addEventListener("load", function () {
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");
    let timerContainer = document.querySelector("#timer-container");
    
    let selector = new ListSelector(container);
    
    let timer = new Timer(timerContainer);
    timer.renderTimer();
    
    let listCount = 0;
    let lastIndex = 0;

    let lists = [];

    newListButton.addEventListener("click", function(event){
        event.preventDefault();
        container.classList.add('p-3');
        let l = new List(container, newListNameInput.value);
        l.renderList();
        if (listCount === 0){
            selector.renderSelector();
            selector.insertList(l);
        } else {
            selector.insertList(l);
            container.removeChild(lists[lists.length - 1].div);
        }
        lists.push(l);
        listCount ++;
        lastIndex = listCount - 1;
    })

    selector.selectorLoadButton.addEventListener("click", function(){
        let selectedIndex = selector.selectorControl.selectedIndex;
        if (selectedIndex != lastIndex){
            lists[selectedIndex].renderList();
        container.removeChild(lists[lastIndex].div);
        }
        lastIndex = selectedIndex;
        console.log("List to be loaded: ");
        console.log(lists[selectedIndex]);
    })

    // selector.selectorDeleteButton.addEventListener("click", function(){
    //     let selectedIndex = selector.selectorControl.selectedIndex;
    //     container.removeChild(lists[selectedIndex].div);
    //     lists = lists.splice(selectedIndex, 1);
    // })

});