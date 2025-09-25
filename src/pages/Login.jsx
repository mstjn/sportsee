import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("sophiemartin");
  const [password, setPassword] = useState("password123");
  const token = localStorage.getItem("token");

    if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    const response = await login(username, password);
    if (!response) {
      return;
    }
    localStorage.setItem("token", response.token);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Connexion</h1>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}
