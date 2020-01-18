<?php
/**
 * *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
 * A class to create List objects, implementing the JsonSerializable 
 * interface so that private members can get json encoded with the
 * json_encode function
 */
class ToDoList implements JsonSerializable
{
    private $listID;
    private $listTitle;
    private $dateCreated;
    private $userID;
    private $listItems;

    /**
     * ToDoList constructor.
     *
     * Params are default null to allow for PDO::FETCH_CLASS option
     *
     * @param null $listID
     * @param null $listTitle
     * @param null $dateCreated
     * @param null $userID
     */
    function __construct($listID = null, $listTitle = null,
                         $dateCreated = null, $userID = null)
    {
        $this->listID = $listID;
        $this->listTitle = $listTitle;
        $this->dateCreated = $dateCreated;
        $this->userID = $userID;
        $this->listItems = []; // array of ListItem objects

    }

    /**
     * Setter function to add ListItem objects
     * @param $listItem
     */
    function addListItem($listItem){
        array_push($this->listItems, $listItem);
    }

    /**
     * Getter for ListID
     * @return |null
     */
    function getListID(){
        return $this->listID;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }
}