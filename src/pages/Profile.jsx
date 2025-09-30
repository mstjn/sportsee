import { AppContext } from "../AppContext";
import { useContext } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Profile() {
  const { currentUser, loading } = useContext(AppContext);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  let date = new Date(currentUser.profile.createdAt);
  date = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            <p className="text-lg">Taille: {currentUser.profile.height}</p>
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
                27h <span className="text-lg text-[#B6BDFC]">15min</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Temps total couru</p>
              <p className="text-2xl">
                27h <span className="text-lg text-[#B6BDFC]">15min</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Temps total couru</p>
              <p className="text-2xl">
                27h <span className="text-lg text-[#B6BDFC]">15min</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Temps total couru</p>
              <p className="text-2xl">
                27h <span className="text-lg text-[#B6BDFC]">15min</span>
              </p>
            </div>
            <div className="bg-[#0B23F4] text-white flex flex-col gap-4 rounded-lg w-[45%] px-7 py-4">
              <p>Temps total couru</p>
              <p className="text-2xl">
                27h <span className="text-lg text-[#B6BDFC]">15min</span>
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
