import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../api/tmdb";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const movies = await searchMovie(query);
      setResults(movies);
    } catch (err) {
      console.error(err);
      alert("Error searching movies");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Close dropdown on a click outsude of a component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      {/* Input + Search button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Insert the title"
          className="border p-2 px-4 w-full rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Dropdown with list results */}
      {loading && <div className="text-gray-400 mt-2">Loading...</div>}

      {results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-black border mt-1 max-h-96 overflow-x-hidden rounded shadow-lg z-50 animate-slideDown scrollbar-thin">
          {results.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer transition transform hover:scale-105"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "https://via.placeholder.com/60x90?text=No+Image"
                }
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <span className="text-white font-medium">{movie.title}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Appearance animation */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
