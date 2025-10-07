import { AppContext } from "../AppContext";
import { useContext } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Profile() {
  const { currentUser, loading, currentActivity } = useContext(AppContext);

  if (loading || !currentUser || !currentUser.statistics || !currentActivity) {
    return <p>Chargement en cours...</p>;
  }

  let date = new Date(currentUser.profile.createdAt);
  date = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatCmToMeterString = (cm) => {
    if (cm == null || isNaN(Number(cm))) return "";
    const n = Math.round(Number(cm));
    const sign = n < 0 ? "-" : "";
    const abs = Math.abs(n);
    const m = Math.floor(abs / 100);
    const r = abs % 100;
    return `${sign}${m}m${String(r).padStart(2, "0")}`;
  };


  const totalCal = currentActivity?.reduce((acc, it) => acc + it.caloriesBurned, 0) ?? 0;
  const diffMs = new Date().getTime() - new Date(currentUser.profile.createdAt).getTime();
  const count = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const restDays = (count - currentActivity.length + 1) || 0;
  let totalDistance = currentActivity.reduce((acc, it) => acc + it.distance, 0);
  totalDistance = totalDistance.toFixed(0);
  const totalMinutes = currentActivity.reduce((acc, it) => acc + it.duration, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const sessions = currentActivity.length

  return (
    <>
      <Banner />
      <main className="pl-37.5 pr-25 flex gap-15">
        <section className="flex flex-col gap-5 w-[50%]">
          <figure className="flex items-center gap-10 bg-white px-12 py-6 rounded-2xl">
            <img
              src={currentUser.profile.profilePicture}
              className="[overflow-clip-margin:unset] object-cover w-[18.1%] h-34 rounded-lg"
              alt="image de profil"
            />
            <figcaption className="w-70">
              <h2 className="font-medium text-2xl">
                {currentUser.profile.firstName} {currentUser.profile.lastName}
              </h2>
              <p className="text-md text-[#707070]">Membre depuis le {date}</p>
            </figcaption>
          </figure>
          <div className="bg-white rounded-lg flex flex-col gap-4 px-12 py-8 text-[#707070]">
            <h2 className="text-black font-medium text-2xl">Votre profil</h2>
            <hr className="border-0 h-[1px] bg-[#E7E7E7]" />
            <p className="text-lg">Âge: {currentUser.profile.age}</p>
            <p className="text-lg">Genre: Femme</p>
            <p className="text-lg">Taille: {formatCmToMeterString(currentUser.profile.height)}</p>
            <p className="text-lg">Poids: {currentUser.profile.weight}kg</p>
          </div>
        </section>
        <section className="w-[50%]">
          <h2 className="text-2xl">Vos statistiques</h2>
          <p className="text-[#707070]">depuis le {date}</p>
          <div className="flex flex-wrap gap-5 gap-y-5 mt-7">
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Temps total couru</p>
              <p className="text-2xl">
                {hours}h <span className="text-lg text-[#B6BDFC]">{minutes}min</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Calories brûlées</p>
              <p className="text-2xl">
                {totalCal} <span className="text-lg text-[#B6BDFC]">cal</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Distance totale parcourue</p>
              <p className="text-2xl">
                {totalDistance} <span className="text-lg text-[#B6BDFC]">km</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Nombre de jours de repos</p>
              <p className="text-2xl">
                {restDays} <span className="text-lg text-[#B6BDFC]">jours</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Nombre de sessions</p>
              <p className="text-2xl">
                {sessions} <span className="text-lg text-[#B6BDFC]">sessions</span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
