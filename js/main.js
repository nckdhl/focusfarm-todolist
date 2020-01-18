import ListItem from './components/listitem.js';
import List from './components/list.js';
import ListSelector from './components/listselector.js';

/**
 *
 *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 *  This file is used by main.php to control the to do list UI
 *
 */
window.addEventListener("load", function () {
    // main DOM elements are assigned to variables
    let container = document.querySelector("#list-container");
    let newListButton = document.querySelector("#new-list-button");
    let newListNameInput = document.querySelector("#new-list-input");
    let logOutButton = document.querySelector("#logOut");

    // selector component is initialized
    let selector = new ListSelector(container);

    // contains an array of List components
    let lists = [];

    /**
     * This function retrieves all the Lists and List Items
     * from the database and stores them in memory, rendering the
     * last List made by the user to the DOM
     */
    const getLists = () => {
        // AJAX SELECT CALL
        fetch("php/endpoints/GetLists.php", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => response.json())
            .then(populateLists) // populates memory with list records
            .then(renderListControls); // renders last list to the dom
    };

    /**
     * This function populates the array of lists with the records
     * from the database.
     *
     * It also adds the lists to the selector control.
     * @param data - JSON promise from AJAX fetch
     * @returns {*} - false if failed, last list in array if success
     */
    const populateLists = data => {

        if (data){

            for (let i = 0; i < data.length; i++){
                // creates List object
                let l = new List(container, data[i].listTitle, data[i].listID, data[i].dateCreated, true);

                for (let j = 0; j < data[i].listItems.length; j++){
                    // creates ListItem and adds it to List object
                    l.addListItem(new ListItem(l.ul, l.listID, false, data[i].listItems[j].isComplete,
                        false, data[i].listItems[j].dateCreated, data[i].listItems[j].itemText, data[i].listItems[j].itemID))
                }
                // adds list to array
                lists.push(l);
                // adds list to selector
                selector.insertList(l);

            }
            // last list in array
            return lists[lists.length - 1];
        } else {
            return false;
        }

    };

    /**
     *
     * @param list
     */
    const renderListControls = list => {
        if (list) {
            container.classList.add('p-3');
            list.renderList();
            selector.renderSelector();
            //lastIndex = lists.length - 1;
        }
    };

    // invokes
    getLists();

    // event fires when logout button is clicked
    // to log out current user
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
                // if logout was successful
                // user is redirected to index.html login page
                if (logout.success){
                    window.location.href = "../index.html";
                // otherwise an alert is shown
                } else {
                    alert("Try logging out again. There was an issue.");
                }
            });
    });

    // event fires when new list button is clicked
    // Adds a new list to the DOM and the selector
    // Inserts new list to database
    // The current list showing is replaced by the new list
    newListButton.addEventListener("click", function(event){
        event.preventDefault();

        // Checks if a name has been added to the list item
        if (newListNameInput.reportValidity()){

            let listTitle = newListNameInput.value;

            let params = `listTitle=${listTitle}`;

            // AJAX INSERT CALL
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
                    // If the insertion was successful
                    // The new list is instantiated and added to the array of lists
                    if (data.success){
                        console.log(data);
                        container.classList.add('p-3');
                        let l = new List(container, listTitle, data.listID);
                        // resets input field
                        newListNameInput.value = "";
                        // if this is the first list
                        if (lists.length == 0){
                            l.renderList();
                            selector.renderSelector();
                            selector.insertList(l);
                        // if there are already lists
                        } else {
                            selector.insertList(l);
                            container.removeChild(document.querySelector(".current-list"));
                            l.renderList();
                        }
                        lists.push(l);
                    } else {
                        // Alert is shown if insertion fails
                        alert("Couldn't create the list - Check your internet connection");
                    }
                });

        }

    });


    // This event is fired if the checkmark load button is clicked
    // in the list selector
    // it loads that list to the list component
    selector.selectorLoadButton.addEventListener("click", function(){
        let selectedIndex = selector.selectorControl.selectedIndex;

        if (selectedIndex > -1) {
            // removes list currently showing
           container.removeChild(document.querySelector(".current-list"));
            // renders selected list
           lists[selectedIndex].renderList();
        }
    });

    // This event is fired if the x delete button is clicked on the list selector
    // it deletes the selected list from the database and memory
    selector.selectorDeleteButton.addEventListener("click", function(){

        let selectedIndex = selector.selectorControl.selectedIndex;

        if (selectedIndex > -1){

            let selectedList = lists[selectedIndex];
            // removes list from array
            lists.splice(selectedIndex, 1);
            // removes list from selector
            selector.removeList(selectedIndex);

            // if the selected list is currently showing the last list in the control
            // is used to replaced it in the component
            if (selectedList.div.parentNode){

                container.removeChild(document.querySelector(".current-list"));

                // if the list to be deleted is the last list in the selector
                // then the entire list component is erased from the DOM
                if (lists.length > 0){
                    lists[lists.length - 1].renderList();
                } else if (lists.length == 0){
                    container.removeChild(selector.selectorContainer);
                    container.classList.remove('p-3')
                }
            }
            // this callback deletes the selected list from the database
            // using the unique list id assigned to it
            deleteListByID(selectedList.listID);
        }

    });

    /**
     * This function deletes the list from the database with an
     * AJAX DELETE call
     * @param listID - unique ID of list to be deleted
     */
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

});