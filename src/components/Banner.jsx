import { Link, useNavigate } from "react-router-dom"
const Banner = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/");
      };
    return (
        <header className="flex justify-between">
            <h1 className="text-[#0B23F4] text-3xl font-bold">SPORTSEE</h1>
            <nav> 
                <ul className="flex gap-12.5 bg-white text-sm px-10 py-3.5 rounded-full">
                    <li className="hover:text-[#0B23F4]"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="hover:text-[#0B23F4]"><Link to="/profile">Mon profil</Link></li>
                    <li className="text-[#0B23F4] font-extralight">|</li>
                    <li className="text-[#0B23F4] cursor-pointer" onClick={handleLogout}>Se déconnecter</li>
                </ul>
            </nav>
        </header>
    )
}
export default Banner