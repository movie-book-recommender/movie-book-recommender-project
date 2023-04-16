import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material"
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";

import Items from "../Carusel";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";
import image from "../NoImage.jpg";
import { updateCookies } from "../pages/Ratings";
import { updateWishlist } from "../pages/WishList";

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

const GetBooksByAuthor = (author) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios
      .get(
        `http://128.214.253.51:3000//dbsearchbooksbyauthor?input=${author}`
      )
      .then((response) => {
        setBooks(response.data)
      })
  }, [author])
  return books
}

const Book = () => {
  //Gets the bookid from the url
  //The form for url is e.g. .../book/12345
  //where 12345 refers to book's id.
  var urlString = window.location.href;
  var parseHelper = urlString.split("/book/");
  var bookId = parseHelper[1];

  const book = GetBookByID(bookId);
  const recommendationsBooks = GetBookRecommendationsByID(bookId);
  const recommendationsMovies = GetMovieRecommendationsByID(bookId);
  const sameAuthor = GetBooksByAuthor(book.authors).filter(book => book.item_id.toString() !== bookId)
  var [showMorePlot, setShowMorePlot] = useState(false)

  const [stars, setStars] = useState(0)
  useEffect(() =>{
    setStars(getCookie("B", bookId))
  })
  const ratingStars = {
    key: stars,
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie("B", bookId, newValue, 5);
      updateCookies();
      setStars(newValue)
    },
  };

  const removeRating = (borm, id) => {
    setCookie(borm, id, 0, 5);
    updateCookies();
    setStars(0)
  };

  const isRated = () =>{
    if(ratingStars.value === 0){
      return (
        <div></div>
      )
    }else{
      return (
        <Link onClick={() =>{removeRating("M", bookId)}}>
          <button class="btn warning">
            Remove rating
          </button>
        </Link>
      )
    }
  }

  var isWishlisted = onWishlist("B", bookId);
  const [heart, setHeart] = useState(false)
  useEffect(() =>{
    setHeart(onWishlist("B", bookId))
  })
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

  const imageSource = book.img ? book.img : image
  const description = book.description ? book.description.replace(/\\n/g, ' ').replace(/\\"/g, '"') : "-"

  return (
    <div className="book-page-wrapper">
      <h1>{book.title}</h1>
      <h5>Published in {book.year}</h5>
      <Card class="book" sx={{ maxWidth: 200 }}>
        <CardMedia>
          <img class="large-item-pic" src={imageSource} alt="movie-poster" />
          <div class="heart" style={{ width: "2rem", position: "relative", top: -300, left: 5 }}>
            <Heart {...heartElement} style = {{fill: heart ? "red": "grey", stroke: "black"}} />
          </div>
        </CardMedia>
        <CardContent>
          <h3>Your rating:</h3>
          <ReactStars {...ratingStars} />
          <div>{isRated()}</div>
        </CardContent>
      </Card>
      <div class="box">
        <h3>Summary of the plot:</h3>
        <p>
          {showMorePlot ? description : `${description.substring(0, 250)}`}
          <Link class="show-more-less" onClick={() => setShowMorePlot(!showMorePlot)}>
            {showMorePlot ? "Show less" : "Show more"}
          </Link>
        </p>
        <h3>Authors:</h3>
        <p>
          {book.authors}
        </p>
      </div>
      <div class="same-author">
        <h3>Other books from author</h3>
        {sameAuthor.length > 0 ? (
          <Items items={sameAuthor} page={"books"} recommendation={false} size ={"small-item-pic"} />
        ) : (
          <p>no other books from author</p>
        )}
      </div>
      <div class="similar-books">
        <h3>Similar books</h3>
        {recommendationsBooks.length > 0 ? (
          <Items items={recommendationsBooks} page={"books"} recommendation={true} size={"small-item-pic"} />
        ) : (
          <p>could not find similar books</p>
        )}
      </div>
      <div class="similar-movies">
        <h3>Similar movies</h3>
        {recommendationsMovies.length > 0 ? (
          <Items items={recommendationsMovies} page={"movies"} recommendation={true} size={"small-item-pic"} />
        ) : (
          <p>could not find similiar movies</p>
        )}
      </div>
    </div>
  )
}

export { Book, GetBookByID };
