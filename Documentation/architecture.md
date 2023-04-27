# Architecture

## General Architecture of the App

Both backend and frontend are running in cPouta CSC server.
The frontend is a React app that fetches data from API endpoints hosted by the [backend](https://github.com/movie-book-recommender/movie-book-backend)

## Architecture of the Fronted

All relevant code apart from the github workflows are in the main directory

[App.js](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/main/src/App.js) handles the page navigation and different pages are made in separate Javascript files.

There are visual elements that are used thorought the application such as a [Carousel](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/main/src/Carusel.js) that shows movies or books in a pleasing way.

Styling is done with css, with files found in the folder [main/src/css](https://github.com/movie-book-recommender/movie-book-recommender-project/tree/main/main/src/css)

## Communicating with the backend

The frontend has no access to the backend other than the API endpoints implemented in the flask app. Endpoints for getting movie data are found [here](https://github.com/movie-book-recommender/movie-book-backend/blob/main/main/routes_movies.py) and endpoints for getting book data are found [here](https://github.com/movie-book-recommender/movie-book-backend/blob/main/main/routes_books.py). Endpoints for fetching personal recommendations are in the movie routes.

All of the backend API's are used with GET requests. The data is returned in JSON format. Some of the API's require input, such as a search word or a cookie including ratings. The request can be made with axios as follows: 

``` axios.get(`http://128.214.253.51:3000/dbsearchmoviesby${searchType}?input=${newSearch}`) ```

## User data

User ratings are saved in [cookies](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/main/src/Cookies.js). If the user disallows cookies, the ratings are saved in an array that empties when the page is closed.

## Application in the production

The backend info is found [here](https://github.com/movie-book-recommender/movie-book-backend/blob/main/documentation/architecture.md)

The frontend runs in a [Docker container](https://docs.docker.com/get-started/). The choice of running the application in a container is made to ease handling dependencies and automating integration. The settings used to create a docker image is in the [Dockerfile](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/main/Dockerfile).

The react app is run in the production with serve as follows:

``` serve -s -l tcp://0.0.0.0:5000 build ```

This is because running with ```npm start``` is not as efficient as serve.

There are some differences when running ``` npm start ``` when developing and this, so when running in to an issue "this works fine on my computer but not on cPouta", try to run 

```npm ci --only=production --legacy-peer-deps ```

```npm run build```

```npm install -g serve```

``` serve -s -l tcp://0.0.0.0:5000 build ```

to match the production version.

### Continuous integration

Description of the CI/CD pipeline is covered in detail [here](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/Documentation/ci_cd/ci_cd_pipeline.md). In short, everytime some change is pushed to the main branch, a new container image is built, pushed to [Dockerhub](https://hub.docker.com/), pulled to the server, started and the old container image is deleted.