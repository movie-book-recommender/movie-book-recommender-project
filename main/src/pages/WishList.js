import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import Heart from "react-heart"

import image from '../NoImage.jpg'
import { getCookie, getStringOfWishlist, onWishlist, addToWishlist } from '../Cookies.js'
import { GetMovieByID } from '../components/Movie'


var cookies = getStringOfWishlist().split('&')
cookies.pop()

<<<<<<< HEAD
const updateWishlist = () => {
  cookies = getStringOfWishlist().split('&')
  cookies.pop()
}
=======
>>>>>>> a2a053611c0e48ba0c7646889dfe3dc82231beb0
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
  const heartElement = {
    animationTrigger: "hover",
    isActive: onWishlist(id),
    onClick: () => {
      addToWishlist(id)
      isWishlisted = onWishlist(id)
      updateWishlist()
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
<<<<<<< HEAD
    <h2>My wishlist</h2>
=======
    <h2>Wishlist</h2>
>>>>>>> a2a053611c0e48ba0c7646889dfe3dc82231beb0
    <div>
      {cookies.map(cookie => <DisplayMovie id={cookie} />)}
    </div>  
    
  </div>
  )
}

export { Wishlist, updateWishlist };
