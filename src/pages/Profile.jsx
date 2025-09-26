import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useContext } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Profile() {
  

  

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
