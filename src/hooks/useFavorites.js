import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext";

/**
 * useFavorites
 *
 * Custom React hook to access the FavoritesContext.
 * Provides a convenient way to get the list of favorite items and functions
 * to add, remove, or check favorites.
 *
 * @returns {Object} An object containing:
 *   - favorites: Array of current favorite items
 *   - addToFavorites: Function to add an item to favorites
 *   - removeFromFavorites: Function to remove an item from favorites
 *   - isFavorite: Function to check if an item is a favorite
 */
export const useFavorites = () => useContext(FavoritesContext);
