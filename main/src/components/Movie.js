import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";
import image from "../NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";
import { updateCookies } from "../pages/Ratings";
import { updateWishlist } from "../pages/WishList";
import Items from "../Carusel";

const GetMovieByID = (id) => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios
      .get(`http://128.214.253.51:3000/dbgetgivenmoviedata?movieid=${id}`)
      .then((response) => {
        setMovie(response.data);
      });
  }, [id]);
  return movie;
};
const GetRecommendedMoviesByID = (id) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbgetrecommendationsalldataforgivenmovie?movieid=${id}`
      )
      .then((response) => {
        setMovies(response.data);
      });
  }, [id]);
  return movies;
};

const Movie = () => {
  //Gets the movieid from the url
  var urlString = window.location.href;
  var parseHelper = urlString.split("/movie/");
  var id = parseHelper[1];

  const movie = GetMovieByID(id);
  const recommendedMovies = GetRecommendedMoviesByID(id);
  var movId = id;
  var stars = getCookie("M", movId);

  const ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie("M", movId, newValue, 5);
      updateCookies();
    },
  };
  const removeRating = (borm, id) => {
    setCookie(borm, id, 0, 5);
    updateCookies();
  };

  var isWishlisted = onWishlist("M", movId);

  const [heart, setHeart] = useState(isWishlisted)
  const heartElement = {
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist(movId)
      isWishlisted = onWishlist(movId)
      updateWishlist()
      setHeart(isWishlisted)
    },
  };

  if (movie.length === 0) {
    return (
      <div className="page-container">
        <h1>No movie found for movieID</h1>
      </div>
    );
  }
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  
  const isRated = () =>{
    if(ratingStars.value === 0){
      return (
        <div></div>
      )
    }else{
      return (
        <Link onClick={() =>{removeRating("M", id)}}>
          <p>Remove rating</p>
        </Link>
      )
    }
  }

  return (
    <div className="page-container">
      <h1>{movie.title}</h1>
      <div>
        <img src={imageSource} width={150} height={"auto"} alt="movie-poster" />
      </div>
      <h3>Your rating:</h3>
      <ReactStars {...ratingStars} />
      <div>{isRated()}</div>
      <div class="heart" style={{ width: "2rem"}}>
        <Heart {...heartElement}/>
      </div>
      <h3>Directors:</h3>
      <p>{movie.directors}</p>
      <h3>Actors:</h3>
      <p>{movie.actors}</p>
      <h3>Genres:</h3>
      <p>{movie.genres}</p>
      <h3>Summary of the plot:</h3>
      <p>{movie.plotsummary}</p>

      <a
        href={`https://youtube.com/watch?v=${movie.youtubetrailerids}`}
        target="_blank"
        rel="noreferrer"
      >
        <p>Trailer</p>
      </a>
      <h3>Similar movies</h3>
      {recommendedMovies.length > 0 ? (
        <Items items={recommendedMovies} page={"movies"} />
      ) : (
        <p>could not find similar movies</p>
      )}
    </div>
  );
};

export { Movie, GetMovieByID }
