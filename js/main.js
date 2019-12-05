import ListItem from './components/listitem.js';
import List from './components/list.js';
import ListSelector from './components/listselector.js';

window.addEventListener("load", function () {
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");
    let logOutButton = document.querySelector("#logOut");
    
    let selector = new ListSelector(container);
    
    //let listCount = 0;
    //let lastIndex = 0;

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
        if (data){
            console.log(data);
            for (let i = 0; i < data.length; i++){
                let l = new List(container, data[i].listTitle, data[i].listID, data[i].dateCreated, true);
                for (let j = 0; j < data[i].listItems.length; j++){
                    l.addListItem(new ListItem(l.ul, l.listID, false, data[i].listItems[j].isComplete,
                        false, data[i].listItems[j].dateCreated, data[i].listItems[j].itemText, data[i].listItems[j].itemID))
                }
                lists.push(l);
                selector.insertList(l);
                //listCount++;
            }
            return lists[lists.length - 1];
        } else {
            return false;
        }

    }

    const renderListControls = list => {
        if (list) {
            container.classList.add('p-3');
            list.renderList();
            selector.renderSelector();
            //lastIndex = lists.length - 1;
        }
    }

    getLists();

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

            let listTitle = newListNameInput.value;

            let params = `listTitle=${listTitle}`;

            fetch("php/endpoints/AddList.php", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, // parameter format
                body: params
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data.success){
                        console.log(data);
                        container.classList.add('p-3');
                        let l = new List(container, listTitle, data.listID);
                        newListNameInput.value = "";
                        if (lists.length == 0){
                            l.renderList();
                            selector.renderSelector();
                            selector.insertList(l);
                        } else {
                            selector.insertList(l);
                            container.removeChild(document.querySelector(".current-list"));
                            l.renderList();
                        }
                        lists.push(l);
                       // lastIndex = lists.length - 1;
                        console.log(lists);
                    } else {
                        console.log("Didnt work - list insert");
                        console.log(data);
                        alert("Couldn't create the list - Check your internet connection");
                    }
                });

        }

    })

    selector.selectorLoadButton.addEventListener("click", function(){
        let selectedIndex = selector.selectorControl.selectedIndex;

        if (selectedIndex > -1) {

           /* if (selectedIndex != lastIndex) {
                lists[selectedIndex].renderList();
                container.removeChild(document.querySelector(".current-list"));
                //container.removeChild(lists[lastIndex].div);
            }*/
           container.removeChild(document.querySelector(".current-list"));

           lists[selectedIndex].renderList();

            //lastIndex = selectedIndex;
            console.log("List to be loaded: ");
            console.log(lists[selectedIndex]);
        }
    });

    selector.selectorDeleteButton.addEventListener("click", function(){
        //console.log("last Index");
        //console.log(lastIndex);
        console.log(lists);
        let selectedIndex = selector.selectorControl.selectedIndex;

        if (selectedIndex > -1){
            let selectedList = lists[selectedIndex];
            lists.splice(selectedIndex, 1);
            selector.removeList(selectedIndex);
            console.log(selectedIndex)
            if (selectedList.div.parentNode){
                container.removeChild(document.querySelector(".current-list"));
                //lists.splice(selectedIndex, 1);
                //console.log(lists);
                if (lists.length > 0){
                    lists[lists.length - 1].renderList();
                } else if (lists.length == 0){
                    container.removeChild(selector.selectorContainer);
                    //container.classList.add('p-3');
                    container.classList.remove('p-3')
                }
            }
            deleteListByID(selectedList.listID);
            //lastIndex = selectedIndex;
        }

    });

    selector.selectorControl.addEventListener("change", function(){
        console.log(selector.selectorControl.selectedIndex);
    });

    const deleteListByID = (listID) => {

        let params = `listID=${listID}`;

        fetch("php/endpoints/DeleteList.php", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        })
            .then(response => response.json())
            .then(function (data) {
                if (data.success){
                    console.log("deleted");
                } else {
                    console.log("didn't delete");
                }
            });
    }



    // selector.selectorDeleteButton.addEventListener("click", function(){
    //     let selectedIndex = selector.selectorControl.selectedIndex;
    //     container.removeChild(lists[selectedIndex].div);
    //     lists = lists.splice(selectedIndex, 1);
    // })

});