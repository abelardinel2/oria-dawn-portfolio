// Update date and time every second
function updateDateTime() {
  const dateTime = document.getElementById('dateTime');
  if (dateTime) {
    const now = new Date();
    dateTime.textContent = `Current Time: ${now.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}`;
  }
}
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call