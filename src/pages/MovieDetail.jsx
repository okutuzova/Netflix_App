import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, getTopRatedMovies, getSimilarMovies } from "../api/tmdb";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import MovieRow from "../components/MovieRow";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import NavbarSecond from "../components/NavbarSecond";
import MediaPoster from "../components/MediaDetail/MediaPoster";
import MediaBackground from "../components/MediaDetail/MediaBackground";

/**
 * MovieDetail Component
 *
 * Displays detailed information about a single movie.
 * Includes poster, overview, cast, genres, favorite toggling.
 *
 * Handles:
 * - Loading and error states for movie fetch
 * - Favorite management via useFavorites hook
 */
export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useToggleFavorite();

  // fetch main movie details
  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  // fetch similar movies
  useEffect(() => {
    async function fetchSimilarMovies() {
      if (!movie) return;
      setSimilarLoading(true);
      try {
        const data = await getSimilarMovies(movie.id);
        setSimilarMovies(data);
      } catch (err) {
        console.error("Error fetching similar movies:", err);
      } finally {
        setSimilarLoading(false);
      }
    }
    if (activeTab === "similar") fetchSimilarMovies();
  }, [activeTab, movie]);

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
      {/* Background */}
      <MediaBackground media={movie} />

      {/* Navbar */}
      <NavbarSecond />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-60 pb-16 flex flex-col lg:flex-row gap-8 items-start">
        {/* Poster Section - Left Side */}
        <MediaPoster media={movie} />

        {/* Details Section - Right Side*/}
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
              Play
            </button>
            <button
              onClick={() => navigate("/favorites")}
              className="border border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition"
            >
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
              My list
            </button>

            <button
              onClick={() => toggleFavorite(movie)}
              className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition
    ${
      isFavorite(movie.id)
        ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
        : "border border-gray-400 text-white hover:bg-gray-700"
    }
  `}
            >
              {isFavorite(movie.id, "movie") ? (
                // Filled heart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
               4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81
               14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
               6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              ) : (
                // Empty heart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
           4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81
           14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
           6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Overview */}
          <p className="mt-4 text-gray-200 leading-relaxed">{movie.overview}</p>

          {/* Cast and Genres */}
          <div className="mt-4 text-sm text-gray-300">
            <div className="mb-2">
              <strong>Cast:</strong>{" "}
              {cast.map((actor) => actor.name).join(", ")}
            </div>
            <div>
              <strong>Genres:</strong> {genres}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 border-t border-gray-700 pt-4">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={
                  activeTab === "overview"
                    ? "text-white font-semibold border-b-2 border-white pb-2"
                    : ""
                }
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("similar")}
                className={
                  activeTab === "similar"
                    ? "text-gray-400 hover:text-white transition"
                    : ""
                }
              >
                Same titles
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={
                  activeTab === "details"
                    ? "text-gray-400 hover:text-white transition"
                    : ""
                }
              >
                Details
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === "overview" && (
                <div>
                  <p className="text-gray-200">
                    Original Language: {movie.original_language}
                  </p>
                  <p className="text-gray-200">Budget: ${movie.budget}</p>
                  <p className="text-gray-200">Revenue: ${movie.revenue}</p>
                  <p className="text-gray-200">
                    Runtime: {movie.runtime} minutes
                  </p>
                </div>
              )}

              {activeTab === "similar" && (
                <div>
                  {similarLoading && <div>Loading similar movies...</div>}
                  {!similarLoading && similarMovies.length === 0 && (
                    <div>No similar movies found.</div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {similarMovies.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => navigate(`/movie/${m.id}`)}
                        className="cursor-pointer"
                      >
                        <img
                          src={
                            m.poster_path
                              ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                              : placeholderMovie
                          }
                          alt={m.title}
                        />
                        <p>{m.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <p>Release Date: {movie.release_date}</p>
                  {/* Directors */}
                  <p>
                    Director(s):{" "}
                    {movie.credits?.crew
                      ?.filter((c) => c.job === "Director")
                      .map((d) => d.name)
                      .join(", ") || "N/A"}
                  </p>

                  {/* Producers */}
                  <p>
                    Producer(s):{" "}
                    {movie.credits?.crew
                      ?.filter((c) => c.job === "Producer")
                      .map((p) => p.name)
                      .join(", ") || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MovieRow
        className="z-10 bg-opacity-50"
        title="Top Rated"
        fetchFunction={getTopRatedMovies}
      />
    </div>
  );
}
