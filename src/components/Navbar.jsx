// src/components/Nav.jsx

import SearchBar from "./SearchBar";
import bgimg from "../assets/Netflix-background-banner.jpg";
import netflixLogo from "../assets/netflix-logo.png";

const Nav = () => {
  return (
    <div className="px-6 py-5 bg-black bg-cover text-white z-10 relative overflow-hidden">
      {/* Sfondo poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bgimg})` }}
      ></div>

      {/* Contenuto */}
      <div className="relative z-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <img
            src={netflixLogo}
            alt="NETFLIX by Mayte & Olga"
            className="h-8 md:h-10 object-contain"
          />

          <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl mx-auto md:space-around md:mx-0 md:w-auto">
            <div className="flex w-full md:w-auto gap-3">
              <button className="bg-red-600 mr-7 px-4 py-1.5 flex-1 rounded whitespace-nowrap">
                Movies
              </button>
              <button className="bg-red-600 mr-7 px-4 py-1.5 flex-1 rounded whitespace-nowrap">
                TV Series
              </button>
              <button className="bg-red-600 mr-7 px-4 py-1.5 flex-1 rounded whitespace-nowrap">
                Favorites
              </button>
            </div>
          </div>
        </div>

        <div className="py-20 md:py-40 flex flex-col items-center text-center">
          <div className="text-4xl md:text-6xl font-bold max-w-2xl">
            Unlimited movies, series and more
          </div>

          <div className="py-5 font-bold text-base md:text-[18px]">
            Starting at 99 EUR. Cancel anytime.
          </div>

          <p className="px-4">
            Ready to watch? Choose your movie for tonight...
          </p>

          <SearchBar />
        </div>
      </div>

      {/* 👇 CURVA VERSO IL BASSO + LINEA COLORATA 👇 */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-black"
        style={{
          clipPath: 'path("M0,0 H100% V80% C80%,80% 20%,80% 0,80% Z")'
        }}
      ></div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-purple-600 to-red-600"
        style={{
          transform: 'translateY(-1px)',
        }}
      ></div>
    </div>
  );
};

export default Nav;