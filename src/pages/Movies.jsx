import MovieRow from "../components/MovieRow";
import RandomHero from "../components/RandomHero";
import NavbarTransparent from "../components/NavbarTrasparent";
import { 
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularMovies,
  getNowPlayingMovies
} from "../api/tmdb";

export default function MoviesPage() {
  return (
    <div className="bg-black min-h-screen">
    <NavbarTransparent />
    <div className="text-white space-y-10 pb-20">
     
      {/* Random hero film */}
      <RandomHero fetchFunction={getTrendingMovies} />

      <MovieRow title="Trending Movies" fetchFunction={getTrendingMovies} type="movie"/>
      <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies} type="movie"/>
      <MovieRow title="Upcoming" fetchFunction={getUpcomingMovies} type="movie"/>
      <MovieRow title="Popular" fetchFunction={getPopularMovies} type="movie"/>
      <MovieRow title="Now Playing" fetchFunction={getNowPlayingMovies} type="movie"/>
    </div>
    </div>
  );
}



