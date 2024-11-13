const headerDate = document.querySelector(".header__date");

const contentDate = document.querySelector(`.current__month--year`);
const calendar = document.querySelector(`.content__date-box`);
const prevBtn = document.querySelector(`.content__arrow-up`);
const nextBtn = document.querySelector(`.content__arrow-down`);
const contentWeek = document.querySelector(`.content__weekday`);
const monthBox = document.querySelector(`.content__month-box`);
const yearBox = document.querySelector(`.content__year-box`);

const app = {
    currentStartYear: Math.floor(new Date().getFullYear() / 10) * 10,
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsInBox: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    getCurrentHeaderDate: function () {
        const today = new Date();

        const weekDay = this.daysOfWeek[today.getDay()];
        const day = today.getDate();
        const month = this.months[today.getMonth()];
        const year = today.getFullYear();

        const currentHeaderDate = `${weekDay}, ${month} ${day}`;
        const currentContentDate = `${month} ${year}`;

        headerDate.textContent = currentHeaderDate;
        contentDate.textContent = currentContentDate;
    },
    // generate calendar
    generateDates: function (year, month) {
        const currentDate = new Date();
        calendar.innerHTML = `
            <ul class="content__weekday ul-flex-box">
                <li>Su</li>
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
            </ul>
        `;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();

        for (let i = firstDay;i > 0;i--) {
            const dayElement = document.createElement('li');
            dayElement.innerHTML = prevLastDay - i + 1;
            dayElement.classList.add('content__day', 'none__active');
            calendar.appendChild(dayElement);
        }
        for (let i = 1;i <= lastDay;i++) {
            const dayElement = document.createElement('li');
            if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('active');
            }
            dayElement.innerHTML = i;
            dayElement.classList.add('content__day');
            calendar.appendChild(dayElement);
        }
        const nextDays = 42 - (firstDay + lastDay);
        for (let i = 1;i <= nextDays;i++) {
            const dayElement = document.createElement('li');
            dayElement.innerHTML = i;
            console.log("Check i", i);
            console.log("Check nextDays", nextDays);
            console.log("Check firstDay", firstDay);
            console.log("Check lastDay", lastDay);

            dayElement.classList.add('content__day', 'none__active');
            calendar.appendChild(dayElement);
        }

        calendar.style.display = 'flex';
        contentWeek.style.display = 'flex';
        yearBox.style.display = 'none';
        monthBox.style.display = 'none';

        this.dayClickEvent();
    },
    // display current calendar
    displayCurrentCalendar: function () {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        this.generateDates(currentYear, currentMonth);
    },
    // generate month box layout
    generateMonthBox: function () {
        monthBox.innerHTML = '';
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        for (let i = 0;i < 16;i++) {
            const monthIndex = i % 12;
            const monthName = this.monthsInBox[monthIndex];
            const monthElement = document.createElement('li');
            monthElement.innerHTML = monthName;
            monthElement.classList.add("content__month");
            if (monthIndex === currentMonthIndex && contentDate.textContent === currentYear.toString()) {
                monthElement.classList.add("active")
            }
            if (i > 11) {
                monthElement.classList.add("none__active");
            }
            monthBox.appendChild(monthElement)
        }

        calendar.style.display = 'none';
        contentWeek.style.display = 'none';
        yearBox.style.display = 'none';
        monthBox.style.display = 'flex';

        this.monthClickEvent();
    },
    // generate year box layout
    generateYearBox: function (startYear) {
        yearBox.innerHTML = '';
        const currentDate = new Date();

        const endYear = startYear + 9;

        if ((startYear / 10) % 2 === 0) {
            startYear = startYear;
        } else {
            startYear = startYear - 2;
        }

        for (let i = 0;i < 16;i++) {
            if ((startYear / 10) % 2 === 0) {
                const year = startYear + i;
                const yearElement = document.createElement("li");
                yearElement.textContent = year;
                yearElement.classList.add("content__year");
                if (year === currentDate.getFullYear()) {
                    yearElement.classList.add("active");
                }
                if (i > 9) {
                    yearElement.classList.add("none__active");
                }
                yearBox.appendChild(yearElement);
            } else {
                const year = startYear + i;
                const yearElement = document.createElement("li");
                yearElement.textContent = year;
                yearElement.classList.add("content__year");
                if (year === currentDate.getFullYear()) {
                    yearElement.classList.add("active");
                }
                if (i < 2 || i > 11) {
                    yearElement.classList.add("none__active");
                }
                yearBox.appendChild(yearElement);
            }
        }

        monthBox.style.display = 'none';
        yearBox.style.display = 'flex';

        this.yearClickEvent();

        contentDate.textContent = `${startYear}-${endYear}`;
    },
    // event day when click
    dayClickEvent: function () {
        const _this = this;
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const days = document.querySelectorAll('.content__day');

        days.forEach(day => {
            day.addEventListener('click', function () {
                if (_this.prevDayClick) {
                    _this.prevDayClick.classList.remove('hover-active');
                }

                day.classList.add('hover-active');

                _this.prevDayClick = day;
                const dayOfMonth = parseInt(day.textContent);
                let month = currentMonth;
                let year = currentYear;

                if (day.classList.contains('none__active')) {
                    const currentDate = contentDate.textContent.split(' ');
                    const currentMonthIndex = _this.months.indexOf(currentDate[0]);
                    const displayYear = parseInt(currentDate[1]);

                    if (dayOfMonth < 15) {
                        month = currentMonthIndex + 1;
                        if (month > 11) {
                            month = 0;
                            year = displayYear + 1;
                        }
                    } else {
                        month = currentMonthIndex - 1;
                        if (month < 0) {
                            month = 11;
                            year = displayYear - 1;
                        }
                    }
                } else {
                    const currentDate = contentDate.textContent.split(' ');
                    month = _this.months.indexOf(currentDate[0]);
                    year = parseInt(currentDate[1]);
                }

            });
        });
    },
    // event month when click
    monthClickEvent: function () {
        const _this = this;
        const months = document.querySelectorAll('.content__month');

        months.forEach(month => {
            month.addEventListener('click', function () {
                const monthIndex = _this.monthsInBox.indexOf(month.textContent);
                const currentYear = parseInt(contentDate.textContent);
                _this.generateDates(currentYear, monthIndex);
                contentDate.textContent = `${_this.months[monthIndex]} ${currentYear}`;
            });
        });

    },
    // event year when click
    yearClickEvent: function () {
        const _this = this;
        const years = document.querySelectorAll('.content__year');

        years.forEach(year => {
            year.addEventListener('click', function () {
                const currentYear = parseInt(year.textContent);

                contentDate.textContent = currentYear;
                _this.generateMonthBox();
            });
        });
    },
    // event handling
    handleEvent: function () {
        const _this = this;

        // previous month calendar
        function showPreviousMonth(year, month) {
            let monthIndex = _this.months.indexOf(month);
            monthIndex--;
            if (monthIndex < 0) {
                monthIndex = 11;
                year--;
            }
            _this.generateDates(year, monthIndex);
            contentDate.textContent = `${_this.months[monthIndex]} ${year}`;
        };

        // next month calendar
        function showNextMonth(year, month) {
            let monthIndex = _this.months.indexOf(month);
            monthIndex++;
            if (monthIndex > 11) {
                monthIndex = 0;
                year++;
            }
            _this.generateDates(year, monthIndex);
            contentDate.textContent = `${_this.months[monthIndex]} ${year}`;
        };

        // prev month box
        function showPrevMonthBox() {
            const currentYear = parseInt(contentDate.textContent);
            const previousYear = currentYear - 1;
            contentDate.textContent = previousYear.toString();
            _this.generateMonthBox();
        }

        // next month box
        function showNextMonthBox() {
            const currentYear = parseInt(contentDate.textContent);
            const nextYear = currentYear + 1;
            contentDate.textContent = nextYear.toString();
            _this.generateMonthBox();
        }

        // prev year box
        function showPreviousDecade() {
            _this.currentStartYear -= 10;
            _this.generateYearBox(_this.currentStartYear);
        };

        // next year box
        function showNextDecade() {
            _this.currentStartYear += 10;
            _this.generateYearBox(_this.currentStartYear);
        };

        // previous button click event
        prevBtn.addEventListener('click', function () {
            if (calendar.style.display === 'flex') {
                let currentTime = contentDate.textContent;
                let text = currentTime.split(' ');
                let currentYear = Number(text[1]);
                let currentMonth = text[0];
                showPreviousMonth(currentYear, currentMonth);
            } else if (yearBox.style.display === 'flex') {
                showPreviousDecade();
            } else {
                showPrevMonthBox();
            }
        }),

            // next button click event
            nextBtn.addEventListener('click', function () {
                if (calendar.style.display === 'flex') {
                    let currentTime = contentDate.textContent;
                    let text = currentTime.split(' ');
                    let currentYear = Number(text[1]);
                    let currentMonth = text[0];
                    showNextMonth(currentYear, currentMonth);
                } else if (yearBox.style.display === 'flex') {
                    showNextDecade();
                } else {
                    showNextMonthBox();
                }
            }),

            // date in content when click
            contentDate.addEventListener('click', function () {
                if (calendar.style.display === 'flex') {
                    let currentTime = contentDate.textContent;
                    let text = currentTime.split(' ');
                    let currentYear = Number(text[1]);
                    contentDate.textContent = currentYear.toString();
                    _this.generateMonthBox();
                } else if (monthBox.style.display === 'flex') {
                    let currentYear = Number(contentDate.textContent);
                    const startYear = Math.floor(currentYear / 10) * 10;
                    console.log("Check startYear: ", (2019 / 10) % 2);

                    const endYear = startYear + 9;
                    contentDate.textContent = `${startYear}-${endYear}`;
                    _this.generateYearBox(startYear);
                }
            })
    },
    start: function () {
        this.getCurrentHeaderDate();

        this.displayCurrentCalendar();

        this.handleEvent();

    }
};

app.start();

