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

//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
function setCookie(movieid, rating, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = movieid + "=" + rating + ";" + expires + ";path=/";
}

//Searchers saved cookies for a cookie with the name movieid
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(movieid) {
  let pairs = document.cookie.split(';');
  for(let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0] === movieid){
      console.log(pair)
      return pair[1];
    }
  }
  return 0;
}


const Movie = () => {
  //Gets the movieid from the url
  var urlString = window.location.href
  var parseHelper = urlString.split('/movie/')   
  var id = parseHelper[1]

  const movie = GetMovieByID(id)
  var movId = id
  var stars = getCookie(movId)

  const ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: newValue => {
      setCookie(movId, newValue, 5)
    }
  };
  if(movie === []){
    return(
      <div class="page-container">
        <h1>No movie found for movieID</h1>
      </div>
    )
  }

  return (
    <div class="page-container">
      <h1>{movie.title}</h1>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${movie.posterpath}`} width={150} height={"auto"}/>
      </div>
      <h3>Your rating:</h3>
      <ReactStars {...ratingStars} />
      <h3>Directors:</h3>
      <p>{movie.directors}</p>
      <h3>Actors:</h3>
      <p>{movie.actors}</p>
      <h3>Genres:</h3>
      <p>{movie.genres}</p>
      <h3>Summary of the plot:</h3>
      <p>{movie.plotsummary}</p>


      <a href={`https://youtube.com/watch?v=${movie.youtubetrailerids}`} target="_blank">
        <p>Trailer</p>
      </a>

    </div>
  )
}

export default Movie