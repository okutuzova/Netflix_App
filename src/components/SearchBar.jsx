import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovie } from "../api/tmdb";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const results = await searchMovie(query);
      if (results.length > 0) {
        navigate(`/movie/${results[0].id}`);
      } else {
        alert("Movie not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching movie");
    }
  };

  return (
    <div className="py-5 flex flex-col sm:flex-row gap-3 items-center">
      <input
        type="text"
        placeholder="Insert the title"
        className="border p-2 border-gray-500 px-4 w-full sm:w-auto min-w-65"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-red-600 
    hover:bg-red-700 
    active:bg-red-800 
    text-white 
    font-semibold 
    px-6 py-2 
    rounded 
    shadow-md 
    hover:shadow-lg 
    transition 
    duration-300 
    transform 
    hover:-translate-y-0.5
    w-full sm:w-auto
    cursor-pointer"

      >
        Search
      </button>
    </div>
  );
}
