const BASE_URL  = import.meta.env.VITE_APP_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN

/**
 * generic function to work with TMDB API
 * @param {string} endpoint — path, example '/trending/movie/week'
 * @returns {Promise<object>} — result JSON
 * @throws {Error} — if response is not ok
 */
async function fetchFromTMDB(endpoint) {
    try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`TMDB API responded with status ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error(error.message);
    throw new Error("Failed to fetch data from TMDB API");
}
}

// -- Movies --
export const getTrendingMovies = () => fetchFromTMDB("/trending/movie/week");
export const getTopRatedMovies = () => fetchFromTMDB("/movie/top_rated");
export const getUpcomingMovies = () => fetchFromTMDB("/movie/upcoming");
export const getPopularMovies = () => fetchFromTMDB("/movie/popular");
export const getNowPlayingMovies = () => fetchFromTMDB("/movie/now_playing");
export const getMovieById = (id) =>
    fetchFromTMDB(`/movie/${id}?append_to_response=credits,videos,releases`);

// -- TV --
export const getTrendingTV = () => fetchFromTMDB("/trending/tv/week");
export const getTopRatedTV = () => fetchFromTMDB("/tv/top_rated");
export const getPopularTV = () => fetchFromTMDB("/tv/popular");
export const getTVById = (id) =>
    fetchFromTMDB(`/tv/${id}?append_to_response=credits,videos`);


// -- Search --
export const searchMovie = (query) =>
    fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false`)
      .then((data) => data.results || []);
  
  

