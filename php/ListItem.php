<?php
/**
 * A class to create ListItem objects, implementing the JsonSerializable 
 * interface so that private members can get json encoded with the
 * json_encode function
 */
class ListItem implements JsonSerializable
{
    private $itemID;
    private $itemText;
    private $isComplete;
    private $listID;
    private $dueDate;
    private $dateCreated;

    function __construct($itemID = null, $itemText = null, $listID = null,
                         $isComplete = null, $dueDate = null, $dateCreated = null)
    {
        $this->itemID = $itemID;
        $this->itemText = $itemText;
        $this->listID = $listID;
        $this->isComplete = $isComplete;
        $this->dueDate = $dueDate;
        $this->dateCreated = $dateCreated;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }

    public function getListId() {
        return $this->listID;
    }
}