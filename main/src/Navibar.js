import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
} from "semantic-ui-react";

import "./css/App.css";
import navilogo from "./assets/header.png"
import Search from "./Search";


const Navbar = ({ page }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="menu">
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Segment}
          animation="push"
          direction="top"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          visible={visible}
          width="wide"
          className=""
        >
          <Grid textAlign="center">
            <Menu inverted icon="labeled">
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/wishlist`);
                }}
              >
                <Icon name="heart" />
                Wishlist
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/ratings`);
                }}
              >
                <Icon name="star outline" />
                Ratings
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setVisible(false);
                  navigate(`/search`);
                }}
              >
                <Icon name="search" />
                Search
              </Menu.Item>
            </Menu>
          </Grid>
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Grid>
            <Grid.Row verticalAlign="middle" stretched>
              <Grid.Column width={3} textAlign="center">
                <Button
                  id="navbutton"
                  circular
                  basic
                  compact
                  animated="fade"
                  size="big"
                  onClick={() => navigate("/")}
                >
                  <Button.Content visible>
                    <Image src={navilogo} size="small" centered />
                  </Button.Content>
                  <Button.Content hidden>Main Page</Button.Content>
                </Button>
              </Grid.Column>

              <Grid.Column width={10}>
                <Search page={page} />
              </Grid.Column>

              <Grid.Column width={3} floated="right">
                <Button
                  id="navbutton"
                  circular
                  basic
                  compact
                  animated="fade"
                  size="massive"
                  textAlign="center"
                  onClick={() => setVisible(true)}
                >
                  <Button.Content visible>
                    <Icon name="sidebar" />
                  </Button.Content>
                  <Button.Content hidden>Menu</Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {page}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default Navbar;
