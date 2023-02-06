import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactStars from "react-rating-stars-component"



const GetMovieByID = (id) => {
  const [movie, setMovie] = useState([])

  useEffect(() => {   axios
    .get(`http://128.214.253.51:3000/dbgetgivenmoviedata?movieid=${id}`)
    .then(response => {
      setMovie(response.data)
    })
  }, []);
  return (movie)
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
var getCookies = function(){
  var pairs = document.cookie.split(";")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=")
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    pair[0] = pair[0].substring(1)
    cookies[i] = pair;
  }
  return cookies;
}

var cookies = getCookies()


const DisplayMovie = ({id, rating}) => {
  const movie = GetMovieByID(id)
  if(cookies[0][0]=== ''){
    return(<h3>You have not rated any movies yet!</h3>)
  }
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    edit: false
  };
  return(
    <div>
       <div>
        <img src={`https://image.tmdb.org/t/p/original${movie.posterpath}`} width={150} height={"auto"}/>
      </div>
      <h3>{movie.title}</h3>
      <ReactStars {...ratingStars} />
    </div>
  )
}

const Ratings = () => {
  
  return(
  <div class="page-container">
    <h2>MyRatings</h2>
    <div>
      {cookies.map(cookie => <ul key={cookie[0]}><DisplayMovie id={cookie[0]} rating={cookie[1]}/></ul>)}
    </div>  
    
  </div>
  )
}

export default Ratings