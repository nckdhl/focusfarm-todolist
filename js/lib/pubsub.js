/**
 * Publisher Subscriber Class 
 * 
 * Implements the Pub/Sub design pattern 
 */
export default class PubSub {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe method - subscribes an event. 
     * 
     * Pass a string event, which is the event's unique name
     * and a call back function. If there's not a matching event in the object's
     * event collection, it is created with a blank array. 
     * 
     * The call back is then pushed in to the array. 
     * 
     * (If the event already existed, this is all that would occur)
     * 
     * The length of the events collection is returned because it
     * may be handy to know how many events exist. 
     */
    subscribe(event, callback) {
        let self = this;
        
        if (!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }

        return self.events[event].push(callback);
    }

    /**
     * Publish method
     * 
     * First checks to see if the passed event occurs in collection. 
     * If not, an empty array is returned. 
     * 
     * If there is an event, loop through each stored callback
     * and pass the data into it. 
     * 
     * If there are no callbacks (which shouldn't happen), it's ok
     * because that event was created with an empty array in the subscribe method
     */
    publish(event, data = {}) {
        let self = this;

        if(!self.events.hasOwnProperty(event)){
            return [];
        }

        return self.events[event].map(callback => callback(data));
    }
}