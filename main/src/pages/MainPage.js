import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { getCookies } from "../Cookies";
import loading from "../Loading.webm";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Items from "../Carusel";

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestbooks")
      .then((response) => {
        setBooks(response.data);
      });
  }, []);
  return books;
};

const GetMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestpublishedmovies")
      .then((response) => {
        setMovies(response.data);
      });
  }, []);
  return movies;
};

const LoadingAnimation = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (
      recommendations.length === 0 &&
      recommendations.value !== "not available"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  if (show) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <video loop width="600" height="auto" autoPlay muted>
          <source src={loading} type="video/webm" />
        </video>
      </Box>
    );
  }
};
const GetPersonalRecommendations = () => {
  // const [recBooks, setRecBooks] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  var bookRatings = getCookies("B");
  var movieRatings = getCookies("M");
  const ratings = {
    Books: bookRatings,
    Movies: movieRatings,
  };

  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbgetpersonalmovierecommendations?ratings=${JSON.stringify(
          ratings
        )}`
      )
      .then((response) => {
        setRecMovies(response.data);
      });
  }, []);
  return recMovies;
};
var recommendations = {};
const MainPage = ({ page }) => {
  const books = GetBooks();
  const movies = GetMovies();
  recommendations = GetPersonalRecommendations();

  if (recommendations.value === "not available") {
    return (
      <div className="page-container">
        <h2>Top 10 newest {page}</h2>
        {page === "movies" ? (
          <Items items={movies} page={page} />
        ) : (
          <Items items={books} page={page} />
        )}
        <h2>Recommended movies for you</h2>
        <p>
          Please rate at least one movie and one book to receive personal
          recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Top 10 newest {page}</h2>
      {page === "movies" ? (
        <Items items={movies} page={page} />
      ) : (
        <Items items={books} page={page} />
      )}
      <h2>Recommended movies for you</h2>
      <LoadingAnimation />
      <Items items={recommendations} page={"movies"} recommendation={true} />
    </div>
  );
};

export default MainPage;
