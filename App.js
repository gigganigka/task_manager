import { useState } from "react";
import "./TaskManager.css";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (!taskText.trim()) return alert("Task cannot be empty!");
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false, editing: false }]);
    setTaskText("");
  };

  const updateTask = (id, changes) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...changes } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    alert("Task deleted!");
  };


  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="task-form">
        <input value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="New task..." />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

function Task({ task, updateTask, deleteTask}) {
  const [newText, setNewText] = useState(task.text);

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {task.editing ? (
        <input value={newText} onChange={(e) => setNewText(e.target.value)} />
      ) : (
        <span>{task.text}</span>
      )}
      <div className="buttons">
        {task.editing ? (
          <button onClick={() => updateTask(task.id, { text: newText, editing: false })}>Save</button>
        ) : (
          <button onClick={() => updateTask(task.id, { editing: true })}>Edit</button>
        )}
        <button onClick={() => updateTask(task.id, { completed: !task.completed })}>
          {task.completed ? "Completed" : "Complete"}
        </button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>      
        </div>
    </li>
  );
}

export default TaskManager;
