import { Link } from "react-router-dom";
import favicon from "./favicon.ico";
import Search from "./Search";
import React from "react";
// TODO: Update <Search> usage after its will be implemented
import {
  Menu,
  Dropdown,
  Grid,
  Header,
  Segment,
  Button,
  Image,
} from "semantic-ui-react";

const MenuExampleAttached = ({ page }) => (
  <div>
    <Menu attached="top">
      <Dropdown item icon="sidebar" simple>
        <Dropdown.Menu icon="content">
          <Dropdown.Item>
            <Link to={`/${page}/wishlist`} data-link="Wishlist">
              Wishlist
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={`/${page}/ratings`} data-link="Ratings">
              Ratings
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={`/${page}/search`} data-link="Search">
              Search
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button circular compact basic>
        <Image
          src={favicon}
          size="mini"
          href={<Link to={`/${page}`} data-link="Main Page"></Link>}
        />
      </Button>

      <Menu.Menu tiny size="" position="right" fluid>
        <Menu.Item>
          <Search page={page} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </div>
);

const Navibar = ({ page, handleChange }) => {
  return (
    <>
      <MenuExampleAttached page={page} />
    </>
  );
};

export default Navibar;
