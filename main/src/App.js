import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"
import { Modal, Box, Button } from "@mui/material";

import "./css/App.css";
import "react-multi-carousel/lib/styles.css";

import { Movie } from "./components/Movie";
import { Book } from "./components/Book";
import { Ratings } from "./pages/Ratings";
import { Wishlist } from "./pages/WishList";
import SearchPage from "./pages/SearchPage";
import MainPage from "./pages/MainPage";
import Navibar from "./Navibar";
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState("movies");

  axios.interceptors.response.use(
    response =>{
      return response
    }, 
    error => {
      console.log('error: ' + error)
      if(error.response.status === 404){
        navigate("/")
      }
    }
  )
  const navigate = useNavigate();
  useEffect(() => { 
    navigate(`${page}`);
  }, [page]);

  const handleChange = () => {
    if (page === "movies") setPage("books");
    else setPage("movies");
  };

  const AllowCookiesPopUp = () =>{
    const[childOpen, childsetOpen] = useState(false)
    function AreYouSureModal(){
      function childClose(){
        childsetOpen(false)
      }
      function childCloseDisallow(){
        localStorage.cookie = "Disallow"
        childsetOpen(false)
        setOpen(false)
      }
      return (
        <Modal open={childOpen}>        
          <Box sx={{
            color: 'black',
            bgcolor: 'white',
            width: 600,
            heigh: 500,
            border: 2,
            mx: 'auto',
            mt: 20,
            textAlign: 'center',
            }}
          >     
          <h2>Are you sure you want to disallow</h2>          
            <p>
              If you do not agree to using cookies the web page won't remember your ratings if you refresh the page or close the browser.
              If you do not wish to use cookies now but want to turn them on at a later date you can delete the cookies on this site and
              refresh the page.
            </p>
            <Button onClick={() =>{childClose()}}>
              Let me reconsider
            </Button>
            <Button onClick={() =>{childCloseDisallow()}}>
              Don't allow
            </Button>
          </Box>
        </Modal>
      )
    }
    function openChild(){
      childsetOpen(true)
    }
    const setCookieConsent = ( decision ) =>{
      localStorage.cookie = decision
      closeModal()
    } 
    const[open, setOpen] = useState(!localStorage.cookie)
    function closeModal(){
      setOpen(false)
    }
    if(typeof(Storage) !== "undefined"){
      if(!localStorage.cookie){
        return (
          <Modal open={open} onClose={closeModal}>        
            <Box sx={{
              color: 'black',
              bgcolor: 'white',
              width: 800,
              heigh: 800,
              border: 2,
              mx: 'auto',
              mt: 10,
              textAlign: 'center',
              }}
            >  
            <h2>This site uses cookies</h2>             
              <p>
                This web page uses cookies to save your ratings and wishlisted items. If you 
                disallow the use of cookies on this site, your decision will be saved in your browsers localStorage.
                If you've disallowed the use of cookies you can still use all the functionalities of the site, but 
                if you refresh the page or close the session your ratings and wishlisted items will be gone.
              </p>
              <Button onClick={() =>{setCookieConsent("Allow")}}>
                Allow
              </Button>
              <Button onClick={() =>{openChild()}}>
                Don't allow
              </Button>
              <AreYouSureModal/>
            </Box>
          </Modal>
        )
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Movie-Book Recommender</title>
        <meta name="description" content="Get movie and book recommendations based on your ratings!" />
      </Helmet>
      <div className="page">
        <Navibar page={page} handleChange={handleChange}/>
        <Routes>
          <Route
            path="/:page"
            element={<MainPage page={page}  />}
          />
          <Route path="/:page/ratings" element={<Ratings page={page} />} />
          <Route path="/:page/wishlist" element={<Wishlist page={page} />} />
          <Route path="/:page/search" element={<SearchPage page={page} />} />
          <Route path="/movie/:id" element={<Movie page={page}/>} />
          <Route path="/book/:id" element={<Book page={page}/>} />
          <Route path="/" element={<MainPage page={page} />} />
        </Routes>
        <AllowCookiesPopUp/>
      </div>
    </>
  );
};

export default App;
