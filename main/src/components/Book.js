import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import image from "../NoImage.jpg";
import { getCookie, setCookie } from "../Cookies.js";
import { updateCookies } from "../pages/Ratings";
import Items from "../Carusel";

const removeRating = (borm, id) => {
  setCookie(borm, id, 0, 5);
  updateCookies();
};

const GetBookByID = (id) => {
  const [book, setbook] = useState([]);
  useEffect(() => {
    axios
      .get(`http://128.214.253.51:3000/dbgetgivenbookdata?bookid=${id}`)
      .then((response) => {
        setbook(response.data);
      });
  }, []);
  return book;
};
const GetBookRecommendationsByID = (id) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000/dbgetforgivenbookrecommendedbooksalldata?bookid=${id}`
      )
      .then((response) => {
        setBooks(response.data);
      });
  }, []);
  return books;
};

const Book = () => {
  var urlString = window.location.href;
  var parseHelper = urlString.split("/book/");
  var id = parseHelper[1];

  const book = GetBookByID(id);
  const recommendationsBooks = GetBookRecommendationsByID(id);
  var bookId = id;
  var stars = getCookie(bookId);

  const ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie("B", bookId, newValue, 5);
      updateCookies();
    },
  };

  if (book.length === 0) {
    return (
      <div className="page-container">
        <h1>No book found for BookID</h1>
      </div>
    );
  }
  var imageSource = book.img;
  if (book.img === null) {
    imageSource = image;
  }
  return (
    <div className="page-container">
      <h1>{book.title}</h1>
      <div>
        <img src={imageSource} width={150} height={"auto"} alt="book poster" />
      </div>
      <h3>Your rating:</h3>
      <ReactStars {...ratingStars} />
      <Link
        onClick={() => {
          removeRating("B", id);
        }}
      >
        <p>Remove rating</p>
      </Link>
      <h3>Authors:</h3>
      <p>{book.authors}</p>
      <h3>Year:</h3>
      <p>{book.year}</p>

      <h3>Description:</h3>
      <p>{book.description}</p>

      <a href={`${book.url}`} target="_blank" rel="noreferrer">
        <p>Book</p>
      </a>

      <h3>Similar books</h3>

      {recommendationsBooks.length > 0 ? (
        <Items items={recommendationsBooks} page={"books"} />
      ) : (
        <p>could not find similar books</p>
      )}
    </div>
  );
};

export { Book, GetBookByID };
