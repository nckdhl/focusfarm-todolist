<?php
/**
 *  *  I, Nicholas Dahl, 000783631 certify that this material is my original work.
 *  No other person's work has been used without due acknowledgement.
 *
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

    /**
     * ListItem constructor.
     *
     * Params are default null to allow for PDO::FETCH_CLASS option
     *
     * @param null $itemID
     * @param null $itemText
     * @param null $listID
     * @param null $isComplete
     * @param null $dueDate
     * @param null $dateCreated
     */
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

    /**
     * Getter for ListID field
     * @return |null
     */
    public function getListId() {
        return $this->listID;
    }

    /**
     * Getter for isComplete field
     * @return |null
     */
    public function getCompletion() {
        return $this->isComplete;
    }

    /**
     * Setter for isComplete field
     * @param $completion
     */
    public function setCompletion($completion) {
        $this->isComplete = $completion;
    }
}