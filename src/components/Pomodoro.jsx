import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

import bellRing from "../assets/sound/bell-ringing.mp3";
import { getFocusTime, setFocusTime } from "../utils/localStorage";
import { getDateString } from "../utils";
import ConfirmationDialog from "./ConfirmationDialog";

const addToFocusTime = (timerStartTime) => {
  const durationFocused = Date.now() - timerStartTime;

  const focusTime = getFocusTime();
  const today = getDateString();

  if (focusTime[today]) focusTime[today] += durationFocused;
  else focusTime[today] = durationFocused;

  setFocusTime(focusTime);
};

const Pomodoro = ({ settings }) => {
  const [mode, setMode] = useState("focus");
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    onClose: () => {},
    text: "",
    onAccept: () => {},
    onReject: () => {},
  });
  const audio = useRef(new Audio(bellRing));

  // store a timer startTime
  const [timerStartTime, setTimerStartTime] = useState();
  const [timerIsPaused, setTimerIsPaused] = useState(false);

  const [pauseStartTime, setPauseStartTime] = useState();

  // if startTime is set, then the timer is running
  const timerIsRunning = Boolean(timerStartTime);

  const { focusDuration, breakDuration } = settings;
  const focusDurationMs = focusDuration * 60 * 1000;
  const breakDuraitonMs = breakDuration * 60 * 1000;

  const toggleTimer = () => {
    if (timerIsRunning) {
      setTimerIsPaused((isPaused) => !isPaused);
    } else {
      setTimerStartTime(Date.now());
    }
  };

  const onTimeout = () => {
    audio.current.play();
    setTimerStartTime(undefined);
    setMode((mode) => (mode === "focus" ? "break" : "focus"));
    setPauseStartTime(undefined);

    if (mode === "focus") {
      addToFocusTime(timerStartTime);
    }
  };

  const onSkip = () => {
    setTimerStartTime(undefined);
    setTimerIsPaused(false);
    setPauseStartTime(undefined);

    if (mode === "focus") {
      addToFocusTime(timerStartTime);
    }
  };

  const changeMode = (toMode) => {
    if (timerIsRunning) {
      const onClose = () =>
        setConfirmConfig((prevConfig) => ({ ...prevConfig, isOpen: false }));

      setConfirmConfig({
        isOpen: true,
        onClose,
        text: "Would you like to terminate the timer?",
        onAccept: () => {
          onSkip();
          setMode(toMode);
          onClose();
        },
        onReject: () => {
          onClose();
        },
      });
    } else {
      setMode(toMode);
    }
  };

  useEffect(() => {
    if (!timerIsRunning) return;

    if (timerIsPaused) {
      setPauseStartTime(Date.now());
    } else if (pauseStartTime) {
      setTimerStartTime(
        (prevStartTime) => prevStartTime + Date.now() - pauseStartTime
      );
    }
  }, [timerIsPaused, timerIsRunning]);

  return (
    <div className="pomodoro-container">
      <menu className="mode-controls">
        <li>
          <button
            className={`btn btn-mode ${
              mode === "focus" ? "btn-black" : "btn-white"
            }`}
            onClick={() => changeMode("focus")}
          >
            Focus
          </button>
        </li>
        <li>
          <button
            className={`btn btn-mode ${
              mode === "break" ? "btn-black" : "btn-white"
            }`}
            onClick={() => changeMode("break")}
          >
            Break
          </button>
        </li>
      </menu>

      {mode === "focus" && (
        <Timer
          key={`${timerIsRunning}${focusDuration}`}
          startTime={timerStartTime}
          duration={focusDurationMs}
          infoText={
            timerIsRunning ? (timerIsPaused ? "Paused" : "Focus") : "Let's go"
          }
          isStarted={timerIsRunning}
          isPaused={timerIsPaused}
          onTimeout={onTimeout}
        />
      )}
      {mode === "break" && (
        <Timer
          key={`${timerIsRunning}${breakDuration}`}
          startTime={timerStartTime}
          duration={breakDuraitonMs}
          infoText={
            timerIsRunning ? (timerIsPaused ? "Paused" : "Break") : "Break"
          }
          isStarted={timerIsRunning}
          isPaused={timerIsPaused}
          onTimeout={onTimeout}
        />
      )}

      <menu className="timer-controls">
        <li>
          <button className="btn btn-timer btn-black" onClick={toggleTimer}>
            {!timerIsRunning && "Start"}
            {timerIsRunning && (timerIsPaused ? "Continue" : "Pause")}
          </button>
        </li>
        {timerIsRunning && (
          <li>
            <button className="btn-skip" title="Skip" onClick={onSkip}>
              <span className="sr-only">Skip</span>
            </button>
          </li>
        )}
      </menu>

      <ConfirmationDialog {...confirmConfig} />
    </div>
  );
};

export default Pomodoro;
