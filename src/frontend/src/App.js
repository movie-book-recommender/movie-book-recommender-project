import { useState, useEffect } from 'react'
import './css/App.css'
import {
  Routes, Route, Link, useMatch
} from "react-router-dom"

import axios from 'axios'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';

import Movie from './Movie'
import Ratings from './Ratings'
import Wishlist from './WishList'

const Menu = () => {
  return (
    <div class="navbar">
      <Link to="/" data-link="ItemLens">ItemLens</Link>
      <Link to="/wishlist" data-link="Wishlist">Wishlist</Link>
      <Link to="/ratings" data-link="Ratings">Ratings</Link>
    </div>
  )
}

const Movies = ({ movies }) => (
  <div class="page-container">
    <h2>Top 10 movies in 2020</h2>
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={true}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 6
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 3
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={4}
      swipeable
    >
      {movies.map(movie =>
          <div class="movie-slot">
            <div  class='movie-pic' key={movie.id} >
              <Link to={`/movie/${movie.movieid}`}>
              <a href="/"></a><img src={"https://image.tmdb.org/t/p/original"+movie.posterpath} img/>
              </Link>
            </div>
            <div class="movie-info">
              <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
            </div>
          </div>)}
    </Carousel>
    <Search />
  </div>
)


const Search = () => (
  <form action="/search" method="GET">
      <label for="search">Search movies </label>
      <input type="search" id ="search" name="query" placeholder="Search movies"/>
      <button type="submit" value="submit">Search</button>
  </form>
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
        <Route path="/movie/:id" element={<Movie movie={movie} />} />
      </Routes>

    </div>
  )
}

export default App
