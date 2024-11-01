import React from "react";

import LogoImage from "../assets/ThePomodoro.svg";

const Header = ({ setOpenModal }) => {
  return (
    <header className="header">
      <img src={LogoImage} alt="ThePomodoro Logo" className="logo" />
      <nav>
        <menu className="header-menu">
          <li>
            <button
              title="Statistics"
              className="header-btn btn-statistics"
              onClick={() => setOpenModal("statistics")}
            >
              <span className="sr-only">Statistics</span>
            </button>
          </li>
          <li>
            <button
              title="Settings"
              className="header-btn btn-settings"
              onClick={() => setOpenModal("settings")}
            >
              <span className="sr-only">Settings</span>
            </button>
          </li>
          <li>
            <button
              title="About"
              className="header-btn btn-about"
              onClick={() => setOpenModal("about")}
            >
              <span className="sr-only">About</span>
            </button>
          </li>
        </menu>
      </nav>
    </header>
  );
};

export default Header;
