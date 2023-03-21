import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";
import image from "../NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";
import { updateCookies } from "../pages/Ratings";
import Items from "../Carusel";
import { updateWishlist } from "../pages/WishList";

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
  }, [id]);
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
  }, [id]);
  return books;
};

const GetMovieRecommendationsByID = (id) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000//dbgetrecommendedmoviesalldataforgivenbook?bookid=${id}`
      )
      .then((response) => {
        setMovies(response.data);
      });
  }, [id]);
  return movies;
};

const Book = () => {
  var urlString = window.location.href;
  var parseHelper = urlString.split("/book/");
  var id = parseHelper[1];

  const book = GetBookByID(id);
  const recommendationsBooks = GetBookRecommendationsByID(id);
  const recommendationsMovies = GetMovieRecommendationsByID(id);
  var bookId = id;
  var stars = getCookie("B", bookId);

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

  var isWishlisted = onWishlist("B", bookId);
  const [heart, setHeart] = useState(isWishlisted)
  const heartElement = {
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist("B", bookId);
      isWishlisted = onWishlist("B", bookId);
      updateWishlist();
      setHeart(isWishlisted)
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

  const isRated = () =>{
    if(ratingStars.value === 0){
      return (
        <div></div>
      )
    }else{
      return (
        <Link onClick={() =>{removeRating("B", id)}}>
          <p>Remove rating</p>
        </Link>
      )
    }
  }

  return (
    <div className="page-container">
      <h1>{book.title}</h1>
      <div>
        <img src={imageSource} height={250} width={"auto"} alt="book poster" />
      </div>
      <h3>Your rating:</h3>
      <div>{isRated()}</div>
      <ReactStars {...ratingStars} />
      <div class="heart" style={{ width: "2rem" }}>
        <Heart {...heartElement} />
      </div>
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
        <Items items={recommendationsBooks} page={"books"} recommendation={true} />
      ) : (
        <p>could not find similar books</p>
      )}
      <h3>Similar movies</h3>
      {recommendationsMovies.length > 0 ? (
        <Items items={recommendationsMovies} page={"movies"} recommendation={true}/>
      ) : (
        <p>could not find similiar movies</p>
      )}
    </div>
  );
};

export { Book, GetBookByID };
