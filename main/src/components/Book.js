// Import required modules and components
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import Heart from "react-heart";
import Items from "../Carusel";
// Import default image and cookie functions
import image from "../assets/NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";

// Import update functions
import { updateCookies } from "../pages/Ratings";
import { updateWishlist } from "../pages/WishList";

// Fetches a single book by ID
const getBookById = (id) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    // Sends a GET request to the server to get the book data
    axios
      .get(`http://128.214.253.51:3000/dbgetgivenbookdata?bookid=${id}`)
      .then((response) => {
        setBook(response.data);
      });
  }, [id]);

  return book;
};

// Fetches book recommendations for a single book by ID
const getBookRecommendationsById = (id) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Sends a GET request to the server to get the book recommendations data
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

// Fetches movie recommendations for a single book by ID
const getMovieRecommendationsById = (id) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Sends a GET request to the server to get the movie recommendations data
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

// Fetches other books of the given author
const getBooksByAuthor = (author) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`http://128.214.253.51:3000//dbsearchbooksbyauthor?input=${author}`)
      .then((response) => {
        setBooks(response.data);
      });
  }, [author]);
  return books;
};

const Book = () => {
  // Get the current URL and split it to extract the book ID
  const urlString = window.location.href;
  const parseHelper = urlString.split("/book/");
  const bookId = parseHelper[1];

  // Get book information and recommendations
  const book = getBookById(bookId);
  const recommendationsBooks = getBookRecommendationsById(bookId);
  const recommendationsMovies = getMovieRecommendationsById(bookId);

  // Get other books by the same author
  const sameAuthor = getBooksByAuthor(book.authors).filter(
    (b) => b.item_id.toString() !== bookId
  );

  // Set up state variables
  const [showMorePlot, setShowMorePlot] = useState(false);
  const [heart, setHeart] = useState(false);
  const [stars, setStars] = useState(0);
  useEffect(() => {
    setHeart(onWishlist("B", bookId));
    setStars(getCookie("B", bookId));
  }, [bookId]);

  const ratingStars = {
    key: stars,
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie("B", bookId, newValue, 5);
      updateCookies();
      setStars(newValue);
    },
  };

  // Remove rating
  const removeRating = (borm, id) => {
    setCookie(borm, id, 0, 5);
    updateCookies();
    setStars(0);
  };

  // Check if a book has been rated and return a component to remove the rating
  const isRated = () => {
    if (ratingStars.value === 0) {
      return <div></div>;
    } else {
      return (
        <Link
          onClick={() => {
            removeRating("B", bookId);
          }}
        >
          <button className="btn warning">Remove rating</button>
        </Link>
      );
    }
  };

  // Set up heart icon component for adding/removing the movie from the wishlist
  const heartElement = {
    animationTrigger: "hover",
    isActive: heart,
    onClick: () => {
      addToWishlist("B", bookId);
      const isWishlisted = onWishlist("B", bookId);
      updateWishlist();
      setHeart(isWishlisted);
    },
  };

  // If no book details were returned, display a message
  if (book.length === 0) {
    return (
      <div className="page-container">
        <h1>No book found for BookID</h1>
      </div>
    );
  }

  // Get image source and book description
  const imageSource = book.img ? book.img : image;
  const description = book.description
    ? book.description.replace(/\\n/g, " ").replace(/\\"/g, '"')
    : "-";

  return (
    // The following code displays a page for a book, showing its details and recommended movies and books.
    // Inside this div, there is a section for the book details, including title,  publication year, poster image, user rating, summary of the plot, genres and authors.
    // Below the book details, there are sections for similar movies, similar books and other author's published books, each displayed using the 'Items' component.

    <div className="book-page-wrapper">
      {/* Display the book title and publication year */}
      <h1>{book.title}</h1>
      <h5>Published in {book.year}</h5>

      {/* Display the book image, rating, and user's rating */}
      <Card class="book" sx={{ maxWidth: 200 }}>
        <CardMedia>
          <img class="large-item-pic" src={imageSource} alt="movie-poster" />

          {/* Display a heart icon that toggles between filled and empty */}
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
        <CardContent id="visible" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Display a star rating component */}
          <h3>Your rating:</h3>
          <ReactStars {...ratingStars} />

          {/* Display the user's rating */}
          <div>{isRated()}</div>
        </CardContent>
      </Card>

      {/* Display the plot summary */}
      <div class="box">
        <h3>Summary of the plot:</h3>
        <p>
          {/* Conditionally display the full plot summary or a shortened version */}
          {showMorePlot ? description : `${description.substring(0, 250)}`}

          {/* Button to toggle between full and shortened plot summaries */}
          <Link
            class="show-more-less"
            onClick={() => setShowMorePlot(!showMorePlot)}
          >
            {showMorePlot ? "Show less" : "Show more"}
          </Link>
        </p>

        {/* Display the book's authors */}
        <h3>Authors:</h3>
        <p>{book.authors}</p>
      </div>
      <div class="same-author">
        {/* Display other books from this author */}

        <h3>Other books from author</h3>
        {sameAuthor.length > 0 ? (
          <Items
            items={sameAuthor}
            page={"books"}
            recommendation={false}
            size={"small-item-pic"}
          />
        ) : (
          <p>no other books from author</p>
        )}
      </div>
      {/* Display similar books */}

      <div class="similar-books">
        <h3>Similar books</h3>
        {recommendationsBooks.length > 0 ? (
          <Items
            items={recommendationsBooks}
            page="books"
            recommendation={true}
            size="small-item-pic"
          />
        ) : (
          <p>could not find similar books</p>
        )}
      </div>

      {/* Display similar movies */}
      <div class="similar-movies">
        <h3>Similar movies</h3>
        {recommendationsMovies.length > 0 ? (
          <Items
            items={recommendationsMovies}
            page="movies"
            recommendation={true}
            size="small-item-pic"
          />
        ) : (
          <p>could not find similar movies</p>
        )}
      </div>
    </div>
  );
};

export { Book, getBookById };
