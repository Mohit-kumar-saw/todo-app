import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import {
  Alert,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const TodoInput = () => {
  let location = localStorage.getItem("user");
  location = location ? JSON.parse(location) : { email: '', password: '', isLogin: false, location: '' };
  const weatherData = location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.location}&units=metric&appid=f8d7a0581606e5c15b03c74a510963d8 `;
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [priority, setPriority] = useState("High");
  const [weather, setWeather] = useState("");
  const data = localStorage.getItem("Todo");
  const isLogin = useSelector((state) => state.auth.isLogin);

  const nav = useNavigate();

  const [localData, setLocalData] = useState(data ? JSON.parse(data) : []);

  const handleAddTodo = () => {
    if (!text) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    const obj = {
      todo: text,
      priorities: priority,
    };

    setLocalData((prevLocalData) => [...prevLocalData, obj]);

    localStorage.setItem("Todo", JSON.stringify([...localData, obj]));

    document.getElementsByClassName("text")[0].value = "";
    setText("");
  };

  const handleDeleteTodo = (index) => {
    const updatedData = [...localData];

    updatedData.splice(index, 1);

    setLocalData(updatedData);

    localStorage.setItem("Todo", JSON.stringify(updatedData));
  };

  const handleLogout = () => {
    dispatch(logout());
    nav("/");
  };

  const changePriorityColour = () => {
    const elements = document.querySelectorAll(".todo-priority");
    elements.forEach((element) => {
      if (element.innerHTML === "High") {
        element.style.backgroundColor = "red";
      }
      if (element.innerHTML === "Medium") {
        element.style.backgroundColor = "orange";
      }
      if (element.innerHTML === "Low") {
        element.style.backgroundColor = "rgb(213, 213, 29)";
      }
    });
  };

  useEffect(() => {
    location.isLogin = isLogin;
    localStorage.setItem("user", JSON.stringify(location));

    const getWeatherData = async () => {
      const res = await fetch(url);
      const result = await res.json();
      setWeather(result.weather[0].main);
    };

    getWeatherData();

    changePriorityColour();
    console.log(localData);
    if (!isLogin) {
      nav("/");
    }
    console.log("loggginend", isLogin);
  }, [localData]);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <img src="/pic.jpeg" alt="" />
      </div>
      <h1 className="title">TODO LIST</h1>
      <button className="logout-btn" onClick={() => handleLogout()}>
        Logout
      </button>
      <div className="list">
        <div className="weather">
          {weather ? <p>Today's Weather : {weather}</p> : null}
        </div>
        <div className="todos">
          <div className="todo-input">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              id="text"
              className="text"
              placeholder="Enter Todo"
            />
            <FormControl className="select">
              <InputLabel id="demo-simple-select-label">
                Select Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Select Priority"
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
            <button className="add-todo-btn" onClick={() => handleAddTodo()}>
              Add
            </button>
          </div>
          <div className="list-heading">
            <div className="task-heading">
              <span>Task</span>
            </div>
            <span className="priority-heading">Priority</span>
          </div>
          <div className="list-item">
            {localData.length > 0 ? (
              <h2>
                {localData.map((item, index) => (
                  <div key={index} className="lists">
                    <div className="list-text">
                      <span className="todo-task">{item.todo}</span>
                    </div>
                    <div className="list-btn">
                      <span className="todo-priority">{item.priorities}</span>
                      <button onClick={() => handleDeleteTodo(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </h2>
            ) : null}
            {showAlert && <Alert severity="error">Please Enter Todo.</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
