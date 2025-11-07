import MovieRow from "../components/MovieRow";
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies} from "../api/tmdb";


export default function Home() {
    return (
    
    <main className="bg-black min-h-screen text-white">
        <div className="pt-20">
            <MovieRow title="Trending Now" fetchFunction={getTrendingMovies} showRanking={true} />
            <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies}/>
            <MovieRow title="Upcoming Movies" fetchFunction={getUpcomingMovies}/>
        </div>
        </main>
    
    )
}