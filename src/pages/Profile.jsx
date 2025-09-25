import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}
