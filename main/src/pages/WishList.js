const Wishlist = () => (
  <div class="page-container">
    <h2>WishList</h2>
  </div>
)
export default Wishlist
import axios from 'axios'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component"

import image from '../NoImage.jpg'
import { getCookies, getCookie, getStringOfWishlist, onWishlist, addToWishlist } from '../Cookies.js'
import { GetMovieByID } from '../components/Movie'
import { GetBookByID } from '../components/Book'
import Heart from 'react-heart'

var cookies = getStringOfWishlist().split('&')
cookies.pop()
const DisplayMovie = ({id}) => {
  const movie = GetMovieByID(id)
  if(cookies.length < 1){
    return(<h3>You have not rated any movies yet!</h3>)
  }

  var rating = getCookie("M", id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };

  var isWishlisted = onWishlist(id)
  const heartElement = {
    animationTrigger: "hover",
    isActive: isWishlisted,
    onClick: () => {
      addToWishlist(id)
      isWishlisted = onWishlist(id)
    },
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
      <div style={{ width: "2rem"}}>
        <Heart {...heartElement}/>
      </div>
    </div>
  )
}

const WishList = () => {
  
  return(
  <div class="page-container">
    <h2>MyRatings</h2>
    <div>
      {cookies.map(cookie => <ul key={cookie}><DisplayMovie id={cookie} /></ul>)}
    </div>  
    
  </div>
  )
}

export default WishList
