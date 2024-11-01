import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose, title, className = "" }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <>
      <dialog
        ref={dialog}
        className="modal-dialog"
        onClose={onClose}
        onClick={(e) => (e.target === dialog.current ? onClose() : undefined)}
      >
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
            <button title="Close" className="btn-close-modal" onClick={onClose}>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className={`modal-content ${className}`}>{children}</div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
