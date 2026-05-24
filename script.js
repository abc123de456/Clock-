// Define time zones with their UTC offsets and city names
const timeZones = {
    'newyork': { name: 'New York', offset: -5 },      // EST
    'losangeles': { name: 'Los Angeles', offset: -8 }, // PST
    'toronto': { name: 'Toronto', offset: -5 },        // EST
    'london': { name: 'London', offset: 0 },           // GMT
    'paris': { name: 'Paris', offset: 1 },             // CET
    'dubai': { name: 'Dubai', offset: 4 },             // GST
    'mumbai': { name: 'Mumbai', offset: 5.5 },         // IST
    'singapore': { name: 'Singapore', offset: 8 },     // SGT
    'hongkong': { name: 'Hong Kong', offset: 8 },      // HKT
    'tokyo': { name: 'Tokyo', offset: 9 },             // JST
    'sydney': { name: 'Sydney', offset: 11 },          // AEDT
    'saopaulo': { name: 'São Paulo', offset: -3 }      // BRT
};

// Function to format time with leading zeros
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to format date
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to get time for a specific timezone
function getTimeForZone(offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const zoneDate = new Date(utc + 3600000 * offset);
    return zoneDate;
}

// Function to update a single clock
function updateClock(zoneKey, zoneData) {
    const zoneDate = getTimeForZone(zoneData.offset);
    
    const hours = zoneDate.getHours();
    const minutes = zoneDate.getMinutes();
    const seconds = zoneDate.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds);
    const formattedDate = formatDate(zoneDate);
    
    const timeElement = document.getElementById(`time-${zoneKey}`);
    const dateElement = document.getElementById(`date-${zoneKey}`);
    
    if (timeElement) timeElement.textContent = formattedTime;
    if (dateElement) dateElement.textContent = formattedDate;
}

// Function to update all clocks
function updateAllClocks() {
    Object.keys(timeZones).forEach(zoneKey => {
        updateClock(zoneKey, timeZones[zoneKey]);
    });
}

// Update clocks immediately on page load
updateAllClocks();

// Update clocks every 1000ms (1 second)
setInterval(updateAllClocks, 1000);
