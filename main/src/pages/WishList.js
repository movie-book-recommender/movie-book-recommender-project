import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import Heart from "react-heart"

import image from '../NoImage.jpg'
import { getCookie, getStringOfWishlist, onWishlist, addToWishlist } from '../Cookies.js'
import { GetMovieByID } from '../components/Movie'
import { GetBookByID } from "../components/Book"


var cookies = getStringOfWishlist().split('&')
cookies.pop()

const updateWishlist = () => {
  cookies = getStringOfWishlist().split('&')
  cookies.pop()
}
const DisplayItem = ({bormId}) => {
  var borm = bormId.charAt(0)
  var id = bormId.substring(1)
  
  var item = {}
  if (borm === "M") {
    item = GetMovieByID(id)
  } else if (borm === "B") {
    item = GetBookByID(id)
  }

  if(cookies.length < 1){
    return(<h3>No items on Wishlist!</h3>)
  }

  var rating = getCookie(borm, id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };

  var isWishlisted = onWishlist(borm, id)
  const heartElement = {
    animationTrigger: "hover",
    isActive: onWishlist(borm, id),
    onClick: () => {
      addToWishlist(borm, id)
      isWishlisted = onWishlist(borm, id)
      updateWishlist()
    },
  };

  var imageSource = ""
  if (borm === "M") {
    imageSource = `https://image.tmdb.org/t/p/original${item.posterpath}`
  } else if (borm === "B") {
    imageSource = item.img
  }
  if(imageSource === null){
    imageSource = image
  }

  var link = ""
  if (borm === "M") {
    link = `/movie/${id}`
  } else if (borm === "B") {
    link = `/book/${id}`
  }
  return(
    <div>
      <Link to={link}>
        <img src={imageSource} width={150} height={"auto"}/>
      </Link>
      <h3>{item.title}</h3>
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
      {cookies.map(cookie => <DisplayItem bormId={cookie} />)}
    </div>  
    
  </div>
  )
}

export { Wishlist, updateWishlist };
