import axios from "axios";
import { useState, useEffect } from "react";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Items from "../Carusel";
import { getCookies } from "../Cookies";

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

const MainPage = ({ page }) => {
  const books = GetBooks();
  const movies = GetMovies();
  const recommendations = GetPersonalRecommendations();

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
      <Items items={recommendations} page={"movies"} recommendation={true} />
    </div>
  );
};

export default MainPage;
