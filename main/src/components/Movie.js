// Import required modules and components
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chip, Card, CardContent, CardMedia, Stack } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";
import Items from "../Carusel";
import "../css/App.css";

// Import default image and cookie functions
import image from "../assets/NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";

// Import update functions
import { updateCookies } from "../pages/Ratings";
import { updateWishlist } from "../pages/WishList";

// Fetch single movie data by ID
const getMovieById = (id) => {
  const [movie, setMovie] = useState([]);

  // Sends a GET request to the server to get the movie data
  useEffect(() => {
    axios
      .get(`http://128.214.253.51:3000/dbgetgivenmoviedata?movieid=${id}`)
      .then((response) => {
        setMovie(response.data);
      });
  }, [id]);

  return movie;
};

// Fetch movie recommendations for a single movie by ID
const getRecommendedMoviesById = (id) => {
  const [movies, setMovies] = useState([]);

  // Sends a GET request to the server to get the movie recommendations data
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
// Fetches book recommendations for a single movie by ID
const getRecommendedBooksById = (id) => {
  const [books, setBooks] = useState([]);

  // Sends a GET request to the server to get the book recommendations data
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
  // Get the current URL and split it to extract the movie ID
  const urlString = window.location.href;
  const parseHelper = urlString.split("/movie/");
  const movieId = parseHelper[1];

  // Get the movie details by ID and set states for showing more actors and plot details
  const movie = getMovieById(movieId);
  const [showMoreActors, setShowMoreActors] = useState(false);
  const [showMorePlot, setShowMorePlot] = useState(false);

  // Get recommended movies and books by the movie ID
  const recommendedMovies = getRecommendedMoviesById(movieId);
  const recommendedBooks = getRecommendedBooksById(movieId);

  // Set up state for star ratings using a cookie and handle rating changes
  const [stars, setStars] = useState(0);
  const [heart, setHeart] = useState(false);
  useEffect(() => {
    setHeart(onWishlist("M", movieId));
    setStars(getCookie("M", movieId));
  }, [movieId]);

  // Set up star rating component
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

  // Handle removing a rating
  const removeRating = (borm, movieId) => {
    setCookie(borm, movieId, 0, 5);
    updateCookies();
    setStars(0);
  };

  // Check if a movie has been rated and return a component to remove the rating
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
          <button className="btn warning">Remove rating</button>
        </Link>
      );
    }
  };

  // Set up heart icon component for adding/removing the movie from the wishlist
  const heartElement = {
    key: heart,
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist("M", movieId);
      const isWishlisted = onWishlist("M", movieId);
      updateWishlist();
      setHeart(isWishlisted);
    },
  };

  // If no movie details were returned, display a message
  if (movie.length === 0) {
    return (
      <div className="page-container">
        <h1>No movie found for movieID</h1>
      </div>
    );
  }

  // Get movie details and set default values if they are available
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
    // The following code displays a page for a movie, showing its details and recommended movies and books.
    // Inside this div, there is a section for the movie details, including title, original title, year, runtime, poster image, user rating, summary of the plot, actors, and directors.
    // Below the movie details, there are sections for similar movies and similar books, each displayed using the 'Items' component.

    <div className="movie-page-wrapper">
      {/* Display the movie title */}
      <h1>{movie.title}</h1>

      {/* Display the original title, year, and runtime */}
      <h5>
        {originaltitle} • {year} • {runtime} min
      </h5>

      {/* Display the movie poster image with a heart icon for favoriting */}
      <Card class="movie" sx={{ maxWidth: 200 }}>
        <CardMedia>
          <img class="large-item-pic" src={imageSource} alt="movie-poster" />
          <div
            class="heart"
            style={{ width: "2rem", position: "relative", top: -300, left: 5 }}
          >
            {/* Display the heart icon for favoriting */}
            <Heart
              {...heartElement}
              style={{ fill: heart ? "red" : "grey", stroke: "black" }}
            />
          </div>
        </CardMedia>
        <CardContent>
          {/* Display a star rating component */}
          <h3>Your rating:</h3>
          <ReactStars {...ratingStars} />
          {/* Display the user's rating */}
          <div>{isRated()}</div>
          {/* Link to the movie trailer on YouTube */}
          <Link
            to={`https://youtube.com/watch?v=${movie.youtubetrailerids}`}
            target="_blank"
            rel="noreferrer"
          >
            <button class="btn">Watch movie trailer</button>
          </Link>
        </CardContent>
      </Card>

      {/* Display the movie genres */}
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
        {/* Display the summary of the plot */}
        <h3>Summary of the plot:</h3>
        <p>
          {/* Display only the first 250 characters of the plot summary by default, with an option to show more */}
          {showMorePlot ? plotsummary : `${plotsummary.substring(0, 250)}`}
          <Link
            class="show-more-less"
            onClick={() => setShowMorePlot(!showMorePlot)}
          >
            {showMorePlot ? "Show less" : "Show more"}
          </Link>
        </p>
        {/* Display the actors */}
        <h3>Actors:</h3>
        <p>
          {/* Display only the first 100 characters of the actor names by default, with an option to show more */}
          {showMoreActors ? actors : `${actors.substring(0, 100)}`}
          <Link
            class="show-more-less"
            onClick={() => setShowMoreActors(!showMoreActors)}
          >
            {showMoreActors ? "Show less" : "Show more"}
          </Link>
        </p>
        {/* Display the directors */}
        <h3>Directors:</h3>
        <p>{movie.directors}</p>
      </div>

      {/* Display similar movies */}
      <div class="similar-movies">
        <h3>Similar movies</h3>
        {recommendedMovies.length > 0 ? (
          <Items
            items={recommendedMovies}
            page="movies"
            size="small-item-pic"
          />
        ) : (
          <p>could not find similar movies</p>
        )}
      </div>

      {/* Display similar books */}
      <div class="similar-books">
        <h3>Similar books</h3>
        {recommendedBooks.length > 0 ? (
          <Items
            items={recommendedBooks}
            page="books"
            recommendation={true}
            size="small-item-pic"
          />
        ) : (
          <p>could not find similar books</p>
        )}
      </div>
    </div>
  );
};

export { Movie, getMovieById };
