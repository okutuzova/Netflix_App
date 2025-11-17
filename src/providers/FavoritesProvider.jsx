import { useEffect, useState } from "react";
import { FavoritesContext } from "../context/favoritesContext";

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    });
  
    // save in localStorage
    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
  
    const addToFavorites = (movie) => {
      setFavorites((prev) =>
        prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
      );
    };
  
    const removeFromFavorites = (id) => {
      setFavorites((prev) => prev.filter((m) => m.id !== id));
    };
  
    const isFavorite = (id) => favorites.some((m) => m.id === id);
  
    return (
      <FavoritesContext.Provider
        value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
      >
        {children}
      </FavoritesContext.Provider>
    );
  }