import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  // Load tasks from local storage when initializing state
  const getInitialTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  };

  const getInitialCompletedTasks = () => {
    const savedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];
    return savedCompletedTasks;
  };

  const [tasks, setTasks] = useState(getInitialTasks);
  const [completedTasks, setCompletedTasks] = useState(
    getInitialCompletedTasks
  );

  const addTask = (task) => {
    const newTasks = [
      ...tasks,
      { text: task, date: new Date(), completed: false },
    ];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    const [completedTask] = newTasks.splice(index, 1);
    completedTask.completed = true;
    completedTask.completedDate = new Date();
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask]);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify([...completedTasks, completedTask])
    );
  };

  const deleteTask = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <div className="tasks-container">
        <div className="active">
          <h2>Active Tasks</h2>
          <div className="tasks-active">
            {tasks.length === 0 ? (
              <h5>Add Tasks to show...</h5>
            ) : (
              <TaskList tasks={tasks} completeTask={completeTask} />
            )}
          </div>
        </div>
        <div className="completed">
          <h2>Completed Tasks</h2>
          <div className="tasks-completed">
            {completedTasks.length === 0 ? (
              <h5> Tasks not yet completed to show...</h5>
            ) : (
              <TaskList
                tasks={completedTasks}
                deleteTask={deleteTask}
                completed
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
