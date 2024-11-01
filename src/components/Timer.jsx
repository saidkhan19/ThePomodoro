import React, { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import { formatTime } from "../utils";

const Timer = ({
  duration,
  startTime,
  infoText,
  isStarted,
  isPaused,
  onTimeout,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  const endTime = startTime + duration;

  const isOver = endTime <= Date.now();
  useEffect(() => (isOver ? onTimeout() : undefined), [isOver]);

  useEffect(() => {
    if (!isStarted || isPaused || isOver) return;

    const interval = setInterval(() => {
      setRemainingTime(endTime - Date.now());
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, isStarted, isOver, endTime]);

  const remainingTimePercentage = ((remainingTime / duration) * 100).toFixed(2);
  const timerText = formatTime(Math.floor(remainingTime / 1000));

  return (
    <div className="timer-container">
      <CircularProgress
        value={remainingTimePercentage}
        text={timerText}
        info={infoText}
      />
    </div>
  );
};

export default Timer;
