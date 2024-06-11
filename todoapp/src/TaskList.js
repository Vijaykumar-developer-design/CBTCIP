import React from "react";

function TaskList({ tasks, completeTask, deleteTask, completed }) {
  return (
    <ul className="list-items">
      {tasks.map((task, index) => (
        <li className={completed && "tasks-completed-item"} key={index}>
          <span className={completed ? "completed-task" : "in-completed-task"}>
            {task.text}
          </span>
          <span className="date-details">
            {new Date(task.date).toLocaleString()}
          </span>
          {!completed && (
            <button onClick={() => completeTask(index)}>Complete</button>
          )}
          {completed && (
            <>
              <span className="date-details">
                Completed on: {new Date(task.completedDate).toLocaleString()}
              </span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
