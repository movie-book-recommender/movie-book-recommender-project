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


const GetBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestbooks")
      .then((response) => {
        setBooks(response.data);
      })
  }, [])
  return books
}

const GetMovies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://128.214.253.51:3000/dbgettop10newestpublishedmovies")
      .then((response) => {
        setMovies(response.data);
      })
  }, [])
  return movies
}

const LoadingAnimation = () =>{
  const[show, setShow] = useState(false)
  useEffect(() =>{
    if(showLoading){
      setShow(true)
    }else{
      setShow(false)
    }
  },[showLoading]);
  if (show) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <video loop width="600" height="auto" autoPlay muted>
          <source src={loading} type="video/webm" />
        </video>
      </Box>
    )
  }
}

var bookRatings = getCookies("B")
var movieRatings = getCookies("M")
var ratings = {
  Books: bookRatings,
  Movies: movieRatings
}

const updateRatings = () =>{
  bookRatings = getCookies("B")
  movieRatings = getCookies("M")
  ratings = {
    Books: bookRatings,
    Movies: movieRatings
  }
}

const DisplayTitle = ({text}) =>{
  const[show, setShow] = useState(true)
  useEffect(() =>{
    if(showLoading){
      setShow(false)
    }else{
      setShow(true)
    }
  },[showLoading]);
  if (show){
    return (
      <h2>{text}</h2>
    )
  }
}
var showLoading = false
const UpdateRecommendations = () =>{
  const [update, setUpdate] = useState(false)
  const [recievedMovies, setRecievedMovies] = useState(getRecommended("M"))
  const [recievedBooks, setRecievedBooks] = useState(getRecommended("B"))

  useEffect(() => {
    axios
    .get(`http://128.214.253.51:3000/dbgetpersonalrecommendations?ratings=${JSON.stringify(ratings)}`)
    .then((response) => {
      if(response.data.value !== 'not available'){
        var infoMovies = []
        for(var i = 0; i<response.data.movies.length; i++){
          var posterpath = ""
          if(response.data.movies[i].posterpath === null){
            posterpath = "null"
          }else{
            posterpath = response.data.movies[i].posterpath.toString()
          }
          infoMovies[i] = response.data.movies[i].movieid.toString() + "%" 
                  + response.data.movies[i].title.toString() + "%" 
                  + posterpath
        }
        var infoBooks = []
        for(var i = 0; i<response.data.books.length; i++){
          var image = ""
          if(response.data.books[i].img === null){
            image = "null"
          }else{
            image = response.data.books[i].img.toString()
          }
          infoBooks[i] = response.data.books[i].item_id.toString() + "%" 
                  + response.data.books[i].title.toString() + "%" 
                  + image
        }
        setRecommended("M", infoMovies)
        setRecommended("B", infoBooks)
        showLoading = false
        setRecievedBooks(getRecommended("B"))
        setRecievedMovies(getRecommended("M"))
      }
    })
  }, [update])

  const Update = () =>{
    setRatingChange(false)
    setButton(true)
    setRecievedMovies([])
    setRecievedBooks([])
    showLoading = true
    updateRatings()
    setUpdate(!update)
  }

  const [disableButton, setButton] = useState(true)
  useEffect(() =>{
    if(getRatingChange()){
      setButton(false)
    }else{
      setButton(true)
    }
  },[])

  return (
    <div>
      <Button variant="contained" disabled={disableButton} onClick={() =>{Update()}}>Update</Button>
      <DisplayTitle text={"Recommended movies for you"}/>
      <LoadingAnimation/>
      <Items items={recievedMovies} page={"movies"} recommendation={true} size={"medium-item-pic"} />
      <DisplayTitle text={"Recommended books for you"}/>
      <Items items={recievedBooks} page={"books"} recommendation={true} size={"medium-item-pic"} />
    </div>
  )
}

const MainPage = ({ page }) => {
  const books = GetBooks()
  const movies = GetMovies()
  if (bookRatings.length === 0 && movieRatings.length === 0) {
    updateRatings()
    return (
      <div className="page-container">
        <h2>Top 10 newest movies</h2>
        <Items items={movies} page={"movies"} size={"medium-item-pic"} />
        <h2>Top 10 newest books</h2>
        <Items items={books} page={"books"} size={"medium-item-pic"} />
        <p>
          Please rate at least one movie and one book to receive personal
          recommendations.
        </p>
      </div>
    )
  }
  return (
    <div className="page-container">
      <h2>Highest rated movies</h2>
      <Items items={movies} page={"movies"} size={"medium-item-pic"} />
      <h2>Highest rated books</h2>
      <Items items={books} page={"books"} size={"medium-item-pic"}/>
      <UpdateRecommendations/>
    </div>
  )
}

export default MainPage;
