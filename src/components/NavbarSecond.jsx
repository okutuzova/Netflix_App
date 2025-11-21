// src/components/NavbarSecond.jsx

import { useNavigate } from "react-router-dom";
import logoNetflix from "../assets/Netflix-Logo.png";

export default function NavbarSecond() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-80 px-6 py-4 flex items-center justify-between">
      {/* Sinistra: Logo */}
      <div className="flex items-center">
        <img
          src={logoNetflix}
          alt="NETFLIX"
          className="h-8 md:h-10 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Centro: Bottoni di navigazione – veramente centrati */}
      <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium text-gray-300">
        <button
          onClick={() => navigate("/movies")}
          className="hover:text-white transition duration-200"
        >
          Movies
        </button>
        <button
          onClick={() => navigate("/series")}
          className="hover:text-white transition duration-200"
        >
          Series
        </button>
       
        <button
          onClick={() => navigate("/favorites")}
          className="hover:text-white transition duration-200"
        >
          My List
        </button>
      </div>

      {/* Destra: spazio vuoto per bilanciare (obbligatorio per centratura perfetta) */}
      <div className="w-20 md:w-24"></div>
    </nav>
  );
}