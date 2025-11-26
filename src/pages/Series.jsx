import MovieRow from "../components/MovieRow";
import NavbarSecond from "../components/NavbarSecond";
import RandomHero from "../components/RandomHero";
import {
  getTrendingTV,
  getPopularTV,
  getTopRatedTV
} from "../api/tmdb";

/**
 * SeriesPage Component
 *
 * Main page for displaying series content.
 * Includes a navigation bar, a random hero section, and multiple
 * horizontal rows of series categorized by trending, top rated,
 * popular.
 *
 * Each MovieRow fetches data from TMDB via the provided fetch function
 * and displays the corresponding media items.
 *
 * @returns {JSX.Element} The rendered SeriesPage component.
 */
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
