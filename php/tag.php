<?php
/**
 * A class to create Tag objects, implementing the JsonSerializable 
 * interface so that private members can get json encoded with the
 * json_encode function
 */
class Tag implements JsonSerializable
{
    private $tagID;
    private $tagName;

    function __construct($tagID = null, $tagName)
    {
        $this->tagName = tagName;
        $this->tagID = tagID;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }
}