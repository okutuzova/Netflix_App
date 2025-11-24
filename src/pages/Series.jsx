import MovieRow from "../components/MovieRow";
import RandomHero from "../components/RandomHero";
import NavbarTransparent from "../components/NavbarTrasparent";
import {
  getTrendingTV,
  getPopularTV,
  getTopRatedTV
} from "../api/tmdb";

export default function TVPage() {
  return (
    <div className="bg-black min-h-screen">
      <NavbarTransparent />

      <div className="text-white space-y-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Random hero per le serie TV */}
        <RandomHero fetchFunction={getTrendingTV} type="series" />

        <MovieRow title="Trending TV" fetchFunction={getTrendingTV} type="series" />
        <MovieRow title="Top Rated TV" fetchFunction={getTopRatedTV} type="series" />
        <MovieRow title="Popular TV Shows" fetchFunction={getPopularTV} type="series" />
      </div>
    </div>
  );
}