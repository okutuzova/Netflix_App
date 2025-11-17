import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './providers/FavoritesProvider';
import FavoritesPage from './pages/FavoritesPage';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

import './App.css'


function App() {


  return (
    <FavoritesProvider>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movie/:id' element={<MovieDetail />}/>
      <Route path='/favorites' element={<FavoritesPage />}/>
      {/* <Route path='/movies' element={< />}/> */}
      {/* <Route path='/series' element={< />}/> */}

    </Routes>
    </FavoritesProvider>
  )
}

export default App
