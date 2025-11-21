import Nav from "../components/Navbar";
import CurveSeparator from "../components/CurveSeparator";
import Footer from "../components/Footer";
import MovieRow from "../components/MovieRow";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/tmdb";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Nav />

      <CurveSeparator />
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
