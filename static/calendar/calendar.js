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
                const event = events[date];
                
                let classes = [];
                if (isToday(year, month, dayCount)) {
                    classes.push('today');
                } else if (isPastDate(year, month, dayCount)) {
                    classes.push('past-date');
                }
                
                html += `<td class="${classes.join(' ')}">`;
                html += `<div class="date">${dayCount}</div>`;
                
                if (event) {
                    html += '<div class="event-container">';
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