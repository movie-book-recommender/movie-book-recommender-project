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

function setCookie(movieid, rating, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = movieid + "=" + rating + ";" + expires + ";path=/";
}

function getCookie(movieid) {
  let name = movieid + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let movId = 0

const ratingStars = {
  size: 40,
  count: 5,
  isHalf: false,
  value: 0,
  onChange: newValue => {
    setCookie(movId, newValue, 5)
    console.log(`Example 3: new value is ${newValue}`);
  }
};

const Movie = ({ movie }) => {
  movId = movie.movieid
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