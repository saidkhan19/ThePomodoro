export function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) ?? [];
}

export function updateTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getSettings() {
  return (
    JSON.parse(localStorage.getItem("settings")) ?? {
      focusDuration: 25,
      breakDuration: 5,
    }
  );
}

export function updateSettings(settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

export function getFocusTime() {
  return JSON.parse(localStorage.getItem("focus-time")) ?? {};
}

export function setFocusTime(focusTime) {
  localStorage.setItem("focus-time", JSON.stringify(focusTime));
}
