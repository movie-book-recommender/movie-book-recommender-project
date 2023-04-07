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

<<<<<<< HEAD
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
=======
const LoadingAnimation = () =>{
  const[show, setShow] = useState(false)
  useEffect(() =>{
    if(showLoading){
      setShow(true)
    }else{
      setShow(false)
    }
  },[]);
>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
  if (show) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <video loop width="600" height="auto" autoPlay muted>
          <source src={loading} type="video/webm" />
        </video>
      </Box>
    );
  }
<<<<<<< HEAD
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
=======
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
var showLoading = false
const UpdateRecommendations = () =>{
  const [update, setUpdate] = useState(false)
  const [recievedMovies, setRecievedMovies] = useState(getRecommended("M"));
  useEffect(() => {
    axios
    .get(`http://128.214.253.51:3000/dbgetpersonalmovierecommendations?ratings=${JSON.stringify(ratings)}`)
    .then((response) => {
      var info = []
      for(var i = 0; i<response.data.length; i++){
        var posterpath = ""
        if(response.data[i].posterpath === null){
          posterpath = "null"
        }else{
          posterpath = response.data[i].posterpath.toString()
        }
        info[i] = response.data[i].movieid.toString() + "%" 
                + response.data[i].title.toString() + "%" 
                + posterpath
      }
      setRecommended("M", info)
      showLoading = false
      setRecievedMovies(getRecommended("M"))
    })
  }, [update]);

  const Update = () =>{
    setRatingChange(false)
    setButton(true)
    setRecievedMovies([])
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
      <LoadingAnimation/>
      <Items items={recievedMovies} page={"movies"} recommendation={true} size={"medium-item-pic"} />
    </div>
  )
}

>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
const MainPage = ({ page }) => {
  const books = GetBooks();
  const movies = GetMovies();
  if (bookRatings.length === 0 && movieRatings.length === 0) {
    updateRatings()
    return (
      <div className="page-container">
        <h2>Top 10 newest movies</h2>
        <Items items={movies} page={"movies"} size={"medium-item-pic"} />
        <h2>Top 10 newest books</h2>
        <Items items={books} page={"books"} size={"medium-item-pic"} />
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
      <h2>Top 10 newest movies</h2>
      <Items items={movies} page={"movies"} size={"medium-item-pic"} />
      <h2>Top 10 newest books</h2>

      <Items items={books} page={"books"} size={"medium-item-pic"}/>
      <h2>Recommended movies for you</h2>
<<<<<<< HEAD
      <LoadingAnimation />
      <Items items={recommendations} page={"movies"} recommendation={true} />
=======
      <UpdateRecommendations/>
>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
    </div>
  );
};

export default MainPage;
