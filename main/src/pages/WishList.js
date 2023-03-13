import { Link } from "react-router-dom"
import { useState } from "react"
import ReactStars from "react-rating-stars-component"
import Heart from "react-heart"

import image from '../NoImage.jpg'
import { getCookie, getStringOfWishlist, onWishlist, addToWishlist } from '../Cookies.js'
import { GetMovieByID } from '../components/Movie'
import { useState } from "react"


var cookies = getStringOfWishlist().split('&')
cookies.pop()

const updateWishlist = () => {
  cookies = getStringOfWishlist().split('&')
  cookies.pop()
}
const DisplayMovie = ({id}) => {
  console.log(cookies)
  const movie = GetMovieByID(id)
  if(cookies.length < 1){
    return(<h3>No movies on Wishlist!</h3>)
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
  const [heart, setHeart] = useState(isWishlisted)
  const heartElement = {
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist(id)
      isWishlisted = onWishlist(id)
      updateWishlist()
      setHeart(isWishlisted)
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
      <div class="heart" style={{ width: "2rem"}}>
        <Heart {...heartElement}/>
      </div>
    </div>
  )
}

const Wishlist = () => {
  
  return(
  <div class="page-container">
    <h2>My wishlist</h2>
    <div>
      {cookies.map(cookie => <DisplayMovie id={cookie} />)}
    </div>  
    
  </div>
  )
}

export { Wishlist, updateWishlist };
