/**
 * Class for Countdown Timer
 */
export default class Timer {

    constructor(container){
        this.container = container;
        this.totalSeconds = 1500;
        this.timeShowing = "00 : 25 : 00";
        this.isButtonStart = true;
        this.interval;

        this.timerSpan = this.createTimerSpan();
        this.startButton = this.createStartButton();
        this.messageLabel = this.createMessageLabel();
        this.timerDiv = this.createTimerDiv();
        this.initEvents();
    }

    initEvents() {
        var that = this;
        this.startButton.addEventListener("click", function(){
            console.log("clicked");
            if (that.isButtonStart) {
                that.interval = setInterval(that.timerCountdown, 1000, that);
                that.startButton.innerText = "Stop";
                that.isButtonStart = false;
                console.log("Started");
            } else {
                clearInterval(that.interval);
                console.log("cleared");
                that.isButtonStart = true;
                that.startButton.innerText = "Start";
                console.log("Stopped");
            }
        });
    }

    renderTimer() {
        this.timerDiv.appendChild(this.timerSpan);
        this.container.appendChild(this.timerDiv);
        this.container.appendChild(this.startButton);
        this.container.appendChild(this.messageLabel);
    }

    // renderTime() {
    //     let seconds = totalSeconds % 60;
	// 	let minutes = Math.floor(totalSeconds / 60);
	// 	let hours = Math.floor(minutes / 60);
	// 	minutes %= 60;
	// 	hours %= 60;
	// 	let adsec = ("0" + seconds).slice(-2);
	// 	let admin = ("0" + minutes).slice(-2);
    //     let adhr = ("0" + hours).slice(-2);
    //     this.timerSpan.innerText = `${adhr} : ${admin} : ${adsec}`;
    // }

    timerCountdown(that) {
        that.totalSeconds = that.totalSeconds - 1;

		if (that.totalSeconds == -1) {
			clearInterval(this.interval);
			return;
		}
		if (that.totalSeconds == 0) {
			that.isButtonStart = true;
			that.startButton.innerText = "Start";
		}
		let seconds = that.totalSeconds % 60;
		let minutes = Math.floor(that.totalSeconds / 60);
		let hours = Math.floor(minutes / 60);
		minutes %= 60;
		hours %= 60;
		let adsec = ("0" + seconds).slice(-2);
		let admin = ("0" + minutes).slice(-2);
        let adhr = ("0" + hours).slice(-2);
        console.log(`${adhr} : ${admin} : ${adsec}`);
        that.timerSpan.innerText = `${adhr} : ${admin} : ${adsec}`;
    }

    createTimerDiv() {
        let div = document.createElement("div");
        div.setAttribute("class", "timer m-auto");
        div.setAttribute("id", "timer");
        return div;
    }

    createTimerSpan() {
        let span = document.createElement("span");
        span.setAttribute("class", "inner-time display-1 m-auto font-weight-bold text-white");
        span.innerText = this.timeShowing;
        return span;
    }

    createMessageLabel() {
        let label = document.createElement("p");
        label.setAttribute("class", "message-label m-auto");
        return label;
    }

    createStartButton() {
        let button = document.createElement("button");
        button.setAttribute("class", "btn btn-dark m-auto btn-lg p-3");
        button.innerText = "Start";
        return button;
    }


}