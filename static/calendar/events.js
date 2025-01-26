const event_color_personal = 'rgb(255, 243, 198)'
const event_color_professional = 'rgb(181, 251, 191)'
const event_color_social_gathering = 'rgb(219, 198, 255)'
const event_color_family_gathering = 'rgb(198, 231, 255)'
const event_color_holiday = 'rgb(253, 228, 240)'
const event_color_spring = 'rgb(128, 251, 191)' 
const event_color_summer = 'rgb(255, 149, 149)'
const event_color_fall = 'rgb(251, 203, 139)'
const event_color_winter = 'rgb(129, 184, 251)'
const event_color_bday = 'rgb(134, 138, 253)'

const events = {
    // 2025
    // Personal
    '2025-02-15': { text: "Ski<br><br>", color: event_color_personal },
    '2025-02-16': { text: "Trip<br><br>", color: event_color_personal },
    '2025-04-12': { text: "Monument Ave 10k", color: event_color_personal },
    '2025-08-30': { text: "Beach<br><br>", color: event_color_personal },
    '2025-08-31': { text: "Trip<br><br>", color: event_color_personal },
    '2025-09-20': { text: "Triathlon", color: event_color_personal },
    '2025-09-27': { text: "Camping", color: event_color_personal },
    '2025-09-28': { text: "Trip<br><br>", color: event_color_personal },
    // Social Gatherings
    '2025-01-26': { text: "Aus Open", color: event_color_social_gathering },
    '2025-02-09': { text: "Super Bowl", color: event_color_social_gathering },
    '2025-02-14': { text: "Valentines Day", color: event_color_social_gathering },
    '2025-03-15': { text: "Shamrock the Block", color: event_color_social_gathering },
    '2025-03-22': { text: "March Madness", color: event_color_social_gathering },
    '2025-05-05': { text: "Cinco de Mayo", color: event_color_social_gathering },
    '2025-05-17': { text: "RiverRock", color: event_color_social_gathering },
    '2025-05-26': { text: "Memorial Day", color: event_color_social_gathering },
    '2025-06-08': { text: "French Open", color: event_color_social_gathering },
    '2025-06-14': { text: "NBA Finals", color: event_color_social_gathering },
    '2025-07-04': { text: "Independence Day", color: event_color_social_gathering },
    '2025-07-11': { text: "Bday<br><br>", color: event_color_bday },
    '2025-07-13': { text: "Wimbledon", color: event_color_social_gathering },
    '2025-09-01': { text: "Labor Day", color: event_color_social_gathering },
    '2025-09-07': { text: "US Open", color: event_color_social_gathering },
    '2025-09-13': { text: "State Fair", color: event_color_social_gathering },
    '2025-09-21': { text: "Football Tailgait", color: event_color_social_gathering },
    '2025-10-25': { text: "World Series", color: event_color_social_gathering },
    '2025-10-31': { text: "Halloween", color: event_color_social_gathering },
    '2025-12-31': { text: "NYE<br><br>", color: event_color_social_gathering },
    // Family Gatherings
    '2025-04-20': { text: "Easter<br><br>", color: event_color_family_gathering },
    '2025-11-27': { text: "Thanksgiving", color: event_color_family_gathering },
    '2025-11-28': { text: "..<br><br>", color: event_color_family_gathering },
    '2025-12-24': { text: "Christmas Eve", color: event_color_family_gathering },
    '2025-12-25': { text: "Christmas Day", color: event_color_family_gathering },
    // Professional
    '2025-02-23': { text: "Baseball Done", color: event_color_professional },
    '2025-03-16': { text: "Monroe Done", color: event_color_professional },
    '2025-04-21': { text: "Work Perf Eval", color: event_color_professional },
    '2025-06-29': { text: "Stata Done", color: event_color_professional },
    '2025-10-20': { text: "Work Perf Eval", color: event_color_professional },
    '2025-11-16': { text: "Halsey Done", color: event_color_professional },
    // Holidays
    '2025-01-01': { text: "New Year's Day", color: event_color_holiday },
    '2025-01-20': { text: "Martin Luther King Jr. Day", color: event_color_holiday },
    '2025-02-17': { text: "Presidents Day", color: event_color_holiday },
    '2025-06-19': { text: "Juneteenth", color: event_color_holiday },
    '2025-10-13': { text: "Columbus Day", color: event_color_holiday },
    '2025-11-11': { text: "Veterans Day", color: event_color_holiday },
    // Seasons
    '2025-03-01': { text: "Spring Starts", color: event_color_spring },
    '2025-06-01': { text: "Summer Starts", color: event_color_summer },
    '2025-09-02': { text: "Fall Starts", color: event_color_fall },
    '2025-12-01': { text: "Winter Starts", color: event_color_winter },
    // Breaks
    '2025-07-19': { text: "Summer<br>", color: event_color_summer },
    '2025-07-20': { text: "Vaca<br><br>", color: event_color_summer },
    '2025-07-21': { text: "..<br><br>", color: event_color_summer },
    '2025-07-22': { text: "...<br><br>", color: event_color_summer },
    '2025-07-23': { text: "...<br><br>", color: event_color_summer },
    '2025-07-24': { text: "...<br><br>", color: event_color_summer },
    '2025-07-25': { text: "...<br><br>", color: event_color_summer },
    '2025-07-26': { text: "...<br><br>", color: event_color_summer },
    '2025-07-27': { text: "...<br><br>", color: event_color_summer },
    '2025-04-26': { text: "Spring<br><br>", color: event_color_spring },
    '2025-04-27': { text: "Break<br><br>", color: event_color_spring },
    '2025-04-28': { text: "..<br><br>", color: event_color_spring },
    '2025-04-29': { text: "..<br><br>", color: event_color_spring },
    '2025-04-30': { text: "...<br><br>", color: event_color_spring },
    '2025-05-01': { text: "...<br><br>", color: event_color_spring },
    '2025-05-02': { text: "...<br><br>", color: event_color_spring },
    '2025-05-03': { text: "...<br><br>", color: event_color_spring },
    '2025-05-04': { text: "...<br><br>", color: event_color_spring },
    '2025-10-11': { text: "Fall<br><br>", color: event_color_fall },
    '2025-10-12': { text: "Break<br><br>", color: event_color_fall },
    '2025-10-14': { text: "...<br><br>", color: event_color_fall },
    '2025-10-15': { text: "...<br><br>", color: event_color_fall },
    '2025-10-16': { text: "...<br><br>", color: event_color_fall },
    '2025-10-17': { text: "...<br><br>", color: event_color_fall },
    '2025-10-18': { text: "...<br><br>", color: event_color_fall },
    '2025-10-19': { text: "...<br><br>", color: event_color_fall },
    '2025-12-20': { text: "Winter<br><br>", color: event_color_winter },
    '2025-12-21': { text: "Break<br><br>", color: event_color_winter },
    '2025-12-22': { text: "...<br><br>", color: event_color_winter },
    '2025-12-23': { text: "...<br><br>", color: event_color_winter },
    '2025-12-26': { text: "...<br><br>", color: event_color_winter },
    '2025-12-27': { text: "...<br><br>", color: event_color_winter },
    '2025-12-28': { text: "...<br><br>", color: event_color_winter },


    // 2026
    // Personal
    '2026-04-18': { text: "Monument Ave 10k", color: event_color_personal },
    '2026-09-19': { text: "Triathlon", color: event_color_personal },
    // Social Gatherings
    '2026-03-14': { text: "Shamrock the Block", color: event_color_social_gathering },
    '2026-05-05': { text: "Cinco de Mayo", color: event_color_social_gathering },
    '2026-05-16': { text: "RiverRock", color: event_color_social_gathering },
    '2026-05-25': { text: "Memorial Day", color: event_color_social_gathering },
    '2026-07-04': { text: "Independence Day", color: event_color_social_gathering },
    '2026-07-11': { text: "Bday<br><br>", color: event_color_bday },
    '2026-09-07': { text: "Labor Day", color: event_color_social_gathering },
    '2026-10-31': { text: "Halloween", color: event_color_social_gathering },
    '2026-12-31': { text: "NYE<br><br>", color: event_color_social_gathering },
    // Family Gatherings
    '2026-04-20': { text: "Easter", color: event_color_family_gathering },
    '2026-11-26': { text: "Thanksgiving", color: event_color_family_gathering },
    '2026-11-27': { text: "...<br><br>", color: event_color_family_gathering },
    '2026-12-24': { text: "Christmas Eve", color: event_color_family_gathering },
    '2026-12-25': { text: "Christmas Day", color: event_color_family_gathering },
    // Professional
    '2026-04-20': { text: "Work Perf Eval", color: event_color_professional },
    '2026-06-28': { text: "AutoML Launch", color: event_color_professional },
    '2026-10-19': { text: "Work Perf Eval", color: event_color_professional },
    // Holidays
    '2026-01-01': { text: "New Year's Day", color: event_color_holiday },
    '2026-01-19': { text: "Martin Luther King Jr. Day", color: event_color_holiday },
    '2026-02-16': { text: "Presidents Day", color: event_color_holiday },
    '2026-06-19': { text: "Juneteenth", color: event_color_holiday },
    '2026-10-12': { text: "Columbus Day", color: event_color_holiday },
    '2026-11-11': { text: "Veterans Day", color: event_color_holiday },
    // Seasons
    '2026-03-01': { text: "Spring Starts", color: event_color_spring },
    '2026-06-01': { text: "Summer Starts", color: event_color_summer },
    '2026-09-01': { text: "Fall Starts", color: event_color_fall },
    '2026-12-01': { text: "Winter Starts", color: event_color_winter },
    // Breaks
};