import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";

import "../css/Ratings.css";
import image from "../NoImage.jpg";
import { getCookies, setCookie, removeAllRatings } from "../Cookies.js";
import { GetMovieByID } from "../components/Movie";
import { GetBookByID } from "../components/Book";
import Table from "../Table"

var cookiesB = getCookies("B");
var cookiesM = getCookies("M");
const updateCookies = () =>{
  console.log("cookies updated")
  cookiesB = getCookies("B")
  cookiesM = getCookies("M")
}

const DisplayMovie = ({ id, rating }) => {
  const movie = GetMovieByID(id);
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: rating,
    onChange: (newValue) => {
      setCookie("M", id, newValue, 5);
      updateCookies()
    }
  };
  var imageSource = `https://image.tmdb.org/t/p/original${movie.posterpath}`;
  if (movie.posterpath === null) {
    imageSource = image;
  }
  const removeRating = (borm, id) =>{
    setCookie(borm, id, 0, 5)
    updateCookies()
  }
  return (
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/movie/${movie.movieid}`}>
          <img src={imageSource} width={150} height={"auto"} />
        </Link> 
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/movie/${movie.movieid}`}>{movie.title}</Link>
        </div>
        <div class="table-item-rate">
          <ReactStars {...ratingStars} />
        </div>     
          
        <Link onClick={() =>{removeRating("M", id)}}>
          <p>Remove rating</p>  
        </Link>
      </div>
    </div>
  );
};

const DisplayBook = ({ id, rating }) =>{
  const book = GetBookByID(id)
  var ratingStars = {
    size: 40,
    count: 5,
    isHalf: false,
    value: parseInt(rating),
    onChange: (newValue) => {
      setCookie("B", id, newValue, 5);
      updateCookies()
    }  
  };
  var imageSource = book.img
  if(book.img === null){
    imageSource = image
  }

  const removeRating = (borm, id) =>{
    setCookie(borm, id, 0, 5)
    updateCookies()
  } 

  return(
    <div class="table-item">
      <div class="table-item-pic">
        <Link to={`/book/${book.item_id}`}>
          <img src={imageSource} height={250} width={"auto"} />
        </Link> 
      </div>
      <div class="table-item-info">
        <div class="table-item-title">
          <Link to={`/movie/${book.item_id}`}>{book.title}</Link>
        </div>
        <div class="table-item-rate">
          <ReactStars {...ratingStars} />
        </div>     
          
        <Link onClick={() =>{removeRating("B", id)}}>
          <p>Remove rating</p>  
        </Link>
      </div>
    </div>
  )
}


const Ratings = ({ page }) => {
  const [open, setOpen] = useState(false)
  const [removedMovieCookie, setRemMovie] = useState([])
  const [removedBookCookie, setRemBook] = useState([])
  const removeAll = (borm) => {
    setRemMovie(getCookies("M"))
    setRemBook(getCookies("B"))
    removeAllRatings(borm)
    updateCookies()
    setOpen(true)
  }
  const undoRemove = (borm) =>{
    if(borm === "B"){
      for(let i = 0;i<removedBookCookie.length; i++){
        setCookie(borm, removedBookCookie[i][0], removedBookCookie[i][1], 5)
      }
      updateCookies()
      closeModal()
    }else{
      for(let i = 0;i<removedMovieCookie.length; i++){
        setCookie(borm, removedMovieCookie[i][0], removedMovieCookie[i][1], 5)
      }
      updateCookies()
      closeModal()
    }

  }
  const closeModal = () => {
    setOpen(false)
  }

  const Render = () =>{
    let books = cookiesB.map((cookie) => <DisplayBook id={cookie[0]} rating={cookie[1]} key={cookie[0]}/>)
    let movies = cookiesM.map((cookie) => <DisplayMovie id={cookie[0]} rating={cookie[1]} key={cookie[0]}/>)
    return (
      <div>
        <div class="rowC">
          <RenderMovies/>
          <RenderBooks/>
        </div>
        <Table movies={movies} books={books}/>
      </div>
    );
  }
  
  const RenderMovies = () =>{
    if (cookiesM.length === 0) {
      <Box sx={{textAlign:'center'}}>
        <h2>My movie ratings</h2>
      </Box>
      return (
        <div>
          <h3>You have not rated any movies yet!</h3>
          <Modal open={open} closeOnDocumentClick onClose={closeModal}>        
            <Box sx={{
              color: 'black',
              bgcolor: 'white',
              width: 500,
              heigh: 400,
              border: 2,
              mx: 'auto',
              textAlign: 'center',
              }}
            >               
              <p>Removed all ratings for movies</p>
              <Link onClick={() =>{undoRemove("M")}}>Undo</Link> 
              <p><i><small>Click anywhere to close</small></i></p>      
            </Box>      
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <div class="rowC">
          <h2>You have rated {cookiesM.length} movies</h2>
          <Button onClick={() =>{removeAll("M")}}>
            <p>Remove all movie ratings</p>
          </Button>
          </div>
      </div>
    )
  }

  const RenderBooks = () =>{
    if (cookiesB.length === 0) {
      <Box sx={{textAlign:'center'}}>
        <h2>My book ratings</h2>
      </Box>
      return (
        <div>
          <h3>You have not rated any books yet!</h3>
          <Modal open={open} disableAutoFocus={false} closeOnDocumentClick onClose={closeModal}>        
            <Box sx={{
              color: 'black',
              bgcolor: 'white',
              width: 500,
              heigh: 400,
              border: 2,
              mx: 'auto',
              textAlign: 'center',
              }}
            >               
              <p>Removed all ratings for books</p>
              <Link onClick={() =>{undoRemove("B")}}>Undo</Link> 
              <p><i><small>Click anywhere to close</small></i></p>    
            </Box>      
          </Modal>
        </div>
      );
    }
    return(
      <div>
        <div class="rowC">
          <h2>You have rated {cookiesB.length} books.</h2>
          <Button onClick={() =>{removeAll("B")}}>
            Remove all book ratings
          </Button>
        </div>
      </div>
      );
  }

  return (
    <div>
      <Render/> 
    </div>
  )
};

export { Ratings, updateCookies };
