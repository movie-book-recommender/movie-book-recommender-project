import axios from 'axios'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component"

import image from './NoImage.jpg'
import { getCookies } from './Cookies.js'
import { GetMovieByID } from './Movie'

var cookies = getCookies()

const DisplayMovie = ({id, rating}) => {
  const movie = GetMovieByID(id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`
  if(movie.posterpath === null){
    imageSource = image
  }
  return(
    <div>
      <Link to={`/movie/${movie.movieid}`}>
        <img src={imageSource} width={150} height={"auto"}/>
      </Link>
      <h3>{movie.title}</h3>
      <ReactStars {...ratingStars} />
    </div>
  )
}

const Ratings = () => {
  if(cookies.length === 0){
    return(<h3>You have not rated any movies yet!</h3>)
  }
  return(
  <div class="page-container">
    <h2>MyRatings</h2>
    <h3>You have rated {cookies.length} movies.</h3>
    <div>
      {cookies.map(cookie => <DisplayMovie id={cookie[0]} rating={cookie[1]}/>)}
    </div>  
    
  </div>
  )
}

export default Ratings