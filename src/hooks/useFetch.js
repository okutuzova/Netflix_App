import { useEffect, useState } from "react";

/**
 * useFetch
 *
 * Custom React hook for fetching data asynchronously.
 * It handles loading, error, and storing the fetched data.
 *
 * @param {Function} fetchFunction - A function that returns a promise resolving to data (e.g., an API call)
 *
 * @returns {Object} An object containing:
 *   - data: Array of fetched results (defaults to [])
 *   - loading: Boolean indicating whether the fetch is in progress
 *   - error: String with the error message if the fetch fails, otherwise null
 *
 * @example
 * const { data, loading, error } = useFetch(() => getTrendingMovies());
 */
export function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchFunction();
        setData(result.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [fetchFunction]);

  return { data, loading, error };
}
