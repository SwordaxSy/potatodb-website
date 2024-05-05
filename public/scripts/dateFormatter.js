export default function (date) {
    // destructure date object
    const fullDate = new Date(date),
        _date = fullDate.getDate(),
        _month = fullDate.getMonth() + 1,
        _year = fullDate.getFullYear(),
        hour = fullDate.getHours(),
        _hour = (() => {
            if (hour == 0) return 12;
            return hour > 12 ? hour - 12 : hour;
        })(),
        _minute = fullDate.getMinutes().toString().padStart(2, "0"),
        dayTime = (() => {
            return hour >= 12 ? "PM" : "AM";
        })(),
        months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

    return `${_date} ${
        months[_month - 1]
    }, ${_year} at ${_hour}:${_minute} ${dayTime}`;
}
