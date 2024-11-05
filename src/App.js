import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutView from './components/AboutView';
import SearchView from './components/SearchView';
import {Routes, Route} from 'react-router-dom';
import MovieView from './components/MovieView'
import ErrorPage from './components/ErrorPage';
import NowPlaying from './components/NowPlaying';
import './App.css';



function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if(searchText) {
      console.log(searchText, "is the search text")
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=6faaf6c16fc5c06d8fdda4d165741722&query=${searchText}&include_adult=false&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results)
          console.log(data)
        })
    }
    
  }, [searchText])

  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/nowplaying" element={<NowPlaying />} />
        <Route
        element={<SearchView keyword = {searchText} searchResults = {searchResults}/>}
        path="/search"
        />
         <Route path="/movies/:id" element={<MovieView />} />
         <Route path = "*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
