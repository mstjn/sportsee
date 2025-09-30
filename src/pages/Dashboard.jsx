import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { currentUser, loading, currentActivity } = useContext(AppContext);
  const [hoverChartKm, setHoverChartKm] = useState(false);
  const [hoverLineMax, setHoverLineMax] = useState(false);

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
  const data2 = [
    {
      day: "Lun",
      max: 185,
      min: 80,
      average: 160,
    },
    {
      day: "Mar",
      max: 165,
      min: 50,
      average: 154,
    },
    {
      day: "Mer",
      max: 125,
      min: 95,
      average: 150,
    },
    {
      day: "Jeu",
      max: 160,
      min: 85,
      average: 140,
    },
    {
      day: "Ven",
      max: 188,
      min: 65,
      average: 165,
    },
    {
      day: "Sam",
      max: 205,
      min: 102,
      average: 188,
    },
    {
      day: "Dim",
      max: 140,
      min: 99,
      average: 110,
    },
  ];
  const firstChart = (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <XAxis dataKey="name" tickLine={false} stroke="#707070" tickMargin={30} />
        <YAxis tickCount={4} tickLine={false} stroke="#707070" tickMargin={10} />
        <Tooltip wrapperStyle={{ width: 100 }} />
        <Legend iconSize={10} height={1} align="left" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: 40, left: 30 }} />
        <CartesianGrid vertical={false} strokeDasharray="2" />
        <Bar
          shape={(props) => {
            const marginBottom = 3;
            return (
              <rect
                x={props.x}
                y={props.y - marginBottom}
                width={props.width}
                height={props.height}
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
    </ResponsiveContainer>
  );

  const secondChart = (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart  data={data2}>
        <XAxis dataKey="day" tickLine={false} stroke="#707070" tickMargin={30} />
        <YAxis tickCount={4} tickLine={false} stroke="#707070" tickMargin={10} />
        <Tooltip wrapperStyle={{ width: 150 }} />
        <Legend iconSize={10} height={1} verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: 40, left: 30 }} />

        <CartesianGrid vertical={false} strokeDasharray="2" />
        <Bar
          shape={(props) => {
            const marginBottom = 3;
            return <rect x={props.x} y={props.y - marginBottom} width={props.width} height={props.height} fill="#FCC1B6" rx={10} ry={10} />;
          }}
          dataKey="min"
          name="Min"
          fill={`#FCC1B6`}
          barSize={20}
          radius={[10, 10, 10, 10]}
          legendType="circle"
        />
        <Bar
          shape={(props) => {
            const marginBottom = 3;
            return <rect x={props.x} y={props.y - marginBottom} width={props.width} height={props.height} fill="#F4320B" rx={10} ry={10} />;
          }}
          name="Max BPM"
          dataKey="max"
          fill={`#F4320B`}
          barSize={20}
          legendType="circle"
          radius={[10, 10, 10, 10]}
        />
        <Line
          dot={{ stroke: "#0B23F4", strokeWidth: 3, fill: "#0B23F4" }}
          type="monotone"
          dataKey="average"
          name="Moyenne"
          stroke={hoverLineMax ? "#0B23F4" : "#F2F3FF"}
          strokeWidth={3}
          legendType="line"
        />
      </BarChart>
    </ResponsiveContainer>
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
          <div className="flex gap-8">
            <div className="bg-white rounded-xl p-10 w-[45%]" onMouseEnter={() => setHoverChartKm(true)} onMouseLeave={() => setHoverChartKm(false)}>
              <div className="flex justify-between items-center mb-2 ">
                <h3 className="font-medium text-2xl text-[#0B23F4]">18km en moyenne</h3>
                <div className="flex gap-3 items-center">
                  <button className="border-1 rounded-xl px-2">&lt;</button>
                  <p className="]">28 mai - 25 juin</p>
                  <button className="border-1 rounded-xl px-2">&gt;</button>
                </div>
              </div>
              <p className="text-xs text-[#707070]">Total des kilomètres 4 dernières semaines</p>
              <br /> {firstChart}
            </div>
            <div className="bg-white rounded-xl p-10 w-[55%]" onMouseEnter={() => setHoverLineMax(true)} onMouseLeave={() => setHoverLineMax(false)}>
              <div className="flex justify-between items-center mb-2 ">
                <h3 className="font-medium text-2xl text-[#F4320B]">163 BPM</h3>
                <div className="flex gap-3 items-center">
                  <button className="border-1 rounded-xl px-2">&lt;</button>
                  <p className="]">28 mai - 04 juin</p>
                  <button className="border-1 rounded-xl px-2">&gt;</button>
                </div>
              </div>
              <p className="text-xs text-[#707070]">Fréquence cardiaque moyenne</p>
              <br /> {secondChart}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
