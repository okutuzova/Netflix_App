import { useFavorites } from "./useFavorites";

/**
 * Custom hook: useToggleFavorite
 *
 * Provides a simple interface to toggle a media item (movie or series)
 * in and out of the user's favorites list.
 *
 * Internally relies on the `useFavorites` hook, which manages:
 * - Adding items to favorites
 * - Removing items from favorites
 * - Checking if an item is already saved
 *
 * This hook automatically determines media type (defaults to "movie")
 * and ensures consistent favorite object structure when adding items.
 *
 * @hook
 * @returns {Object} Methods for toggling and checking favorites.
 * @returns {Function} return.toggleFavorite - Toggles a media item in favorites.
 * @returns {Function} return.isFavorite - Checks if a media item is already in favorites.
 */
export function useToggleFavorite() {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const toggleFavorite = (media) => {
    const type = media.type || "movie"; // or "series"
    if (isFavorite(media.id, type)) {
      removeFromFavorites(media.id, type);
    } else {
      addToFavorites({ ...media, type });
    }
  };

  return { toggleFavorite, isFavorite };
}
