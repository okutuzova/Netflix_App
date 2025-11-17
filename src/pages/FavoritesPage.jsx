import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
    const { favorites, removeFromFavorites } = useFavorites();
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>Favorites</h1>
  
        {favorites.length === 0 && <p>List is empty.</p>}
  
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
  
              <button onClick={() => removeFromFavorites(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }