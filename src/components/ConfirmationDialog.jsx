import React from "react";
import Modal from "./Modal";

const ConfirmationDialog = ({ isOpen, onClose, text, onAccept, onReject }) => {
  return (
    <Modal title="Confirm" open={isOpen} onClose={onClose} className="">
      <p className="confirm-text">{text}</p>

      <div className="confirm-controls">
        <button className="btn btn-black" onClick={onAccept}>
          Yes
        </button>
        <button className="btn btn-white" onClick={onReject}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
