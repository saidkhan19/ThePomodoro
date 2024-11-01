import React, { useState } from "react";
import Modal from "./Modal";
import { getFocusTime, getTasks } from "../utils/localStorage";
import { getDateString, timestampToMinutes } from "../utils";

const Statistics = ({ openModal, onClose, settings }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const focusTime = getFocusTime();
  const tasks = getTasks();
  const today = getDateString();

  let timeFocusedMinutes = 0;
  let tasksDone = 0;

  if (selectedPeriod === "today") {
    if (focusTime[today])
      timeFocusedMinutes = timestampToMinutes(focusTime[today]);

    for (let item of tasks) {
      if (item.finishedDate && item.finishedDate === today) tasksDone += 1;
    }
  } else if (selectedPeriod === "week" || selectedPeriod === "month") {
    const daysAgo = selectedPeriod === "week" ? 7 : 30;

    const dateStart = new Date(today);
    dateStart.setDate(dateStart.getDate() - daysAgo);

    for (const [key, value] of Object.entries(focusTime)) {
      if (dateStart <= new Date(key))
        timeFocusedMinutes += timestampToMinutes(value);
    }

    for (let item of tasks) {
      if (item.finishedDate && dateStart <= new Date(item.finishedDate))
        tasksDone += 1;
    }
  }

  const timeFocused = (timeFocusedMinutes / 60).toFixed(1);
  const pomodorosFinished = (
    timeFocusedMinutes / settings.focusDuration
  ).toFixed(1);

  const onSelectChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <Modal
      title="Statistics"
      open={openModal === "statistics"}
      onClose={onClose}
      className="statistics-content"
    >
      <select onChange={onSelectChange} value={selectedPeriod}>
        <option value="today">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
      </select>

      <table>
        <tbody>
          <tr>
            <td>Time Focused</td>
            <td>{timeFocused}h</td>
          </tr>
          <tr>
            <td>Pomodoros Finished</td>
            <td>{pomodorosFinished}</td>
          </tr>
          <tr>
            <td>Tasks Done</td>
            <td>{tasksDone}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default Statistics;
