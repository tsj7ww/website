// Events dataset
const event_color_personal = 'rgb(198, 224, 255)'
const event_color_professional = 'rgb(214, 255, 198)'
const events = {
    // Personal
    // 2025
    '2025-03-15': { text: "Shamrock the Block", color: event_color_personal },
    '2025-04-12': { text: "Monument Ave 10k", color: event_color_personal },
    '2025-05-17': { text: "RiverRock", color: event_color_personal },
    '2025-07-11': { text: "Bday<br><br>", color: event_color_personal },
    '2025-09-20': { text: "Triathlon", color: event_color_personal },
    '2025-10-31': { text: "Halloween", color: event_color_personal },
    '2025-12-31': { text: "NYE", color: event_color_personal },
    '2025-07-27': { text: "Va<br><br>", color: event_color_personal },
    '2025-07-28': { text: "ca<br><br>", color: event_color_personal },
    '2025-07-29': { text: "tion<br><br>", color: event_color_personal },
    '2025-07-30': { text: "...<br><br>", color: event_color_personal },
    '2025-07-31': { text: "...<br><br>", color: event_color_personal },
    '2025-08-01': { text: "...<br><br>", color: event_color_personal },
    '2025-08-02': { text: "...<br><br>", color: event_color_personal },
    // 2026
    '2026-03-14': { text: "Shamrock the Block", color: event_color_personal },
    '2026-04-18': { text: "Monument Ave 10k", color: event_color_personal },
    '2026-05-16': { text: "RiverRock", color: event_color_personal },
    '2026-07-11': { text: "Bday<br><br>", color: event_color_personal },
    '2026-09-19': { text: "Triathlon", color: event_color_personal },
    '2026-10-31': { text: "Halloween", color: event_color_personal },
    '2026-12-31': { text: "NYE", color: event_color_personal },
    '2026-07-26': { text: "Va<br><br>", color: event_color_personal },
    '2026-07-27': { text: "ca<br><br>", color: event_color_personal },
    '2026-07-28': { text: "tion<br><br>", color: event_color_personal },
    '2026-07-29': { text: "...<br><br>", color: event_color_personal },
    '2026-07-30': { text: "...<br><br>", color: event_color_personal },
    '2026-08-31': { text: "...<br><br>", color: event_color_personal },
    '2026-08-01': { text: "...<br><br>", color: event_color_personal },
    // 2026
    // Professional
    // 2025
    '2025-02-09': { text: "Baseball Complete", color: event_color_professional },
    '2025-03-02': { text: "Monroe Complete", color: event_color_professional },
    '2025-04-21': { text: "Work Perf Eval", color: event_color_professional },
    '2025-10-20': { text: "Work Perf Eval", color: event_color_professional },
    '2025-11-16': { text: "Halsey + Stata Complete", color: event_color_professional },
    // 2026
    '2026-04-20': { text: "Work Perf Eval", color: event_color_professional },
    '2026-06-28': { text: "Halsey + Stata Launch", color: event_color_professional },
    '2026-10-19': { text: "Work Perf Eval", color: event_color_professional }
};
// Holidays dataset
const holiday_color_low = 'rgb(253, 228, 240)'
const holiday_color_high = 'rgb(255, 167, 186)'
const holidays = {
    // 2025
    '2025-01-01': { text: "New Year's Day", color: holiday_color_high },
    '2025-01-20': { text: "Martin Luther King Jr. Day", color: holiday_color_low },
    '2025-02-17': { text: "Presidents Day", color: holiday_color_low },
    '2025-05-26': { text: "Memorial Day", color: holiday_color_high },
    '2025-06-19': { text: "Juneteenth", color: holiday_color_low },
    '2025-07-04': { text: "Independence Day", color: holiday_color_high },
    '2025-09-01': { text: "Labor Day", color: holiday_color_high },
    '2025-10-13': { text: "Columbus Day", color: holiday_color_low },
    '2025-11-11': { text: "Veterans Day", color: holiday_color_low },
    '2025-11-27': { text: "Thanksgiving", color: holiday_color_high },
    '2025-12-25': { text: "Christmas Day", color: holiday_color_high },
    // 2026
    '2026-01-01': { text: "New Year's Day", color: holiday_color_high },
    '2026-01-19': { text: "Martin Luther King Jr. Day", color: holiday_color_low },
    '2026-02-16': { text: "Presidents Day", color: holiday_color_low },
    '2026-05-25': { text: "Memorial Day", color: holiday_color_high },
    '2026-06-19': { text: "Juneteenth", color: holiday_color_low },
    '2026-07-04': { text: "Independence Day", color: holiday_color_high },
    '2026-09-07': { text: "Labor Day", color: holiday_color_high },
    '2026-10-12': { text: "Columbus Day", color: holiday_color_low },
    '2026-11-11': { text: "Veterans Day", color: holiday_color_low },
    '2026-11-26': { text: "Thanksgiving", color: holiday_color_high },
    '2026-12-25': { text: "Christmas Day", color: holiday_color_high }
};

// Years, months, and days of the week
const years = [2025, 2026];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];








function adjustTextSize(element) {
    const container = element.parentElement;
    const maxWidth = container.clientWidth;
    const maxHeight = container.clientHeight;
    
    let fontSize = 11;
    element.style.fontSize = fontSize + 'px';

    while ((element.scrollWidth > maxWidth || element.scrollHeight > maxHeight) && fontSize > 6) {
        fontSize -= 0.5;
        element.style.fontSize = fontSize + 'px';
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function isToday(year, month, day) {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
}

function isPastDate(year, month, day) {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    return checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function renderMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    let html = `
        <div class="month">
            <div class="month-title">${months[month]} ${year}</div>
            <table>
                <tr>
                    ${daysOfWeek.map(day => `<th>${day}</th>`).join('')}
                </tr>
    `;

    let dayCount = 1;
    const weeksInMonth = Math.ceil((firstDay + daysInMonth) / 7);

    for (let week = 0; week < weeksInMonth; week++) {
        html += '<tr>';
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            if ((week === 0 && dayOfWeek < firstDay) || dayCount > daysInMonth) {
                html += '<td class="empty"></td>';
            } else {
                const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;
                const holiday = holidays[date];
                const event = events[date];
                
                let classes = [];
                if (isToday(year, month, dayCount)) {
                    classes.push('today');
                } else if (isPastDate(year, month, dayCount)) {
                    classes.push('past-date');
                }
                
                html += `<td class="${classes.join(' ')}">`;
                html += `<div class="date">${dayCount}</div>`;
                
                if (holiday || event) {
                    html += '<div class="event-container">';
                    if (holiday) {
                        html += `<div class="event" style="background-color: ${holiday.color}">${holiday.text}</div>`;
                    }
                    if (event) {
                        html += `<div class="event" style="background-color: ${event.color}">${event.text}</div>`;
                    }
                    html += '</div>';
                }
                
                html += '</td>';
                dayCount++;
            }
        }
        html += '</tr>';
    }

    html += '</table></div>';
    return html;
}

function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    let html = '';

    years.forEach(year => {
        html += `
            <div class="year-section">
                <h2 class="year-title">${year}</h2>
                <div class="months-grid">
        `;

        for (let month = 0; month < 12; month++) {
            html += renderMonth(year, month);
        }

        html += '</div></div>';
    });

    calendarEl.innerHTML = html;
    document.querySelectorAll('.event').forEach(adjustTextSize);
}

renderCalendar();

// Adjust text sizes when window is resized
window.addEventListener('resize', () => {
    document.querySelectorAll('.event').forEach(adjustTextSize);
});

// Login
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('passwordScreen').style.display = 'none';
};
document.getElementById('passwordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});
function checkPassword() {
    if (document.getElementById('passwordInput').value === 'tsj') {
        document.getElementById('passwordScreen').style.display = 'none';
        sessionStorage.setItem('isLoggedIn', 'true');
    }
};