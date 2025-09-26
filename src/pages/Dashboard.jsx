import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const { currentUser, loading } = useContext(AppContext);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  let nb = parseFloat(currentUser.statistics.totalDistance)
  nb = nb.toFixed(0)

  let date = new Date(currentUser.profile.createdAt)
  date = date.toLocaleDateString("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

  return (
    <>
      <Banner />
      <main className="px-45">
        <div id="background-gradient" className="flex justify-between items-center px-12 py-8 rounded-2xl">
          <figure className="flex items-center gap-5">
            <img
              src={currentUser.profile.profilePicture}
              className="[overflow-clip-margin:unset] object-cover w-[35%] h-26 rounded-lg"
              alt="image de profil"
            />
            <figcaption className="w-65">
              <h2 className="font-medium text-xl">
                {currentUser.profile.firstName} {currentUser.profile.lastName}
              </h2>
              <p className="text-sm text-[#707070]">Membre depuis le {date}</p>
            </figcaption>
          </figure>
          <div className="flex gap-5 items-center">
            <p className="text-sm text-[#707070]">Distance totale parcourue</p>
            <span className="flex items-center gap-5 bg-[#0B23F4] text-white p-6.5 rounded-lg">
              <img src="/OUTLINE.png" alt="" />
              <p className="font-medium text-xl">{nb} km</p>
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

