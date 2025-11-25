export default function MediActions({
  media,
  isFavorite,
  toggleFavorite,
  navigate,
}) {
  const type = media.type || "movie";

  return (
    <div className="flex gap-4 mt-4">
      {/* Play Button */}
      <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-200 transition">
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

      {/* My List Button */}
      <button
        onClick={() => navigate("/favorites")}
        className="border cursor-pointer border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition"
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

      {/* Favorite Button  */}
      <button
        onClick={() => toggleFavorite({...media, type})}
        className={`px-4 py-2 rounded-md font-semibold cursor-pointer flex items-center gap-2 transition
${
  isFavorite(media.id, type)
    ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
    : "border border-gray-400 text-white hover:bg-gray-700"
}
`}
      >
        {isFavorite(media.id, type) ? (
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
  );
}
