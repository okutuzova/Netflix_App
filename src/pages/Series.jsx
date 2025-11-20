import MovieRow from "../components/MovieRow";
import RandomHero from "../components/RandomHero";
import {
  getTrendingTV,
  getPopularTV,
  getTopRatedTV
} from "../api/tmdb";

export default function TVPage() {
  return (
    <div className="text-white space-y-10 pb-20">

      <RandomHero fetchFunction={getTrendingTV} type="series"/>

      <MovieRow title="Trending TV" fetchFunction={getTrendingTV} type="series" />
      <MovieRow title="Top Rated TV" fetchFunction={getTopRatedTV} type="series" />
      <MovieRow title="Popular TV Shows" fetchFunction={getPopularTV} type="series"/>
    </div>
  );
}
