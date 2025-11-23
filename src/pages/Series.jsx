import MovieRow from "../components/MovieRow";
import NavbarSecond from "../components/NavbarSecond";
import RandomHero from "../components/RandomHero";
import {
  getTrendingTV,
  getPopularTV,
  getTopRatedTV
} from "../api/tmdb";

export default function TVPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <NavbarSecond />

      <RandomHero fetchFunction={getTrendingTV} type="series"/>

      <MovieRow title="Trending TV" fetchFunction={getTrendingTV} type="series" />
      <MovieRow title="Top Rated TV" fetchFunction={getTopRatedTV} type="series" />
      <MovieRow title="Popular TV Shows" fetchFunction={getPopularTV} type="series"/>
    </div>
  );
}
