const BASE_URL  = import.meta.env.VITE_APP_BASE_URL
const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN

/**
 * generic function to work with TMDB API
 * @param {string} endpoint — path, example '/trending/movie/week'
 * @returns {Promise<object>} — result JSON
 */
async function fetchFromTMDB(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
        }
    });
    if (!response.ok) throw new Error("Error fetching data from TMDB");
    return await response.json();
}

export const getTrendingMovies = () => fetchFromTMDB("/trending/movie/week");
export const getTopRatedMovies = () => fetchFromTMDB("/movie/top_rated");
export const getUpcomingMovies = () => fetchFromTMDB("/movie/upcoming");