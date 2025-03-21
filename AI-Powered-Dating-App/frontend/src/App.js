import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the AI-Powered Dating App</h1>
      <Register />
      <Login />
    </div>
  );
}

export default App;
