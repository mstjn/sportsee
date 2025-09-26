import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, CartesianAxis } from "recharts";

export default function Dashboard() {
  const { currentUser, loading, currentActivity } = useContext(AppContext);
  const [hoverChartKm, setHoverChartKm] = useState(false);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  console.log(currentActivity);

  const data = [
    {
      name: "S1",
      km: 32,
    },
    {
      name: "S2",
      km: 65,
    },
    {
      name: "S3",
      km: 25,
    },
    {
      name: "S4",
      km: 60,
    },
  ];
  const renderBarChart = (
    <BarChart width={530} height={500} data={data}>
      <XAxis dataKey="name" tickLine={false} stroke="#707070" tickMargin={30} />
      <YAxis tickCount={4} tickLine={false} stroke="#707070" tickMargin={10} />
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
      <Legend
      iconType="circle"
        width={100}
        wrapperStyle={{ bottom: 0, left: 0, lineHeight: "70px" }}
      />
      <CartesianGrid  vertical={false} strokeDasharray="2"/>
      <Bar
        shape={(props) => {
          const marginBottom = 5;
          return (
            <rect
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height - marginBottom}
              fill={hoverChartKm ? "#0B23F4" : "#B6BDFC"}
              rx={10}
              ry={10}
            />
          );
        }}
        dataKey="km"
        fill={`${hoverChartKm ? "#0B23F4" : "#B6BDFC"}`}
        barSize={20}
        radius={[10, 10, 10, 10]}
      />
    </BarChart>
  );

  let nb = parseFloat(currentUser.statistics.totalDistance);
  nb = nb.toFixed(0);

  let date = new Date(currentUser.profile.createdAt);
  date = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Banner />
      <main className="px-45 flex flex-col gap-25">
        <section id="background-gradient" className="flex justify-between items-center px-12 py-8 rounded-2xl">
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
        </section>
        <section>
          <h2 className="font-medium text-xl mb-10">Vos dernières performances</h2>
          <div className="flex justify-between">
            <div className="bg-white rounded-xl p-10" onMouseEnter={() => setHoverChartKm(true)} onMouseLeave={() => setHoverChartKm(false)}>
              <div className="flex justify-between items-center mb-2 ">
                <h3 className="font-medium text-2xl text-[#0B23F4]">18km en moyenne</h3>
                <div className="flex gap-3 items-center">
                  <button className="border-1 rounded-xl px-2">&lt;</button>
                  <p className="]">28 mai - 25 juin</p>
                  <button className="border-1 rounded-xl px-2">&gt;</button>
                </div>
              </div>
              <p className="text-xs text-[#707070]">Total des kilomètres 4 dernières semaines</p>
              <br /> {renderBarChart}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
