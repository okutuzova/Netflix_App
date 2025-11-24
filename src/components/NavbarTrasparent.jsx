import { useNavigate } from "react-router-dom";
import logoNetflix from "../assets/Netflix-Logo.png";

export default function NavbarTransparent() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      {/* Sinistra: Logo con effetto hover */}
      <div className="flex items-center">
        <img
          src={logoNetflix}
          alt="NETFLIX"
          className="h-10 md:h-16 object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Centro: Bottoni di navigazione */}
      <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium">
        <button
          onClick={() => navigate("/movies")}
          className="text-white hover:text-red-600 transition-colors duration-200"
        >
          Movies
        </button>
        <button
          onClick={() => navigate("/series")}
          className="text-white hover:text-red-600 transition-colors duration-200"
        >
          TV Series
        </button>
        <button
          onClick={() => navigate("/favorites")}
          className="text-white hover:text-red-600 transition-colors duration-200"
        >
          My List
        </button>
      </div>

      {/* Destra: spazio vuoto per bilanciare */}
      <div className="w-20 md:w-24"></div>
    </nav>
  );
}