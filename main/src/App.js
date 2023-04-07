import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import axios from "axios";

const App = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("error: " + error);
      if (error.response.status === 404) {
        navigate("/");
      }
    }
  );
  const navigate = useNavigate();
<<<<<<< HEAD
  useEffect(() => {
    navigate(`${page}`);
  }, [page]);

  const handleChange = () => {
    if (page === "movies") setPage("books");
    else setPage("movies");
  };

=======

>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
  const AllowCookiesPopUp = () => {
    const setCookieConsent = (decision) => {
      localStorage.cookie = decision;
      closeModal();
    };
    const [open, setOpen] = useState(!localStorage.cookie);
    function closeModal() {
      setOpen(false);
    }
    if (typeof Storage !== "undefined") {
      if (!localStorage.cookie) {
        return (
          <Modal open={open} onClose={closeModal}>
            <Box
              sx={{
                color: "black",
                bgcolor: "white",
                width: 800,
                heigh: 800,
                border: 2,
                mx: "auto",
                mt: 10,
                textAlign: "center",
              }}
            >
              <h2>This site uses cookies</h2>
              <p>
                This web page uses cookies to save your ratings and wishlisted
                items. If you disallow the use of cookies on this site, your
                decision will be saved in your browsers localStorage. If you've
                disallowed the use of cookies you can still use all the
                functionalities of the site, but if you refresh the page or
                close the session your ratings and wishlisted items will be
                gone.
              </p>
              <Button
                onClick={() => {
                  setCookieConsent("Allow");
                }}
              >
                Allow
              </Button>
              <Button
                onClick={() => {
                  setCookieConsent("Disallow");
                }}
              >
                Don't allow
              </Button>
            </Box>
          </Modal>
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Movie-Book Recommender</title>
        <meta
          name="description"
          content="Get movie and book recommendations based on your ratings!"
        />
      </Helmet>
      <div className="page">
<<<<<<< HEAD
        <Navibar page={page} handleChange={handleChange} />
        <Routes>
          <Route path="/:page" element={<MainPage page={page} />} />
          <Route path="/:page/ratings" element={<Ratings page={page} />} />
          <Route path="/:page/wishlist" element={<Wishlist page={page} />} />
          <Route path="/:page/search" element={<SearchPage page={page} />} />
          <Route path="/movie/:id" element={<Movie page={page} />} />
          <Route path="/book/:id" element={<Book page={page} />} />
          <Route path="/" element={<MainPage page={page} />} />
=======
        <Navibar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/book/:id" element={<Book />} />
>>>>>>> 4b31e714c95647ccbfb67731651aa5252936544d
        </Routes>
        <AllowCookiesPopUp />
      </div>
    </>
  );
};

export default App;
