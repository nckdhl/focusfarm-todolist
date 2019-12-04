<?php
/**
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

    function __construct($listID = null, $listTitle = null,
                         $dateCreated = null, $userID = null)
    {
        $this->listID = $listID;
        $this->listTitle = $listTitle;
        $this->dateCreated = $dateCreated;
        $this->userID = $userID;
        $this->listItems = [];

    }

    function addListItem($listItem){
        array_push($this->listItems, $listItem);
    }

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