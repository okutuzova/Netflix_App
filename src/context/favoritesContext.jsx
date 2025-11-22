import { createContext } from "react";

/**
 * FavoritesContext
 *
 * React Context object to provide access to the user's favorite movies and TV shows.
 * It should always be used within a <FavoritesProvider> wrapper.
 *
 * Provides:
 * - favorites: Array of favorite items
 * - addToFavorites(item, type): Function to add an item
 * - removeFromFavorites(id, type): Function to remove an item
 * - isFavorite(id, type): Function to check if an item is a favorite
 *
 * Example usage:
 * const { favorites, addToFavorites } = useContext(FavoritesContext);
 */
export const FavoritesContext = createContext();


