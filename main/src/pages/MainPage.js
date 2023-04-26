import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { getRatingChange, setRatingChange } from "./Ratings";
import { getCookies, getRecommended, setRecommended } from "../Cookies";
import loading from "../Loading.webm";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Items from "../Carusel";

// Component to fetch the newest books from the database
const GetBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10highestratedbooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(`Error while fetching books: ${error}`);
      });
  }, []);

  return books;
};

// Component to fetch the newest published movies from the database
const GetMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10highestratedmovies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(`Error while fetching movies: ${error}`);
      });
  }, []);

  return movies;
};

// Component to display the loading animation when showLoading is true
const LoadingAnimation = ({ showLoading }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showLoading);
  }, [showLoading]);

  return show ? (
    <Box sx={{ textAlign: "center" }}>
      <video loop width="600" height="auto" autoPlay muted>
        <source src={loading} type="video/webm" />
      </video>
    </Box>
  ) : null;
};

// Get the cookies for book and movie ratings
let bookRatings = getCookies("B");
let movieRatings = getCookies("M");
let ratings = { Books: bookRatings, Movies: movieRatings };

// Update the ratings object with the current cookies
const updateRatings = () => {
  bookRatings = getCookies("B");
  movieRatings = getCookies("M");
  ratings = { Books: bookRatings, Movies: movieRatings };
};

// DisplayTitle component
const DisplayTitle = ({ text }) => {
  const [show, setShow] = useState(true);

  // Hide or show component based on showLoading prop
  useEffect(() => {
    setShow(!showLoading);
  }, [showLoading]);

  // Render component if show is true
  if (show) {
    return <h2>{text}</h2>;
  }
};

// Initialize showLoading variable
let showLoading = false;

// UpdateRecommendations component
const UpdateRecommendations = () => {
  const [update, setUpdate] = useState(false);
  const [recievedMovies, setRecievedMovies] = useState([]);
  const [recievedBooks, setRecievedBooks] = useState([]);

  // Fetch recommended movies and books from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set showLoading to true
        showLoading = true;

        // Make API request
        const response = await axios.get(
          `http://128.214.253.51:3000/dbgetpersonalrecommendations?ratings=${JSON.stringify(
            ratings
          )}`
        );

        // If response contains data
        if (response.data.value !== "not available") {
          // Extract movie and book data from response
          const infoMovies = response.data.movies.map(
            (movie) =>
              `${movie.movieid.toString()}%${movie.title.toString()}%${
                movie.posterpath === null ? "null" : movie.posterpath.toString()
              }`
          );
          const infoBooks = response.data.books.map(
            (book) =>
              `${book.item_id.toString()}%${book.title.toString()}%${
                book.img === null ? "null" : book.img.toString()
              }`
          );

          // Set recommended movies and books in localStorage
          setRecommended("M", infoMovies);
          setRecommended("B", infoBooks);

          // Set showLoading to false
          showLoading = false;

          // Update state with received movie and book data
          setRecievedMovies(getRecommended("M"));
          setRecievedBooks(getRecommended("B"));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch data when update state changes
    fetchData();
  }, [update]);

  // Update state when Update button is clicked
  const Update = () => {
    setRatingChange(false);
    setButton(true);
    setRecievedMovies([]);
    setRecievedBooks([]);
    showLoading = true;
    updateRatings();
    setUpdate(!update);
  };

  const [disableButton, setButton] = useState(true);

  // Enable or disable Update button based on rating change state
  useEffect(() => {
    setButton(!getRatingChange());
  }, []);

  // Render component
  return (
    <div>
      <Button variant="contained" disabled={disableButton} onClick={Update}>
        Update
      </Button>
      <DisplayTitle text={"Recommended movies for you"} />
      {showLoading && <LoadingAnimation />}
      <Items
        items={recievedMovies}
        page={"movies"}
        recommendation={true}
        size={"medium-item-pic"}
      />
      <DisplayTitle text={"Recommended books for you"} />
      <Items
        items={recievedBooks}
        page={"books"}
        recommendation={true}
        size={"medium-item-pic"}
      />
    </div>
  );
};

const MainPage = () => {
  // Get the list of books and movies
  const books = GetBooks();
  const movies = GetMovies();

  // If the user has not rated any books or movies yet, display the newest items and a message asking them to rate items
  if (bookRatings.length === 0 && movieRatings.length === 0) {
    updateRatings(); // Update ratings to get personal recommendations
    return (
      <div className="page-container">
        <h2>Highest rated movies</h2>
        <Items items={movies} page={"movies"} size={"medium-item-pic"} />
        <h2>Highest rated books</h2>
        <Items items={books} page={"books"} size={"medium-item-pic"} />
        <p>
          Please rate at least one movie and one book to receive personal
          recommendations.
        </p>
      </div>
    );
  }

  // If the user has rated at least one book or movie, display the highest rated items and an option to update recommendations
  return (
    <div className="page-container">
      <h2>Highest rated movies</h2>
      <Items items={movies} page={"movies"} size={"medium-item-pic"} />
      <h2>Highest rated books</h2>
      <Items items={books} page={"books"} size={"medium-item-pic"} />
      <UpdateRecommendations />
    </div>
  );
};

export default MainPage;
