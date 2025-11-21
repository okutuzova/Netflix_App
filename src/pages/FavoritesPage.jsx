import { useFavorites } from "../hooks/useFavorites";
import placeholderMovie from "../assets/placeholderMovie.jpg";

export default function FavoritesPage() {
    const { favorites, removeFromFavorites } = useFavorites();
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>Favorites</h1>
  
        {favorites.length === 0 && <p>List is empty.</p>}
  
        <div className="favorites-grid">
          {favorites.map((item) => (
             <div key={`${item.type}-${item.id}`} className="movie-card">
              <img src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : placeholderMovie} alt={item.displayName} />
              <h3>{item.displayName}</h3>
  
              <button onClick={() => removeFromFavorites(item.id, item.type)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }