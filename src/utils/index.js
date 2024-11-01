export function formatTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getDateString() {
  return new Date().toISOString().split("T")[0];
}

export function timestampToMinutes(timestamp) {
  return Math.round(timestamp / 60 / 1000);
}
