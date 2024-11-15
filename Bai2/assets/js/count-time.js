const minusBtn = document.querySelector(`.footer__date--second #minus`);
const plusBtn = document.querySelector(`.footer__date--second #plus`);
const durationSpan = document.querySelector(`.duration span`);
const focusBtn = document.querySelector('.focus');
const focusSpan = document.querySelector('.focus span');
const timeOut = document.querySelector('.time-out');
const timeOutSpan = document.querySelector('.time-out span');
const iConTimer = document.querySelector('.icon-timer');
const iConI = document.querySelector('.icon-timer .fa-solid');

let defaultPeriod = 30;
let interval;
let remainingTime; // To hold the remaining time in seconds 
let isRunning = false;

const app2 = {
    updatePeriodFocus: function () {
        durationSpan.textContent = defaultPeriod;
    },
    setCountTime: function (duration) {
        let totalSeconds = duration * 60;
        if (remainingTime) {
            totalSeconds = remainingTime;
        }

        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                timeOutSpan.textContent = `${defaultPeriod} mins`;
                return;
            }
            isRunning = true;
            totalSeconds--;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            timeOutSpan.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            remainingTime = totalSeconds;
        }, 1000);
    },

    handleEvent: function () {
        const _this = this;

        function updatePeriodFocus() {
            durationSpan.textContent = defaultPeriod;
            if (parseInt(durationSpan.textContent) === 5) {
                minusBtn.classList.add("disabled");
            } else {
                minusBtn.classList.remove("disabled");
            }
        }

        minusBtn.addEventListener('click', () => {
            if (defaultPeriod === 5) {
                return;
            } else if (defaultPeriod > 30) {
                defaultPeriod -= 15;
                updatePeriodFocus(defaultPeriod);
            } else if (defaultPeriod <= 30 && defaultPeriod > 5) {
                defaultPeriod -= 5;
                updatePeriodFocus(defaultPeriod);
            }
        });

        plusBtn.addEventListener('click', () => {
            if (defaultPeriod >= 30) {
                defaultPeriod += 15;
                updatePeriodFocus(defaultPeriod);
            } else {
                defaultPeriod += 5;
                updatePeriodFocus(defaultPeriod);
            }
        });

        iConTimer.addEventListener('click', function () {
            if (isRunning === false) {
                isRunning = true;
                iConI.classList.remove('fa-play');
                iConI.classList.add('fa-pause')
                _this.setCountTime(defaultPeriod);
            } else if (isRunning === true) {
                isRunning = false;
                iConI.classList.remove('fa-pause');
                iConI.classList.add('fa-play');
                clearInterval(interval);
            }
        })


        focusBtn.addEventListener('click', function () {
            if (focusSpan.textContent === 'Focus') {
                timeOut.style.display = 'flex';
                focusSpan.textContent = 'End Session';
                _this.setCountTime(defaultPeriod);
            } else if (focusSpan.textContent === 'End Session') {
                clearInterval(interval);
                remainingTime = null;
                isRunning = false;
                timeOutSpan.textContent = `${defaultPeriod}`;
                timeOut.style.display = 'none';
                focusSpan.textContent = 'Focus';
            }
        })
    },
    start: function () {
        this.updatePeriodFocus();
        this.handleEvent();
    }
}

app2.start();