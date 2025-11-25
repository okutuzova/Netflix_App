import { useFavorites } from "./useFavorites";

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
