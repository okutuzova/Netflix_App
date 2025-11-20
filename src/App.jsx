import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './providers/FavoritesProvider';
import FavoritesPage from './pages/FavoritesPage';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SeriesDetail from './pages/SeriesDetail';
import Movies from './pages/Movies';
import Series from './pages/Series';

import './App.css'


function App() {


  return (
    <FavoritesProvider>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movie/:id' element={<MovieDetail />}/>
      <Route path='/series/:id' element={<SeriesDetail />}/>
      <Route path='/favorites' element={<FavoritesPage />}/>
      <Route path='/movies' element={<Movies />}/>
      <Route path='/series' element={<Series />}/>

    </Routes>
    </FavoritesProvider>
  )
}

export default App
