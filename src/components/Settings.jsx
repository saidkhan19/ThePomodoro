import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { isNumeric } from "../utils";
import { updateSettings } from "../utils/localStorage";

const Settings = ({ openModal, onClose, settings, setSettings }) => {
  const [error, setError] = useState();
  const focusInput = useRef();
  const breakInput = useRef();

  const onSave = () => {
    const focusInputValue = focusInput.current.value;
    const breakInputValue = breakInput.current.value;
    if (!isNumeric(focusInputValue) || !isNumeric(breakInputValue)) {
      setError("Please enter an integer.");
      return;
    }

    const focusDuration = parseInt(focusInputValue);
    const breakDuration = parseInt(breakInputValue);
    if (
      focusDuration < 1 ||
      focusDuration > 999 ||
      breakDuration < 1 ||
      breakDuration > 999
    ) {
      setError("Please enter a number in the range 1 to 999.");
      return;
    }

    setSettings({ focusDuration, breakDuration });
    updateSettings({ focusDuration, breakDuration });
    if (error) setError(null);
    onClose();
  };

  useEffect(() => {
    focusInput.current.value = settings.focusDuration;
    breakInput.current.value = settings.breakDuration;
  }, []);

  return (
    <Modal
      title="Settings"
      open={openModal === "settings"}
      onClose={onClose}
      className="settings-content"
    >
      <label className="settings-label">
        <span>Focus duration (min)</span>
        <input ref={focusInput} type="number" min={1} max={999} />
      </label>
      <label className="settings-label">
        <span>Break duration (min)</span>
        <input ref={breakInput} type="number" min={1} max={999} />
      </label>
      {error && <p className="error-text">{error}</p>}
      <button className="btn btn-black" onClick={onSave}>
        Save
      </button>
    </Modal>
  );
};

export default Settings;
