import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../api/tmdb";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import { useNavigate } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import { getTopRatedMovies } from "../api/tmdb";
import NavbarSecond from "../components/NavbarSecond";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        console.log("Movie data:", data); // debug
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="text-gray-400 text-center p-4 animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!movie)
    return <div className="text-gray-400 text-center p-4">No movie data</div>;

  const cast = movie.credits?.cast?.slice(0, 5) || [];
  const genres = movie.genres?.map((g) => g.name).join(", ") || "N/A";

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background poster with gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-200"
          style={{
            backgroundImage: `url(${
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : placeholderMovie
            })`,
          }}
        ></div>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Navbar */}
      <NavbarSecond />

      {/* Main Content - Centered vertically */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-60 pb-16 flex flex-col lg:flex-row gap-8 items-start">
        {/* Poster Section - Left Side */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center">
          <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 max-w-md">
            {/* Immagine del poster */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` // Risoluzione più alta
                  : placeholderMovie
              }
              alt={movie.title}
              className="w-full h-auto object-cover"
            />

            {/* Overlay con sfumatura ai lati */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
          </div>
        </div>

        {/* Details Section - Right Side */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-8xl font-bold">{movie.title}</h1>

          {/* Info Line: Year, Duration, Rating */}
          <div className="flex items-center gap-4 text-xl text-gray-300">
            <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
            <span>•</span>
            <span>{movie.vote_average} / 10</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-white text-black px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.188A1 1 0 008 8v4a1 1 0 001.555.812l3 1.5A1 1 0 0014 14V8a1 1 0 00-1.555-.812l-3-1.5z"
                  clipRule="evenodd"
                />
              </svg>
              Riproduci
            </button>
            <button className="border border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm9 4a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
              La mia lista
            </button>
            
            <button className="border border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.828a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Overview */}
          <p className="mt-4 text-gray-200 leading-relaxed">{movie.overview}</p>

          {/* Cast and Genres */}
          <div className="mt-4 text-sm text-gray-300">
            <div className="mb-2">
              <strong>Cast:</strong>{" "}
              {cast.map((actor, index) => actor.name).join(", ")}
            </div>
            <div>
              <strong>Generi:</strong> {genres}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 border-t border-gray-700 pt-4">
            <div className="flex space-x-6">
              <button className="text-white font-semibold border-b-2 border-white pb-2">
                RIEPILOGO
              </button>
              <button className="text-gray-400 hover:text-white transition">
                ALTRI TITOLI SIMILI
              </button>
              <button className="text-gray-400 hover:text-white transition">
                DETTAGLI
              </button>
            </div>
          </div>
        </div>
      </div>

      <MovieRow className="z-10 bg-opacity-50" title="Top Rated" fetchFunction={getTopRatedMovies}/>
    </div>

  );
}
