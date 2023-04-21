import React from "react";
import { useNavigate } from "react-router-dom";

import "./css/App.css";
import favicon from "./assets/logo.png";
import Search from "./Search";
import {
  Grid,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Button,
} from "semantic-ui-react";

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
                  circular
                  basic
                  animated="fade"
                  onClick={() => navigate("/")}
                >
                  <Button.Content visible>
                    <Image src={favicon} size="tiny" centered />
                  </Button.Content>
                  <Button.Content hidden>Main Page</Button.Content>
                </Button>
              </Grid.Column>

              <Grid.Column width={10}>
                <Search page={page} />
              </Grid.Column>

              <Grid.Column width={3} floated="right">
                <Button
                  onClick={() => setVisible(true)}
                  animated="fade"
                  circular
                  compact
                  basic
                  size="massive"
                  textAlign="center"
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
