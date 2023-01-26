import axios from 'axios'
import { useState, useEffect } from 'react'


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

const Movie = ({ movie }) => {
  
  return (
    <div class="page-container">
      <h1>{movie.title}</h1>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${movie.posterpath}`} width={150} height={"auto"}/>
      </div>
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