/**
 * Class for Countdown Timer
 */
export default class Timer {

    constructor(container){
        this.container = container;
        this.totalSeconds = 1500;
        this.timeShowing = "00 : 25 : 00";

        this.timerSpan = createTimerSpan();
        this.startButton = createStartButton();
        this.messageLabel = createMessageLabel();
        this.timerDiv = createTimerDiv();
    }

    render(){

    }

    createTimerDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "timer");
        div.setAttribute("id", "timer");
        return div;
    }

    createTimerSpan() {
        let span = document.createElement("span");
        span.setAttribute("inner-time");
        span.innerText = this.timeShowing;
        return span;
    }

    createMessageLabel() {
        let label = document.createElement("p");
        label.setAttribute("class", "message-label");
        return label;
    }

    createStartButton() {
        let button = docu
    }


}