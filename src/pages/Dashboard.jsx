import { useContext, useMemo, useState } from "react";
import { AppContext } from "../AppContext";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

export default function Dashboard() {
  const { currentUser, loading, currentActivity } = useContext(AppContext);
  const [hoverChartKm, setHoverChartKm] = useState(false);
  const [hoverLineMax, setHoverLineMax] = useState(false);
  const [countKm, setCountKm] = useState(1);
  const [countBPM, setCountBPM] = useState(1);

  // km chart function
  const kmLastWeeks = useMemo(() => {
    const today = new Date();

    const firstDate = new Date();
    firstDate.setDate(today.getDate() - (countKm - 1) * 28);

    const lastDate = new Date();
    lastDate.setDate(today.getDate() - countKm * 28);

    const currentWeekActivities = currentActivity.filter((act) => {
      const actDate = new Date(act.date);
      return actDate >= lastDate && actDate <= firstDate;
    });

    const weeks = [0, 0, 0, 0];

    currentWeekActivities.forEach((act) => {
      const actDate = new Date(act.date);
      const diffDays = Math.floor((firstDate - actDate) / (1000 * 60 * 60 * 24));
      const weekIndex = Math.floor(diffDays / 7);
      if (weekIndex < 4) {
        weeks[3 - weekIndex] += act.distance;
      }
    });

    const validWeeks = weeks.filter((it) => it > 0);
    const total = validWeeks.reduce((acc, it) => acc + it, 0);
    const moy = validWeeks.length > 0 ? Math.floor(total / validWeeks.length) : 0;

    const data = weeks.map((km, i) => ({
      name: `S${i + 1}`,
      km: Math.round(km),
    }));

    const infos = [
      data,
      firstDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      lastDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      moy,
    ];

    return infos;
  }, [currentActivity, countKm]);

  function toMidnight(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  // bpm chart function
  const bpmLastWeeks = useMemo(() => {
    const today = toMidnight(new Date());
    const sunday = new Date();
    const firstDate = toMidnight(new Date());

    for (let i = 0; i < 7; i++) {
      sunday.setDate(today.getDate() - i);

      if (sunday.toLocaleDateString("fr-FR", { weekday: "long" }) === "dimanche") {
        firstDate.setDate(sunday.getDate() - (countBPM - 1) * 7);
        firstDate.setHours(23, 59, 0, 0);
        break;
      }
    }

    const lastDate = toMidnight(new Date());
    const monday = new Date();
    for (let i = 0; i < 7; i++) {
      monday.setDate(today.getDate() - i);
      if (monday.toLocaleDateString("fr-FR", { weekday: "long" }) === "lundi") {
        lastDate.setDate(monday.getDate() - countBPM * 7);
        break;
      }
    }

    const currentWeekActivities = currentActivity.filter((act) => {
      const actDate = new Date(act.date);
      return actDate >= lastDate && actDate <= firstDate;
    });

    const days = [{}, {}, {}, {}, {}, {}, {}];
    const d = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    currentWeekActivities.forEach((act) => {
      const day = new Date(act.date).toLocaleDateString("fr-FR", { weekday: "long" });
      let index;
      for (let i = 0; i < d.length; i++) {
        if (d[i] === day) {
          index = i;
          break;
        }
      }
      days[index] = act.heartRate;
    });

    const total = currentWeekActivities.reduce((acc, it) => acc + (it.heartRate?.average || 0), 0);

    let moy = currentWeekActivities.length ? Math.floor(total / currentWeekActivities.length) : 0;

    const data = days.map((hr, i) => ({
      day: d[i],
      max: Math.round(hr.max),
      min: Math.round(hr.min),
      average: Math.round(hr.average),
    }));

    const infos = [
      data,
      firstDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      lastDate.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      moy,
    ];

    return infos;
  }, [currentActivity, countBPM]);

  if (loading) {
    return <div className="flex w-full h-[100vh] justify-center items-center">
      <p className="text-4xl ">Chargement...</p>
    </div>;
  }

  // circle chart function
  const thisWeek = () => {
    const today = new Date();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const lastWeekActivities = currentActivity.filter((act) => {
      const actDate = new Date(act.date);
      return actDate >= oneWeekAgo && actDate <= today;
    });

    const totalMinutes = lastWeekActivities.reduce((acc, it) => acc + it.duration, 0);
    let totalDistance = lastWeekActivities.reduce((acc, it) => acc + it.distance, 0);
    totalDistance = totalDistance.toFixed(1);
    const data = {
      data: [
        { name: `${lastWeekActivities.length} réalisées`, value: lastWeekActivities.length },
        { name: `${6 - lastWeekActivities.length} restants`, value: 6 - lastWeekActivities.length },
      ],
      distance: totalDistance,
      duree: totalMinutes,
      dateAuj: today.toLocaleDateString("fr-FR"),
      datePrev: oneWeekAgo.toLocaleDateString("fr-FR"),
    };
    return data;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0, padding: 0, color: "#707070" }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: 10, height: 10, backgroundColor: entry.color, borderRadius: "50%" }}></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const CustomLegendPie = ({ payload }) => {
    const leftItems = payload.filter((_, i) => i % 2 === 0);
    const rightItems = payload.filter((_, i) => i % 2 === 1);

    return (
      <div>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none", position: "absolute", top: -300, right: 0 }}>
          {leftItems.map((entry, index) => (
            <li key={`left-${index}`} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 10, height: 10, backgroundColor: entry.color, borderRadius: "50%" }} />
              <span style={{ color: "#707070" }}>{entry.value}</span>
            </li>
          ))}
        </ul>

        <ul style={{ display: "flex", gap: "20px", listStyle: "none", position: "absolute", top: -30, left: -30 }}>
          {rightItems.map((entry, index) => (
            <li key={`right-${index}`} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 10, height: 10, backgroundColor: entry.color, borderRadius: "50%" }} />
              <span style={{ color: "#707070" }}>{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const kmChart = (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={kmLastWeeks[0]}>
        <XAxis dataKey="name" tickLine={false} stroke="#707070" tickMargin={30} />
        <YAxis tickCount={4} tickLine={false} stroke="#707070" tickMargin={10} />
        <Tooltip wrapperStyle={{ width: 100 }} />
        <Legend
          content={<CustomLegend />}
          iconSize={10}
          height={1}
          align="left"
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ paddingTop: 40, left: 30 }}
        />
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

  const bpmChart = (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={bpmLastWeeks[0]}>
        <XAxis dataKey="day" tickLine={false} stroke="#707070" tickMargin={30} />
        <YAxis tickCount={4} tickLine={false} stroke="#707070" tickMargin={10} />
        <Tooltip wrapperStyle={{ width: 150 }} />
        <Legend content={<CustomLegend />} iconSize={10} height={1} verticalAlign="bottom" align="left" wrapperStyle={{ paddingTop: 40, left: 30 }} />

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

  const circleChart = (
    <PieChart width={300} height={300}>
      <Pie legendType="circle" endAngle={-360} data={thisWeek().data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={110}>
        <Cell fill="#0B23F4" />
        <Cell fill="#B6BDFC" />
      </Pie>
      <Legend content={<CustomLegendPie />} iconSize={10} />
    </PieChart>
  );

  let totalDistance = currentActivity.reduce((acc, it) => acc + it.distance, 0);
  totalDistance = totalDistance.toFixed(0);

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
          <figure className="flex items-center gap-10">
            <img
              src={currentUser.profile.profilePicture}
              className="[overflow-clip-margin:unset] object-cover w-[35%] h-34 rounded-lg"
              alt="image de profil"
            />
            <figcaption className="w-70">
              <h2 className="font-medium text-2xl">
                {currentUser.profile.firstName} {currentUser.profile.lastName}
              </h2>
              <p className="text-md text-[#707070]">Membre depuis le {date}</p>
            </figcaption>
          </figure>
          <div className="flex gap-5 items-center">
            <p className="text-sm text-[#707070]">Distance totale parcourue</p>
            <span className="flex items-center gap-5 bg-[#0B23F4] text-white p-6.5 rounded-lg">
              <img src="/OUTLINE.png" alt="" />
              <p className="font-medium text-xl">{totalDistance} km</p>
            </span>
          </div>
        </section>
        <section>
          <h2 className="font-medium text-2xl mb-10">Vos dernières performances</h2>
          <div className="flex gap-8">
            <div className="bg-white rounded-xl p-10 w-[45%]" onMouseEnter={() => setHoverChartKm(true)} onMouseLeave={() => setHoverChartKm(false)}>
              <div className="flex justify-between items-center mb-2 ">
                <h3 className="font-medium text-2xl text-[#0B23F4]">{kmLastWeeks[3]}km en moyenne</h3>
                <div className="flex gap-3 items-center">
                  <button className="border-1 rounded-xl px-2 hover:text-white hover:bg-[#0B23F4]" onClick={() => setCountKm(countKm + 1)}>
                    &lt;
                  </button>
                  <p className="]">
                    {kmLastWeeks[2]} - {kmLastWeeks[1]}
                  </p>
                  <button className="border-1 rounded-xl px-2 hover:text-white hover:bg-[#0B23F4]" onClick={() => setCountKm(countKm - 1)}>
                    &gt;
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#707070]">Total des kilomètres 4 dernières semaines</p>
              <br /> {kmChart}
            </div>
            <div className="bg-white rounded-xl p-10 w-[55%]" onMouseEnter={() => setHoverLineMax(true)} onMouseLeave={() => setHoverLineMax(false)}>
              <div className="flex justify-between items-center mb-2 ">
                <h3 className="font-medium text-2xl text-[#F4320B]">{bpmLastWeeks[3]} BPM</h3>
                <div className="flex gap-3 items-center">
                  <button className="border-1 rounded-xl px-2 hover:text-white hover:bg-[#0B23F4]" onClick={() => setCountBPM(countBPM + 1)}>
                    &lt;
                  </button>
                  <p className="]">
                    {bpmLastWeeks[2]} - {bpmLastWeeks[1]}
                  </p>
                  <button className="border-1 rounded-xl px-2 hover:text-white hover:bg-[#0B23F4]" onClick={() => setCountBPM(countBPM - 1)}>
                    &gt;
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#707070]">Fréquence cardiaque moyenne</p>
              <br /> {bpmChart}
            </div>
          </div>
        </section>
        <section className="mb-15">
          <h2 className="font-medium text-2xl mb-2">Cette semaine</h2>
          <p className=" text-[#707070] font-medium text-xl mb-10">
            Du {thisWeek().datePrev} au {thisWeek().dateAuj}
          </p>
          <div className="flex gap-10">
            <div className="bg-white rounded-lg p-10 w-[45%]">
              <p className="font-semibold text-3xl text-[#0B23F4] flex items-center gap-2 mb-2">
                x{thisWeek().data[0].value} <span className="text-lg text-[#B6BDFC] font-medium">sur objectif de 6</span>
              </p>
              <p className="text-[#707070]">Courses hebdomadaire réalisées</p>
              <div className="flex justify-center">{circleChart}</div>
            </div>
            <div className="flex flex-col gap-5 w-[55%]">
              <div className="bg-white rounded-lg flex flex-col gap-5 p-7">
                <p className="text-[#707070]">Durée d'activité</p>
                <p className="text-[#0B23F4] text-2xl font-medium">
                  {thisWeek().duree} <span className="text-[#B6BDFC] font-medium text-xl">minutes</span>
                </p>
              </div>
              <div className="bg-white rounded-lg flex flex-col gap-5 w-full p-7">
                <p className="text-[#707070]">Distance</p>
                <p className="text-[#F4320B] text-2xl font-medium">
                  {thisWeek().distance} <span className="text-[#FCC1B6] font-medium text-xl">kilomètres</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
