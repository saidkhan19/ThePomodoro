import React from "react";
import Modal from "./Modal";

const About = ({ openModal, onClose }) => {
  return (
    <Modal title="About" open={openModal === "about"} onClose={onClose}>
      <p>
        A Pomodoro App. Was built as a practice project by{" "}
        <a href="https://github.com/saidkhan19" target="_blank">
          Sayid
        </a>
      </p>
    </Modal>
  );
};

export default About;
