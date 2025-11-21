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
  
    const addToFavorites = (item, type= "movie") => {
      const favoriteItem = {
        ...item,
        type,
        displayName: item.title || item.name,
      };
      setFavorites((prev) =>
        prev.some((m) => m.id === item.id  && m.type === type) ? prev : [...prev, favoriteItem]
      );
    };
  
    const removeFromFavorites = (id, type= "movie") => {
      setFavorites((prev) => 
        prev.filter((m) => !(m.id === id && m.type === type))
      );
    };
  
    const isFavorite = (id, type= "movie") => favorites.some((m) => m.id === id && m.type === type);
  
    return (
      <FavoritesContext.Provider
        value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
      >
        {children}
      </FavoritesContext.Provider>
    );
  }