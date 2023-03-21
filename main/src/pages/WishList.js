import { Link } from "react-router-dom"
import { useState } from "react"
import ReactStars from "react-rating-stars-component"
import Heart from "react-heart"

import image from '../NoImage.jpg'
import { getCookie, getStringOfWishlist, onWishlist, addToWishlist } from '../Cookies.js'
import { GetMovieByID } from '../components/Movie'
import { GetBookByID } from "../components/Book"
import Table from "../Table"


var cookies = getStringOfWishlist().split('&')
cookies.pop()

const updateWishlist = () => {
  cookies = getStringOfWishlist().split('&')
  cookies.pop()
}

const DisplayMovie = ({bormId}) => {
  const borm = bormId.charAt(0)
  const id = bormId.substring(1)
  const movie = GetMovieByID(id)

  const rating = getCookie(borm, id)
  const ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };

  let isWishlisted = onWishlist(borm, id)
  const[heart, setHeart] = useState(isWishlisted)
  const heartElement = {
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist(borm, id, 5)
      isWishlisted = onWishlist(borm, id)
      updateWishlist()
      setHeart(isWishlisted)
    },
  };

  var imageSource = movie.posterpath ? `https://image.tmdb.org/t/p/original${movie.posterpath}` : image

  return(
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} />
        </Link>
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
        </div>
        <div class="table-item-rate">
          Your rate: <ReactStars {...ratingStars} />
        </div>
        <div class="heart" style={{ width: "2rem"}}>
          <Heart {...heartElement}/>
        </div>
      </div>
    </div>
  )
}

const DisplayBook = ({bormId}) => {
  const borm = bormId.charAt(0)
  const id = bormId.substring(1)
  const book = GetBookByID(id)

  var rating = getCookie(borm, id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };

  let isWishlisted = onWishlist(borm, id)
  const[heart, setHeart] = useState(isWishlisted)
  const heartElement = {
    animationTrigger: "hover",
    isActive: onWishlist(borm, id),
    onClick: () => {
      addToWishlist(borm, id)
      isWishlisted = onWishlist(borm, id)
      updateWishlist()
    },
  };

  var imageSource = book.img

  return(
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/book/${book.item_id}`}>
          <img src={imageSource} />
        </Link>
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/book/${book.item_id}`}>{book.title}</Link>
        </div>
        <div class="table-item-rate">
          Your rate: <ReactStars {...ratingStars} />
        </div>
        <div class="heart" style={{ width: "2rem"}}>
          <Heart {...heartElement}/>
        </div>
      </div>
    </div>
  )
}

const Wishlist = () => {
  let movieCookies = cookies.filter(cookie => cookie.charAt(0) === "M")
  let movies = movieCookies.map(cookie => <DisplayMovie bormId={cookie} />)

  let bookCookies = cookies.filter(cookie => cookie.charAt(0) === "B")
  let books = bookCookies.map(cookie => <DisplayBook bormId={cookie} />)

  if (cookies.length > 0){
    return(
        <div class="page-container">
        <h2>My wishlist</h2>
        <Table movies={movies} books={books} />
      </div>
      )
  } else {
    return(
      <div class="page-container">
        <h2>My wishlist</h2>
        <h3>No items on Wishlist!</h3>
      </div>
    )
  }
}

export { Wishlist, updateWishlist };
