import { useEffect, useState } from "react";
import { FavoritesContext } from "../context/favoritesContext";

/**
 * FavoritesProvider Component
 *
 * Provides a context for managing favorite movies and TV shows.
 *
 * Context Values:
 * - favorites: Array of favorite items.
 * - addToFavorites(item, type): Adds an item to favorites (if not already present).
 * - removeFromFavorites(id, type): Removes an item from favorites.
 * - isFavorite(id, type): Checks if an item is already a favorite.
 *
 * Favorites are persisted in localStorage automatically.
 *
 * Props:
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components that have access to this context.
 *
 * Example usage:
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to load favorites from local storage", err);
      return [];
    }
  });

  // save in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites to local storage", err);
    }
  }, [favorites]);

  const addToFavorites = (item, type = "movie") => {
    const favoriteItem = {
      ...item,
      type,
      displayName: item.title || item.name,
    };
    setFavorites((prev) =>
      prev.some((m) => m.id === item.id && m.type === type)
        ? prev
        : [...prev, favoriteItem]
    );
  };

  const removeFromFavorites = (id, type = "movie") => {
    setFavorites((prev) =>
      prev.filter((m) => !(m.id === id && m.type === type))
    );
  };

  const isFavorite = (id, type = "movie") =>
    favorites.some((m) => m.id === id && m.type === type);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
