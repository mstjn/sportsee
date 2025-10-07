import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e) => {
    const response = await login(username, password);
    if (!response) {
      return;
    }
    localStorage.setItem("token", response.token);
    navigate("/dashboard");
  };

  return (
    <>
      <header className="absolute">
        <h1 className="text-[#0B23F4] text-3xl font-bold">SPORTSEE</h1>
      </header>
      <main className="px-25 flex">
        <div className="translate-y-1/4 mt-5 ml-12.5 bg-white rounded-2xl px-10 pt-10 pb-20 w-[25%] flex flex-col gap-5">
          <h2 className="font-semibold text-[#0B23F4] text-3xl">
            Transformez <br /> vos stats en résultats
          </h2>
          <h3 className="mt-5 font-medium text-2xl">Se connecter</h3>
          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-[#707070]">
                Adresse email
              </label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="border-1  px-2 focus:outline-none rounded-lg h-14 border-[#717171] focus:border-[#5465F7]" type="text" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm text-[#707070] ">
                Mot de passe
              </label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="border-1  px-2 focus:outline-none rounded-lg h-14 border-[#717171] focus:border-[#5465F7]" type="text" />
            </div>

            <button onClick={handleLogin} className="my-5 bg-[#0B23F4] text-white rounded-lg font-medium w-full py-3.5 hover:bg-[#5465F7]">Se connecter</button>
          </form>
          <p className="cursor-pointer text-sm">Mot de passe oublié ?</p>
        </div>
        <img src="/bg-login.png" className="h-[100vh] absolute right-0 w-[56%] object-cover" />
        <p className="z-1 text-[#0B23F4] text-xs rounded-full w-72 p-4 bg-white absolute bottom-8 right-8">
          Analysez vos performances en un clin d'oeil, <br />
          suivez vos progrès et atteignez vos objectifs
        </p>
      </main>
    </>
  );
}
