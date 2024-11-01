import React, { useEffect, useRef } from "react";
import Modal from "./Modal";

const AddTaskModal = ({ open, onSave, onClose }) => {
  const input = useRef();

  const saveTask = () => {
    const value = input.current.value.trim();
    if (value === "") return;

    input.current.value = "";
    onSave(value);
    onClose();
  };

  useEffect(() => {
    if (open) input.current.focus();
  }, [open]);

  return (
    <Modal
      title="Add a task"
      open={open}
      onClose={onClose}
      className="add-task-content"
    >
      <input
        type="text"
        ref={input}
        placeholder="New Task"
        onKeyDown={(e) => (e.key === "Enter" ? saveTask() : undefined)}
      />
      <button className="btn btn-black" onClick={saveTask}>
        Save
      </button>
    </Modal>
  );
};

export default AddTaskModal;
