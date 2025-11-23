import MovieRow from "../components/MovieRow";
import NavbarSecond from "../components/NavbarSecond";
import RandomHero from "../components/RandomHero";
import { 
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularMovies,
  getNowPlayingMovies
} from "../api/tmdb";

export default function MoviesPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
       <NavbarSecond />

      {/* Random hero film */}
      <RandomHero fetchFunction={getTrendingMovies} />

      <MovieRow title="Trending Movies" fetchFunction={getTrendingMovies} type="movie"/>
      <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies} type="movie"/>
      <MovieRow title="Upcoming" fetchFunction={getUpcomingMovies} type="movie"/>
      <MovieRow title="Popular" fetchFunction={getPopularMovies} type="movie"/>
      <MovieRow title="Now Playing" fetchFunction={getNowPlayingMovies} type="movie"/>
    </div>
  );
}
