<?php
/**
 * A class to create List objects, implementing the JsonSerializable 
 * interface so that private members can get json encoded with the
 * json_encode function
 */
class List implements JsonSerializable
{
    private $listID;
    private $listTitle;
    private $dateCreated;
    private $userID;

    function __construct($listID = null, $listTitle, $dateCreated, $userID = null)
    {
        $this->listID = $listID;
        $this->listTitle = $listTitle;
        $this->dateCreated = $dateCreated;
        $this->userID = $userID;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }
}