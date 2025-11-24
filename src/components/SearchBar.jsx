import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../api/tmdb";
import placeholderMovie from "../assets/placeholderMovie.jpg";
/**
 * SearchBar Component
 *
 * A live-search input for movies. Allows users to search for movies by title
 * using the TMDb API and displays matching results in a dropdown.
 *
 * Features:
 * - Live search as the user types
 * - Loading indicator
 * - Click outside to close dropdown
 * - Navigation to movie detail page on result click
 *
 * State:
 * - query: string, current input value
 * - results: array, list of movies returned from TMDb
 * - loading: boolean, indicates whether a search request is in progress
 *
 * Hooks used:
 * - useState: for query, results, loading
 * - useRef: to detect clicks outside the component
 * - useEffect: to attach/remove click outside listener
 * - useNavigate: to navigate to movie detail page
 *
 * Example usage:
 * <SearchBar />
 */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Search button click handler
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const movies = await searchMovie(query);
      setResults(movies);
    } catch (err) {
      console.error(err);
      setError("Error searching movies");
    } finally {
      setLoading(false);
    }
  };
  // Input change handler
  // automatic upon user typing
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const movies = await searchMovie(value);
      setResults(movies);
    } catch (err) {
      console.error(err);
      setError("Error searching movies");
    } finally {
      setLoading(false);
    }
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
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Insert the title"
          className="border p-2 px-4 w-full rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleInputChange}
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

      {/* Error */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

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
                    : placeholderMovie
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
      <style>{`
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
