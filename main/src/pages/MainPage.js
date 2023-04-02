import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { getRatingChange, setRatingChange } from "./Ratings";
import { getCookies, getRecommended, setRecommended } from "../Cookies";
import loading from "../Loading.webm";

import "../css/App.css";
import "react-multi-carousel/lib/styles.css";

import Search from "../Search";
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

const LoadingAnimation = () =>{
  const[show, setShow] = useState(false)
  useEffect(() =>{
    if(recommendations.length === 0 && recommendations.value !== "not available"){
      setShow(true)
    }else{
      setShow(false)
    }
  })
  if(show){
    return(
      <Box sx={{textAlign:'center'}}>
        <video loop width="600" height="auto" autoPlay muted>
          <source src={loading} type="video/webm"/>  
        </video>
      </Box>
    )
  }
}
const GetPersonalRecommendations = () => {
  // const [recBooks, setRecBooks] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  var bookRatings = getCookies("B")
  var movieRatings = getCookies("M")
  const ratings = {
    Books: bookRatings,
    Movies: movieRatings
  }

  useEffect(() => {
    axios
    .get(`http://128.214.253.51:3000/dbgetpersonalmovierecommendations?ratings=${JSON.stringify(ratings)}`)
    .then((response) => {
      setRecMovies(response.data)
      var ids = []
      for(var i = 0; i<response.data.length; i++){
        ids[i] = response.data[i].movieid.toString()
      }
      setRecommended("M", ids)
    })
  }, [])
  return recMovies;
}
var recommendations = {}
const UpdateRecommendations = () =>{
  recommendations = {}
  setRatingChange(false)
  recommendations = GetPersonalRecommendations();
}
const CanUpdateRecommendations = () =>{
  const [updatestatus, setupdateStatus] = useState(false)
  useEffect(() =>{
    if(recommendations.length === 0 && recommendations.value !== "not available"){
      setupdateStatus(false)
    }else{
      setupdateStatus(getRatingChange)
    }
  })
  if(updatestatus){
    return (
      <Button onClick={() =>{UpdateRecommendations()}}>Update</Button>
    )
  }else{
    return (
      <Button disabled={true} onClick={() =>{console.log("beep")}}>Update</Button>
    )
  }
}

const MainPage = ({ page }) => {
  const books = GetBooks();
  const movies = GetMovies();

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
          <p>Please rate at least one movie and one book to receive personal recommendations.</p>
        <Search page={page} />
      </div>
    );
  }
  var recommendedMovies = getRecommended("M")
  console.log(recommendedMovies)
  return (
    <div className="page-container">
      <h2>Top 10 newest {page}</h2>
      {page === "movies" ? (
        <Items items={movies} page={page} />
      ) : (
        <Items items={books} page={page} />
      )}
      <h2>Recommended movies for you</h2>
      <CanUpdateRecommendations/>
        <LoadingAnimation/>
        <Items items={recommendedMovies} page={"movies"} recommendation={true}/>
      <Search page={page} />
    </div>
  );
};

export default MainPage;
