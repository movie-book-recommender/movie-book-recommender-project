import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Card, CardContent, CardMedia, Stack } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";

import image from "../assets/NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";
import { updateCookies } from "../pages/Ratings";
import { updateWishlist } from "../pages/WishList";
import Items from "../Carusel";
import "../css/App.css";

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
        `http://128.214.253.51:3000/dbgetforgivenmovierecommendedmoviesalldata?movieid=${id}`
      )
      .then((response) => {
        setMovies(response.data);
      });
  }, [id]);
  return movies;
};

const GetRecommendedBooksByID = (id) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbgetrecommendedbooksalldataforgivenmovie?movieid=${id}`
      )
      .then((response) => {
        setBooks(response.data);
      });
  }, [id]);
  return books;
};

const Movie = () => {
  //Gets the movieid from the url
  //The form for url is e.g. .../movie/12345
  //where 12345 refers to movie's id.
  var urlString = window.location.href;
  var parseHelper = urlString.split("/movie/");
  var movieId = parseHelper[1];

  const movie = GetMovieByID(movieId);
  const [showMoreActors, setShowMoreActors] = useState(false);
  const [showMorePlot, setShowMorePlot] = useState(false);
  const recommendedMovies = GetRecommendedMoviesByID(movieId);
  const recommendedBooks = GetRecommendedBooksByID(movieId);

  const [stars, setStars] = useState(0);
  useEffect(() => {
    setStars(getCookie("M", movieId));
  }, [movieId]);

  const ratingStars = {
    key: stars,
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie("M", movieId, newValue, 5);
      updateCookies();
      setStars(newValue);
    },
  };

  const removeRating = (borm, movieId) => {
    setCookie(borm, movieId, 0, 5);
    updateCookies();
    setStars(0);
  };

  const isRated = () => {
    if (ratingStars.value === 0) {
      return <div></div>;
    } else {
      return (
        <Link
          onClick={() => {
            removeRating("M", movieId);
          }}
        >
          <button class="btn warning">Remove rating</button>
        </Link>
      );
    }
  };

  var isWishlisted = onWishlist("M", movieId);
  const [heart, setHeart] = useState(false);
  useEffect(() => {
    setHeart(onWishlist("M", movieId));
    console.log("Beep");
  }, [movieId]);

  const heartElement = {
    key: heart,
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist("M", movieId);
      isWishlisted = onWishlist("M", movieId);
      updateWishlist();
      setHeart(isWishlisted);
    },
  };

  if (movie.length === 0) {
    return (
      <div className="page-container">
        <h1>No movie found for movieID</h1>
      </div>
    );
  }

  var imageSource = movie.posterpath
    ? `https://image.tmdb.org/t/p/original${movie.posterpath}`
    : image;
  const originaltitle = movie.originaltitle ? movie.originaltitle : "-";
  const year = movie.releasedate ? movie.releasedate.split(" ")[3] : "-";
  const runtime = movie.runtime ? movie.runtime : "-";
  const plotsummary = movie.plotsummary ? movie.plotsummary : "-";
  const actors = movie.actors ? movie.actors : "-";
  const genres = movie.genres ? movie.genres.split(",") : [];

  return (
    <div className="movie-page-wrapper">
      <h1>{movie.title}</h1>
      <h5>
        {originaltitle} • {year} • {runtime} min
      </h5>
      <Card class="movie" sx={{ maxWidth: 200 }}>
        <CardMedia>
          <img class="large-item-pic" src={imageSource} alt="movie-poster" />
          <div
            class="heart"
            style={{ width: "2rem", position: "relative", top: -300, left: 5 }}
          >
            <Heart
              {...heartElement}
              style={{ fill: heart ? "red" : "grey", stroke: "black" }}
            />
          </div>
        </CardMedia>
        <CardContent>
          <h3>Your rating:</h3>
          <ReactStars {...ratingStars} />
          <div>{isRated()}</div>
          <Link
            to={`https://youtube.com/watch?v=${movie.youtubetrailerids}`}
            target="_blank"
            rel="noreferrer"
          >
            <button class="btn">Watch movie trailer</button>
          </Link>
        </CardContent>
      </Card>
      <div class="box">
        <Stack direction="row" spacing={1}>
          {genres.map((genre) => (
            <Chip
              label={genre}
              variant="outlined"
              style={{ color: "#003249", borderColor: "#003249" }}
            />
          ))}
        </Stack>
        <h3>Summary of the plot:</h3>
        <p>
          {showMorePlot ? plotsummary : `${plotsummary.substring(0, 250)}`}
          <Link
            class="show-more-less"
            onClick={() => setShowMorePlot(!showMorePlot)}
          >
            {showMorePlot ? "Show less" : "Show more"}
          </Link>
        </p>
        <h3>Actors:</h3>
        <p>
          {showMoreActors ? actors : `${actors.substring(0, 100)}`}
          <Link
            class="show-more-less"
            onClick={() => setShowMoreActors(!showMoreActors)}
          >
            {showMoreActors ? "Show less" : "Show more"}
          </Link>
        </p>
        <h3>Directors:</h3>
        <p>{movie.directors}</p>
      </div>

      <div class="similar-movies">
        <h3>Similar movies</h3>
        {recommendedMovies.length > 0 ? (
          <Items
            items={recommendedMovies}
            page={"movies"}
            size={"small-item-pic"}
          />
        ) : (
          <p>could not find similar movies</p>
        )}
      </div>

      <div class="similar-books">
        <h3>Similiar books</h3>
        {recommendedBooks.length > 0 ? (
          <Items
            items={recommendedBooks}
            page={"books"}
            recommendation={true}
            size={"small-item-pic"}
          />
        ) : (
          <p>could not find similiar books</p>
        )}
      </div>
    </div>
  );
};

export { Movie, GetMovieByID };
