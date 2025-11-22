/**
 * @file App.jsx
 * @description
 * The main application component that sets up routing and context providers.
 * Wraps the app in a FavoritesProvider to manage favorite movies/series.
 * Uses React Router v6 <Routes> to define all the application routes.
 *
 * Routes:
 * - "/" - Home page
 * - "/movie/:id" - Movie detail page
 * - "/series/:id" - Series detail page
 * - "/favorites" - Favorites page
 * - "/movies" - Movies listing page
 * - "/series" - Series listing page
 * - "*" - Error page for unmatched routes
 *
 * @component
 * @returns {JSX.Element} The application with routing and provider.
 */
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./providers/FavoritesProvider";
import FavoritesPage from "./pages/FavoritesPage";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import ErrorPage from "./pages/ErrorPage";

import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
