import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import MovieRow from "../components/MovieRow";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/tmdb";

/**
 * Home Page
 *
 * The main landing page of the application. Displays a Netflix-style layout
 * including a navigation bar, multiple movie rows, and a footer.
 *
 * This page does not fetch data directly — instead, it passes TMDb fetch
 * functions to the `MovieRow` component, which handles data retrieval,
 * loading states, and errors internally.
 *
 * Sections:
 * - Trending Now (with ranking)
 * - Top Rated Movies
 * - Upcoming Movies
 *
 * Components:
 * - <Nav />: Top navigation bar
 * - <MovieRow />: Horizontal scrolling list of movies
 * - <Footer />: Sticky footer
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Nav />

      <main className="flex-1 pt-20">
        <MovieRow
          title="Trending Now"
          fetchFunction={getTrendingMovies}
          showRanking={true}
        />
        <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies} />
        <MovieRow title="Upcoming Movies" fetchFunction={getUpcomingMovies} />
      </main>
      <Footer />
    </div>
  );
}
