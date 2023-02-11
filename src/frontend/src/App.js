import { useState, useEffect } from 'react'
import './css/App.css'
import {
  Routes, Route, Link, useMatch
} from "react-router-dom"

import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';

import { Movie } from './Movie'
import Ratings from './Ratings'
import Wishlist from './WishList'
import Search from './Search'
import Items from './MovieCarusel'
import SearchPage from './SearchPage'



const Menu = () => {
  return (
    <div class="navbar">
      <Link to="/" data-link="ItemLens">ItemLens</Link>
      <Link to="/wishlist" data-link="Wishlist">Wishlist</Link>
      <Link to="/ratings" data-link="Ratings">Ratings</Link>
      <Link to="/search" data-link="Search">Search</Link>
    </div>
  )
}

const Movies = ({ movies }) => (
  
  <div class="page-container">
    <h2>Top 10 movies in 2020</h2>
    <Items items={movies} />
    <Search />
  </div>
)

const App = () => {
  const [movies, setMovies] = useState([])  
  useEffect(() => {    axios
    .get('http://128.214.253.51:3000/dbgettop10moviesbyyear?year=2020')
    .then(response => {
      setMovies(response.data)
    })
}, []);

const match = useMatch('/movie/:id')
const movie = match 
  ? movies.find(movie => movie.movieid === Number(match.params.id))
  : null

  return (
    <div class="page">
      <Menu />
      <Routes>
        <Route path="/" element={<Movies movies={movies} />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>

    </div>
  )
}

export default App
