import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../api/tmdb";
import placeholderMovie from "../assets/placeholderMovie.jpg";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="text-gray-400 text-center p-4 animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!movie) return <div className="text-gray-400 text-center p-4">No movie data</div>;

  const cast = movie.credits?.cast?.slice(0, 5) || [];



return (
    <div className="relative min-h-screen text-white">
      {/* Background poster with gradient */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 opacity-80"
        style={{
          backgroundImage: `url(${
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : placeholderMovie
          })`,
        }}
      ></div> */}

<div className="absolute inset-0">
 
  <div
    className="absolute inset-0 bg-cover bg-center"
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


      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-100 rounded-lg overflow-hidden shadow-2xl">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : placeholderMovie
            }
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-gray-300 italic">{movie.tagline}</p>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="bg-red-600 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-300">
            <span>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </span>
            <span>
              <strong>Release:</strong> {movie.release_date}
            </span>
            <span>
              <strong>Duration:</strong> {movie.runtime} min
            </span>
          </div>

          {/* Cast */}
          <div className="mt-4">
            <strong>Cast:</strong>
            <ul className="list-disc list-inside">
              {cast.map((actor) => (
                <li key={actor.id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>

          {/* Overview */}
          <p className="mt-6 text-gray-200">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}