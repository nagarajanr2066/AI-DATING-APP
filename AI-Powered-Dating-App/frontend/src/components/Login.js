import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 6) {
      setErrorMessage(
        "Username must be at least 3 characters and password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      alert(`Login successful! Token: ${data.token}`);
      setLoading(false);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default Login;
