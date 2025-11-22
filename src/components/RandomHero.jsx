import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
/**
 * RandomHero Component
 *
 * Displays a randomly selected movie or TV show as a hero banner for pages listing movies and TV series.
 * The component fetches data using a provided `fetchFunction` and shows:
 * - A full-width background image
 * - Title and overview of the item
 * - A button to navigate to the detail page
 *
 * Props:
 * @param {Object} props
 * @param {Function} props.fetchFunction - Function that returns a promise resolving to an array of movies/TV shows
 * @param {string} [props.type='movie'] - Type of content; used to build the detail page route ('movie' or 'series')
 *
 * Behavior:
 * - Chooses a random item from the fetched data
 * - Clicking "Watch Details" navigates to the corresponding detail page
 *
 * Example usage:
 * <RandomHero fetchFunction={getTrendingMovies} type="movie" />
 */
export default function RandomHero({ fetchFunction, type = "movie" }) {
  const { data, loading, error } = useFetch(fetchFunction);
  const navigate = useNavigate();

  if (loading || !data?.length)
    return (
      <div className="flex justify-center items-center h-[70vh] text-red text-xl">
        Loading...
      </div>
    );

  if (error) return <div className="text-red-500">Failed to load hero</div>;

  const item = data[Math.floor(Math.random() * data.length)];

  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end p-10 rounded-xl"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="bg-black/60 p-6 rounded-xl max-w-xl backdrop-blur">
        <h1 className="text-4xl font-extrabold">{item.title || item.name}</h1>

        <p className="text-gray-300 mt-3 line-clamp-3">{item.overview}</p>

        <button
          onClick={() => navigate(`/${type}/${item.id}`)}
          className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold"
        >
          Watch Details
        </button>
      </div>
    </div>
  );
}
