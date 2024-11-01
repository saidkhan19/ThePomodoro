import React, { useEffect, useState } from "react";
import AddTaskModal from "./AddTask";
import { getTasks, updateTasks } from "../utils/localStorage";
import { getDateString } from "../utils";

const Tasks = () => {
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState(getTasks());

  // Update tasks in local storage every time tasks change
  useEffect(() => {
    updateTasks(tasks);
  }, [tasks]);

  const saveTask = (text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.reduce(
          (val, item) => (val <= item.id ? item.id + 1 : val),
          0
        ),
        createdDate: getDateString(),
        text,
        done: false,
        finishedDate: undefined,
      },
    ]);
  };

  const toggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          done: !item.done,
          finishedDate: item.done ? undefined : getDateString(),
        };
      })
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  return (
    <div className="tasks-container">
      <div className="tasks-menu">
        <h2>My Tasks</h2>
        <button
          className="btn-add"
          title="Add a task"
          onClick={() => setOpenAddTaskModal(true)}
        >
          <span className="sr-only">Add a task</span>
        </button>
      </div>

      {tasks.length ? (
        <ul className="tasks-list">
          {tasks.map((item) => (
            <li
              key={item.id}
              className={`tasks-list-item${item.done ? " checked" : ""}`}
            >
              <span className="tasks-item-text">{item.text}</span>

              <button
                className="tasks-item-btn"
                onClick={() => toggleCompleted(item.id)}
              >
                <span className="sr-only">Mark completed</span>
              </button>

              <div className="delete-btn-container">
                <button
                  title="Delete"
                  className="btn-delete"
                  onClick={() => removeTask(item.id)}
                >
                  <span className="sr-only">Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-tasks">
          <p>No Tasks</p>
        </div>
      )}

      <AddTaskModal
        open={openAddTaskModal}
        onSave={saveTask}
        onClose={() => setOpenAddTaskModal(false)}
      />
    </div>
  );
};

export default Tasks;
