import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../api/tmdb";
import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import { getTopRatedMovies } from "../api/tmdb";
import placeholderMovie from "../assets/placeholderMovie.jpg";
import NavbarSecond from "../components/NavbarSecond";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite  } = useFavorites();
  
  const toggleFavorite = (movie) => {
    isFavorite(movie.id)
      ? removeFromFavorites(movie.id)
      : addToFavorites(movie);
  };

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
    

<div className="absolute inset-0">
<div className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-200"
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
 {/* <nav className="absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-80 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <img
            src={"/netflix-icon.png"}
            alt="NETFLIX"
            className="h-8 md:h-10 object-contain"
            onClick={() => navigate("/")}
          />
          
        </div>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
         
        </div>
      </nav> */}

      <NavbarSecond />




      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-60 pb-16 flex flex-col lg:flex-row gap-8 items-start">
       {/* Poster Section - Left Side */}
       <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center">
       <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 max-w-md">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : placeholderMovie
            }
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
          {/* Overlay con sfumatura ai lati */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
        </div>
        </div>

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
            className="border border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition">
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
            <button className="border border-gray-400 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            

            <button
  onClick={() => toggleFavorite(movie, "movie")}
  className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition 
    ${isFavorite(movie.id)
      ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
      : "border border-gray-400 text-white hover:bg-gray-700"}
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
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
               4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
               14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
               6.86-8.55 11.54L12 21.35z" />
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
    <button className="text-white font-semibold border-b-2 border-white pb-2">
      Overview
    </button>
    <button className="text-gray-400 hover:text-white transition">
      Same titles
    </button>
    <button className="text-gray-400 hover:text-white transition">
      Details
    </button>
  </div>
</div>
</div>
</div>

<MovieRow className="z-10 bg-opacity-50" title="Top Rated" fetchFunction={getTopRatedMovies}/>
</div>



       
     

  );
}
