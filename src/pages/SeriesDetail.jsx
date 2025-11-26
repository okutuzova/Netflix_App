import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTVById, getTopRatedTV, getSimilarSeries } from "../api/tmdb";
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import MovieRow from "../components/MovieRow";
import NavbarSecond from "../components/NavbarSecond";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import MediaPoster from "../components/MediaDetail/MediaPoster";
import MediaBackground from "../components/MediaDetail/MediaBackground";
import MediaActions from "../components/MediaDetail/MediaActions";

/**
 * SeriesDetail Component
 *
 * Displays detailed information about a single TV series.
 * Includes poster, overview, cast, genres, favorite toggling.
 *
 * Handles:
 * - Loading and error states for series fetch
 * - Favorite management via useFavorites hook
 */
export default function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useToggleFavorite();

  // fetch main series details
  useEffect(() => {
    async function fetchSeries() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTVById(id);
        setSeries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeries();
  }, [id]);

  // fetch similar series
  useEffect(() => {
    async function fetchSimilarSeries() {
      if (!series) return;
      setSimilarLoading(true);
      try {
        const data = await getSimilarSeries(series.id);
        setSimilarSeries(data);
      } catch (err) {
        console.error("Error fetching similar series:", err);
      } finally {
        setSimilarLoading(false);
      }
    }
    if (activeTab === "similar") fetchSimilarSeries();
  }, [activeTab, series, id]);

  if (loading)
    return (
      <div className="text-gray-400 text-center p-4 animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!series)
    return <div className="text-gray-400 text-center p-4">No series data</div>;

  const cast = series.credits?.cast?.slice(0, 5) || [];
  const genres = series.genres?.map((g) => g.name).join(", ") || "N/A";
  const runtime = series.episode_run_time?.[0] || "N/A";

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background */}
      <MediaBackground media={series} />

      {/* Navbar */}
      <NavbarSecond />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-60 pb-16 flex flex-col lg:flex-row gap-8 items-start">
        {/* Poster Section - Left Side */}
        <MediaPoster media={series} />

        {/* Details Section - Right Side*/}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-8xl font-bold">{series.name}</h1>

          {/* Info Line: Year, Duration, Rating */}
          <div className="flex items-center gap-4 text-xl text-gray-300">
            <span>{series.first_air_date?.split("-")[0] || "N/A"}</span>
            <span>•</span>
            <span>{runtime} min / ep</span>
            <span>•</span>
            <span>{series.vote_average} / 10</span>
          </div>

          {/* Buttons */}
          <MediaActions
          media={{ ...series, type: "series" }}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          navigate={navigate}
          />


          {/* Overview */}
          <p className="mt-4 text-gray-200 leading-relaxed">
            {series.overview}
          </p>

          {/* Cast & Genres */}
          <div className="mt-4 text-sm text-gray-300">
            <div className="mb-2">
              <strong>Cast:</strong>{" "}
              {cast.map((actor) => actor.name).join(", ")}
            </div>
            <div>
              <strong>Genres:</strong> {genres}
            </div>
          </div>

          {/* Tabs */}
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
                    Original Language: {series.original_language}
                  </p>
                  <p className="text-gray-200">
                    Number of Episodes: {series.number_of_episodes}
                  </p>
                  <p className="text-gray-200">
                    Seasons: {series.number_of_seasons}
                  </p>
                </div>
              )}

              {activeTab === "similar" && (
                <div>
                  {similarLoading && <div>Loading similar series...</div>}
                  {!similarLoading && similarSeries.length === 0 && (
                    <div>No similar movies found.</div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {similarSeries.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => navigate(`/series/${m.id}`)}
                        className="cursor-pointer"
                      >
                        <img
                          src={
                            m.poster_path
                              ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                              : placeholderMovie
                          }
                          alt={m.name}
                        />
                        <p>{m.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <p>Origin country: {series.origin_country || "N/A"}</p>

                  <p>Status: {series.status || "N/A"}</p>

                  {/* Producers */}
                  <p>
                    Producer(s):{" "}
                    {series.credits?.crew
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

      {/* MovieRow - Top Rated TV */}
      <MovieRow
        className="z-10 bg-opacity-50"
        title="Top Rated TV"
        fetchFunction={getTopRatedTV}
        type="series"
      />
    </div>
  );
}
