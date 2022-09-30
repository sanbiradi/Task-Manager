import { useState, useEffect } from "react";
import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./index.css";
import Footer from "./components/Footer";
import TaskDetails from "./components/TaskDetails";
import {
  Routes,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import About from "./components/About";

/*
npm run build
npm i -g serve
serve -s build -p 8000

to start local json server we have to run a command
npm i json server

Make changes in package.json file in debug section and save the file
//we just create our command server
    "server":"json-server --watch db.json --port 5000"
//lunch the json server//local server
npm run server


//react router
npm i react-router

*/
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //fetch tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/Tasks");
    const data = await res.json();
    return data;
  };

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/Tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const tasktoToggle = await fetchTask(id);
    const updTask = { ...tasktoToggle, reminder: !tasktoToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    console.log(data);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  //AddTask
  const addTask = async (task) => {
    await fetch(`http://localhost:5000/Tasks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const res = await fetch("http://localhost:5000/Tasks");
    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 100) + 1;
    // console.log(id);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks to show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
