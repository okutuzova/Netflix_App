import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById, getTopRatedMovies, getSimilarMovies } from "../api/tmdb";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import MovieRow from "../components/MovieRow";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import NavbarSecond from "../components/NavbarSecond";
import MediaPoster from "../components/MediaDetail/MediaPoster";
import MediaBackground from "../components/MediaDetail/MediaBackground";
import MediaActions from "../components/MediaDetail/MediaActions";

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

          <MediaActions
            media={movie}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            navigate={navigate}
          />

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
