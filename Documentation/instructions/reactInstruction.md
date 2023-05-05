# Instructions to running the react frontend

1. Navigate to the folder with App.js file (at the time of writing: main/src/App.js)

2. ```npm -v``` to verify npm

* If npm has not been installed it can be installed with [Node version manager(nvm)](https://github.com/nvm-sh/nvm#installing-and-updating) 
* After installing nvm ```nvm install node``` will install node and npm

3. ```npm install``` in the folder **main** to install dependencies. (``` npm install --legacy-peer-deps ``` if errors from some dependencies are preventing the install.)

4. ```npm start``` to run the react-frontend from the folder **main**

5. Ctrl+C to shut down the local frontend

### Developing with local backend


Sometimes you might want to test the whole app locally. This is especially useful when dealing with an issue that crashes the backend.

1. Follow [this guide](https://github.com/movie-book-recommender/movie-book-backend/blob/main/documentation/backend_developer_start.md) to start the backend flask app on your local network.

2. Change all the API endpoints (or the one you want to troubleshoot locally) to match localhost address. For example from this 

``` axios.get("http://128.214.253.51:3000/dbgettop10highestratedmovies")```

to this 

``` axios.get("http://localhost:5000/dbgettop10highestratedmovies")```

3. Now you can see how the flask app is responding to your requests.

4. Change the addresses back to original before commiting.

### Possible problems you might run into

If ```npm start``` doesn't start the server and gives this error message 
> Invalid options object. Dev Server has been initialized using an options object that does not match the API schema. - options.allowedHosts[0] should be a non-empty string. 

Turn off your internet and try to run the server while offline.


If both frontend and backend are running but the time on the itempage is 0 after refreshing it and the react terminal gives following error message
> Proxy error: Could not proxy request /time from localhost to localhost (ECONNREFUSED)

Flask might be running at the wrong address; instead of localhost:5000 most likely at local ip-address:5000. A quick temporary fix is to change the '"proxy": "http://localhost:5000"' line in package.json to have the ip-address instead of localhost.
**Change back to localhost if pushing to avoid confusion**
