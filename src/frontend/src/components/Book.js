import axios from "axios";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import image from "../NoImage.jpg";
import { getCookie, setCookie, onWishlist, addToWishlist } from "../Cookies.js";
import Heart from "react-heart";

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

const Book = () => {
  var urlString = window.location.href;
  var parseHelper = urlString.split("/book/");
  var id = parseHelper[1];

  const book = GetBookByID(id);
  var bookId = id;
  var stars = getCookie(bookId);

  const ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: stars,
    onChange: (newValue) => {
      setCookie(bookId, newValue, 5);
    },
  };
  
  var isWishlisted = onWishlist(bookId);

  const heartElement = {
    isActive: isWishlisted,
    onClick: () => {
      //ADDING BOOKS TO WISHLIST
      //addToWishlist(bookId)
      //isWishlisted = onWishlist(bookId)
    },
  };

  if (book.length === 0) {
    return (
      <div class="page-container">
        <h1>No book found for BookID</h1>
      </div>
    );
  }
  var imageSource = book.img;
  if (book.img === null) {
    imageSource = image;
  }
  return (
    <div class="page-container">
      <h1>{book.title}</h1>
      <div>
        <img src={imageSource} width={150} height={"auto"} alt="book poster" />
      </div>
      <h3>Your rating:</h3>
      <ReactStars {...ratingStars} />
      <div style={{ width: "2rem"}}>
        <Heart {...heartElement}/>
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
    </div>
  );
};

export { Book, GetBookByID };
