import { useFetch } from "../hooks/useFetch";
import placeholderMovie from "../assets/placeholderMovie.jpg";

/**
 * A component to display a horizontal line of movies
 * @param {Object} props
 * @param {string} props.title - Section Title (example, "Trending Now")
 * @param {Function} props.fetchFunction - function returns a promise with data from TMDB
 */
export default function MovieRow({
  title,
  fetchFunction,
  showRanking = false,
}) {
  const { data: movies, loading, error } = useFetch(fetchFunction);

  if (loading)
    return (
      <div className="text-gray-400 text-center p-4 animate-pulse">
        Loading {title}...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading {title}: {error}
      </div>
    );

  return (
    <section className="text-white px-8 py-6">
      <div className="bg-black px-30 text-white pt-10">
        <h2 className="font-bold text-2xl">{title}</h2>

        <div className="flex gap-10 overflow-scroll hide-scrollbar">
          {movies.map((movie, index) => {
            return (
              <div
                key={movie.id}
                index={index + 1}
                className="relative min-w-[180px] group transform hover:scale-105 transition duration-300"
              >
                {showRanking && (
                  <span className="absolute -left-6 bottom-0 text-[90px] font-extrabold text-stroke-white">
                    {index + 1}
                  </span>
                )}
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : placeholderMovie
                  }
                  className="rounded-xl w-full h-[260px] object-cover"
                  alt={movie.title}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-sm font-semibold">{movie.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
