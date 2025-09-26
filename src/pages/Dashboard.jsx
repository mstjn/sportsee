import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/");
  };

  const { currentUser, loading } = useContext(AppContext)

   if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
    <Banner />
    <Footer />
    </>
  );
}
