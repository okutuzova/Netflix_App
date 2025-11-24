import { useFavorites } from "../hooks/useFavorites";
import { useState, useEffect } from "react";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import NavbarTransparent from "../components/NavbarTrasparent";


export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  // Filtra i preferiti per tipo
  const movies = favorites.filter(item => item.type === "movie");
  const tvShows = favorites.filter(item => item.type === "series");


  // Stato per il filtro attivo
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'movies', 'tv'

  // Dati filtrati
  const filteredFavorites = activeFilter === "all" 
    ? favorites 
    : activeFilter === "movies" 
      ? movies 
      : tvShows;




    useEffect(() => {
    console.log("📊 Favorites data:");
    console.log("Total:", favorites);
    console.log("Movies:", movies);
    console.log("TV Shows:", tvShows);
  }, [favorites]); // Dipendenza: solo quando `favorites` cambia




  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
     <NavbarTransparent />

      {/* Contenuto principale */}
      <div className="pt-40 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Titolo + Filtri */}
          <div className="flex flex-col sm:flex-row sm:items-center  mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">My List</h1>

            {/* Bottoni di filtro */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Show All ({favorites.length})
              </button>
              <button
                onClick={() => setActiveFilter("movies")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "movies"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Movies ({movies.length})
              </button>
              <button
                onClick={() => setActiveFilter("series")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "series"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                TV Series ({tvShows.length})
              </button>
            </div>
          </div>

          {/* Lista dei preferiti */}
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                {activeFilter === "all" && "Your favorites list is empty."}
                {activeFilter === "movies" && "No movies in your favorites."}
                {activeFilter === "tv" && "No TV shows in your favorites."}
              </p>
              <p className="text-gray-500 mt-2">Add content to see it here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredFavorites.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="group bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 relative"
                >
                  <div className="relative aspect-[2/3]">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                          : placeholderMovie
                      }
                      alt={item.displayName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = placeholderMovie;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button
                      onClick={() => removeFromFavorites(item.id, item.type)}
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
                      aria-label="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-2 text-white">
                      {item.displayName}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}