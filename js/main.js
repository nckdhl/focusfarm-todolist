import ListItem from './components/listitem.js';
import List from './components/list.js';
import ListSelector from './components/listselector.js';

window.addEventListener("load", function () {
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");
    let saveButton = document.querySelector("#save");
    let logOutButton = document.querySelector("#logOut");
    
    let selector = new ListSelector(container);
    
    let listCount = 0;
    let lastIndex = 0;

    let lists = [];

    const getLists = () => {
        fetch("php/endpoints/GetLists.php", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => response.json())
            .then(populateLists)
            .then(renderListControls);
    };

    const populateLists = data => {
        console.log(data);
        for (let i = 0; i < data.length; i++){
            let l = new List(container, data[i].listTitle, data[i].dateCreated, true);
            for (let j = 0; j < data[i].listItems.length; j++){
                l.addListItem(new ListItem(l.ul, data[i].listItems[j].itemID, false, data[i].listItems[j].isComplete,
                    false, data[i].listItems[j].dateCreated, data[i].listItems[j].itemText))
            }
            lists.push(l);
            selector.insertList(l);
            listCount++;
        }
        return lists[lists.length - 1];
    }

    const renderListControls = list => {
        container.classList.add('p-3');
        list.renderList();
        selector.renderSelector();
        lastIndex = listCount - 1;
    }

    getLists();
    console.log("Print lists");
    console.log(lists);
    //renderListControls(lists[lists.length - 1]);

    logOutButton.addEventListener("click", function(){
        let params = `logout=true`;

        fetch("php/logout.php", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }, // parameter format
            body: params
        })
            .then(response => response.json())
            .then(function (logout) {
                if (logout.success){
                    window.location.href = "../index.html";
                } else {
                    console.log("Didn't log out");
                }
            });
    });

    newListButton.addEventListener("click", function(event){
        event.preventDefault();
        if (newListNameInput.reportValidity()){
            container.classList.add('p-3');
            let l = new List(container, newListNameInput.value);
            newListNameInput.value = "";
            l.renderList();
            if (listCount === 0){
                selector.renderSelector();
                selector.insertList(l);
            } else {
                selector.insertList(l);
                container.removeChild(lists[lastIndex].div);
            }
            lists.push(l);
            listCount ++;
            lastIndex = listCount - 1;
            console.log(lists);
        }

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