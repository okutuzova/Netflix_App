import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function RandomHero({ fetchFunction, type = "movie" }) {
  const { data, loading } = useFetch(fetchFunction);
  const navigate = useNavigate();

  if (loading || !data?.length) return null;

  const item = data[Math.floor(Math.random() * data.length)];

  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end p-10 rounded-xl"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }}
    >
      <div className="bg-black/60 p-6 rounded-xl max-w-xl backdrop-blur">
        <h1 className="text-4xl font-extrabold">
          {item.title || item.name}
        </h1>

        <p className="text-gray-300 mt-3 line-clamp-3">
          {item.overview}
        </p>

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
