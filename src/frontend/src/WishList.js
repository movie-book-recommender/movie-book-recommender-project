import axios from 'axios'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component"

import image from './NoImage.jpg'
import { getCookies, getWishlist } from './Cookies.js'
import { GetMovieByID } from './Movie'

var cookies = getWishlist()

const DisplayMovie = ({id, rating}) => {
  const movie = GetMovieByID(id)
  if(cookies.length < 1){
    return(<h3>You have not rated any movies yet!</h3>)
  }
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

const WishList = () => {
  
  return(
  <div class="page-container">
    <h2>MyRatings</h2>
    <div>
      {cookies.map(cookie => <ul key={cookie[0]}><DisplayMovie id={cookie[0]} rating={cookie[1]}/></ul>)}
    </div>  
    
  </div>
  )
}

export default WishList
