const MONDAY = 0;
const FRIDAY = 4;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const previousBtn = document.querySelector(".previousBtn");
const nextBtn = document.querySelector(".nextBtn");

const drawCalendar = (currentDate) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();

    drawCalendarHeader(currentMonth, currentYear);
    drawCalendarContent(currentMonth, currentYear, currentDay);
};

const drawCalendarContent = (currentMonth, currentYear, currentDay = null) => {
    const weeksWrapper = document.querySelector(".weeks__wrapper");
    weeksWrapper.innerHTML = "";
    const firstDayNum = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, +currentMonth + 1, 0);
    let firstDay = firstDayNum.getDay();
    const numberOfDays = lastDay.getDate();
    console.log(numberOfDays);
    let numberOfWeeks = 5;

    firstDay === 0 ? (firstDay = 6) : firstDay--; //Monday - 0, Sunday - 6

    if (numberOfDays === 28 && firstDay === MONDAY) numberOfWeeks--;
    if (numberOfDays === 31 && firstDay > FRIDAY) numberOfWeeks++;

    let day = 0;

    for (let i = 0; i < numberOfWeeks; i++) {
        let row = document.createElement("div");
        row.className = "week";

        for (let j = 0; j < 7; j++) {
            day++;

            let cell = document.createElement("div");
            cell.className = "day";

            if (currentDay === day) {
                cell.classList.add("current");
                cell.innerHTML = day;
            } else if (day > lastDay.getDate()) {
                cell.innerHTML = " ";
                row.appendChild(cell);
                continue;
            } else if (i === 0 && j < firstDay) {
                day--;
                cell.innerHTML = "";
            } else {
                cell.innerHTML = day;
            }
            row.appendChild(cell);
        }
        weeksWrapper.appendChild(row);
    }
};

const drawCalendarHeader = (month, year) => {
    const calendarWrapper = document.querySelector(".calendar__wrapper");
    const weekHeader = calendarWrapper.querySelector(".week__header");

    document.querySelector(".calendar__header").innerHTML =
        months[month] + " " + year;

    calendarWrapper.style.display = "flex";
    weekHeader.innerHTML = "";

    setAttributesForBtns(month, year, calendarWrapper);

    for (const day of days) {
        weekHeader.innerHTML += `<div class="day-of-week">${day}</div>`;
    }
};

const setAttributesForBtns = (month, year, calendarWrapper) => {
    const nextBtn = calendarWrapper.querySelector(".nextBtn");
    const previousBtn = calendarWrapper.querySelector(".previousBtn");

    month = Number(month);
    year = Number(year);

    nextBtn.dataset.month = (month + 1) % 12;
    nextBtn.dataset.year = month === 11 ? year + 1 : year;
    previousBtn.dataset.month = month === 0 ? 11 : month - 1;
    previousBtn.dataset.year = month === 0 ? year - 1 : year;
};

nextBtn.addEventListener("click", (event) => {
    const currentMonth = nextBtn.dataset.month;
    const currentYear = nextBtn.dataset.year;
    drawCalendarHeader(currentMonth, currentYear);
    drawCalendarContent(currentMonth, currentYear);
});

previousBtn.addEventListener("click", (event) => {
    const currentMonth = previousBtn.dataset.month;
    const currentYear = previousBtn.dataset.year;
    drawCalendarHeader(currentMonth, currentYear);
    drawCalendarContent(currentMonth, currentYear);
});

document.querySelector("#okBtn").addEventListener("click", (event) => {
    const today = new Date();
    drawCalendar(today);
});