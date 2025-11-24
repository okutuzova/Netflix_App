import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function RandomHero({ fetchFunction, type = "movie" }) {
  const { data, loading } = useFetch(fetchFunction);
  const navigate = useNavigate();

  if (loading || !data?.length) return null;

  const item = data[Math.floor(Math.random() * data.length)];

  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-hidden rounded-xl">
      <img
        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
        alt={item.title || item.name}
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Contenuto testo */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full max-w-xl">
        <h1 className="text-xxl sm:text-3xl md:text-4xl font-extrabold">
          {item.title || item.name}
        </h1>

        <p className="text-gray-300 mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-3">
          {item.overview}
        </p>

        <button
          onClick={() => navigate(`/${type}/${item.id}`)}
          className="mt-3 sm:mt-4 bg-red-600 hover:bg-red-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base"
        >
          Watch Details
        </button>
      </div>
    </div>
  );
}
