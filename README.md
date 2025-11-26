# Netflix Clone App - by Mayte Cachi and Olga Kutuzova
A React application to browse, search, and manage your favorite movies and series using TMDb API. The app provides a smooth user experience with search suggestions, detail pages, and a favorites system.
```bash
Github: https://github.com/okutuzova/Netflix_App.git
```
## Authors

https://github.com/MayteCachi - Mayte Yossiani Cachi
https://github.com/okutuzova - Olga Kutuzova

## Features

- Search Bar with live suggestions as you type.
- Movies and Series listing pages.
- Detail pages for movies and series:
Each movie or series has a dedicated detail page featuring poster, backdrop, overview, cast, genres, ratings, and similar content recommendations.
- Favorites management using React Context:
Users can add or remove movies and TV series to a personalized favorites list, filter by type (movies, series, or all), and navigate their list seamlessly.
- Responsive design with Tailwind CSS.
- Error handling for unmatched routes.


### TMDB API Calls (src/api/tmdb.js):
This project uses a dedicated utility module to interact with TMDb API. The module provides organized functions to fetch movies, TV series, and search results.

#### Movies
* **getTrendingMovies()** – Fetches the trending movies of the week.
* **getTopRatedMovies()** – Fetches the top-rated movies based on TMDb ratings.
* **getUpcomingMovies()** – Fetches movies that are scheduled to release soon.
* **getPopularMovies()** – Fetches movies currently popular among users.
* **getNowPlayingMovies()** – Fetches movies currently playing in theaters.
* **getSimilarMovies()** – Fetches similar movies.
* **getMovieById(id)** – Fetches full details for a specific movie, including credits, videos, and release information. Requires a TMDb movie ID.

#### TV Series
* **getTrendingTV()** – Fetches trending TV shows of the week.
* **getTopRatedTV()** – Fetches the top-rated TV shows.
* **getPopularTV()** – Fetches currently popular TV shows.
* **getSimilarSeries()** – Fetches similar TV shows.
* **getTVById(id)** – Fetches full details for a specific TV show, including credits and videos. Requires a TMDb TV ID.


#### Search
* **searchMovie(query)** – Searches movies by a query string. Returns an array of movie results matching the search term.

### Implementation Details
* All functions use a **generic `fetchFromTMDB(endpoint)`** utility that handles:

  * Adding the **base URL** and **authorization token**.
  * Error handling if the response is not OK.
  * Parsing JSON results.


### Why Context API was chosen:
The Context API was used to manage favorites globally because it allows sharing state (like a user’s favorite movies or series) across multiple components without prop drilling. It’s lightweight, built into React, and ideal for app-wide state that doesn’t require a full state management library like Redux.


### Components
* **Navbar** – Displays the Netflix logo and search bar on the homepage.
The useFavorites hook is used to manage the favorites state and actions. The useNavigate hook is used to navigate to different pages client-side.
* **NavbarSecond** – Displays the Netflix logo and search bar on secondary pages.
* **CurveSeparator** – A decorative element to separate sections on the homepage.
* **RandomHero** – Displays a random movie or TV show on the pages listing movies and series.
* **MovieRow** – Displays a list of movies or TV shows.
The useRef hook is used to create a persistent reference to a DOM element without causing re-renders, to control horizontal scrolling of movie/TV show rows.
The useFetch is a custom hook created to encapsulate the logic for states handling.
* **SearchBar** – Handles user input for searching movies or TV shows, displays live results in a dropdown with poster and title.
* **Footer** – Displays the app’s footer.
* **MediaActions** – Action buttons displayed on the movies/series details page.
* **MediaBackground** – Displays a blurred background image.
* **MediaPoster** – Displays the movies or series poster.


### Pages

* **ErrorPage** – Displays a custom error page when a route is not found.
* **FavoritesPage** – Displays a list of the user’s favorite movies and TV shows.
It allows users to:
- Filter favorites by type: All, Movies, or TV Series.
- Remove items from the favorites list.

* **Home** – The homepage of the app, displays the hero section, movie rows, and a footer.
* **MovieDetail** – Displays detailed information about a specific movie.
* **Movies** – Displays a list of movies.
* **Series** – Displays a list of TV shows.
* **SeriesDetail** – Displays detailed information about a specific TV show.


### Context
FavoritesContext is a React Context that provides access to favorites data and functions.
It Stores the list of favorite items, exposes functions to add, remove, and check favorite items.


### Providers
The FavoritesProvider is a React Context provider that allows any component in the app to:
- Read the current list of favorite movies/TV shows.
- Add items to favorites.
- Remove items from favorites.
- Check if a specific item is in favorites.
It provides:
- Persistent storage: Favorites are saved in localStorage and survive page reloads.
Utility functions:
- addToFavorites(item, type) → Add a movie or TV show.
- removeFromFavorites(id, type) → Remove an item.
- isFavorite(id, type) → Check if an item is in the favorites list.

Usage: Wrap your app in <FavoritesProvider> and use useFavorites() hook in components.
```jsx
<FavoritesProvider>
  <App />
</FavoritesProvider>
```

### Hooks
`useFavorites` is a convenience hook to easily access favorites data and functions from any component.It wraps `useContext(FavoritesContext)`, so there is no need to import `useContext` and `FavoritesContext` every time.
`useFetch` is a reusable custom hook for fetching data asynchronously. It is used in a MovieRow component to fetch the array results.

## Technologies Used

* **React** v19.1.1
* **React DOM** v19.1.1
* **React Router DOM** v7.9.5
* **Tailwind CSS** v4.1.17
* **Vite** v7.1.7
* **Lucide React** v0.553.0
* **TMDb API** (for movie/series data)
* **Context API** (for managing favorites)

## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
### Installation
1. Clone the repository:
```bash
git clone
git clone https://github.com/okutuzova/Netflix_App.git
```
2. Navigate to the project directory:
```bash
cd Netflix
```
3. Install the dependencies:
```bash
npm install
```
4. Create a .env file in the root directory and add your TMDb API key:
```bash
VITE_APP_BEARER_TOKEN=YOUR_BEARER_TOKEN_HERE
```
5. Start the development server:
```bash
npm run dev
```
6. The app should now be running on
```bash
URL_ADDRESS:5173/
```

## File Tree:

```
├── 📁 public
│   └── 🖼️ netflix-icon.png
├── 📁 src
│   ├── 📁 api
│   │   └── 📄 tmdb.js
│   ├── 📁 assets
│   │   ├── 🖼️ Netflix-Logo.png
│   │   ├── 🖼️ Netflix-background-banner.jpg
│   │   └── 🖼️ placeholderMovie.jpg
│   ├── 📁 components
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 HeroDivider.jsx
│   │   ├── 📄 MovieRow.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 NavbarSecond.jsx
│   │   ├── 📄 RandomHero.jsx
│   │   └── 📄 SearchBar.jsx
│   ├── 📁 context
│   │   └── 📄 favoritesContext.jsx
│   ├── 📁 hooks
│   │   ├── 📄 useFavorites.js
│   │   └── 📄 useFetch.js
│   ├── 📁 pages
│   │   ├── 📄 ErrorPage.jsx
│   │   ├── 📄 FavoritesPage.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 MovieDetail.jsx
│   │   ├── 📄 Movies.jsx
│   │   ├── 📄 Series.jsx
│   │   └── 📄 SeriesDetail.jsx
│   ├── 📁 providers
│   │   └── 📄 FavoritesProvider.jsx
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 env.example
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```
