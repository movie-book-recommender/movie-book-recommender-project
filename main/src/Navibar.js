import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

const Navibar = () => {
  return (
    <AppBar className="navbar" position="static" color="default">
      <Link to={`/`} data-link="BookCine">
        BookCine
      </Link>
      <Link to={`/wishlist`} data-link="Wishlist">
        Wishlist
      </Link>
      <Link to={`/ratings`} data-link="Ratings">
        Ratings
      </Link>
      <Link to={`/search`} data-link="Search">
        Search
      </Link>
    </AppBar>
  );
};

export default Navibar;
