import { useState } from "react";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pomodoro from "./components/Pomodoro";
import Tasks from "./components/Tasks";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";
import About from "./components/About";
import { getSettings } from "./utils/localStorage";

function App() {
  const [openModal, setOpenModal] = useState();
  const [settings, setSettings] = useState(getSettings());

  const onCloseModal = () => {
    setOpenModal(undefined);
  };

  return (
    <>
      <h1 className="sr-only">The Pomodoro App</h1>
      <Header setOpenModal={setOpenModal} />
      <main>
        <Pomodoro settings={settings} />
        <Tasks />
      </main>
      <Footer />

      <Statistics
        openModal={openModal}
        onClose={onCloseModal}
        settings={settings}
      />
      <Settings
        openModal={openModal}
        onClose={onCloseModal}
        settings={settings}
        setSettings={setSettings}
      />
      <About openModal={openModal} onClose={onCloseModal} />
    </>
  );
}

export default App;
