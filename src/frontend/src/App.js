import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const Home = () => {
  const [movies, setMovies] = useState([])  
  useEffect(() => {    axios
    .get('http://128.214.253.51:3000/dbgettop10moviesbyyear?year=2006')
    .then(response => {
      setMovies(response.data)
    })
}, []);
  return (
    <div class="page-container">
      <h2>The current time is {movies.map(
        movie => <div>{movie.title}</div>
      )}</h2>
      <div>
        <p>
          You are currently lookin Movie Page.
        </p>
        <p>
          Switch to Books?
        </p>
        <Search />
      </div>
    </div>
  )
}

const Ratings = () => (
  <div class="page-container">
    <h2>MyRatings</h2>
  </div>
)

const Wishlist = () => (
  <div class="page-container">
    <h2>WishList</h2>
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
  const [page, setPage] = useState('home')

 const  toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'ItemPage') {
      return <Home />
    } else if (page === 'Ratings') {
      return <Ratings />
    } else if (page === 'WishList') {
      return <Wishlist />
    }
  }

  return (
    <div class="page">
      <div class="navbar">
        <a href="/" onClick={toPage('ItemPage')} data-link="ItemPage">
          ItemPage
        </a>
        <a href="/ratings" onClick={toPage('Ratings')} data-link="Ratings">
          Ratings
        </a>
        <a href="/wishlist" onClick={toPage('WishList')} data-link="WishList">
          WishList
        </a>
      </div>

      {content()}
    </div>
  )
}

export default App;
