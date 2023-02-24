# Instructions to running the react frontend

1. Navigate to the folder with App.js file (at the time of writing: \movie-book-recommender-project\src\frontend\src)

2. ```npm -v``` to verify npm

* If npm has not been installed it can be installed with [Node version manager(nvm)](https://github.com/nvm-sh/nvm#installing-and-updating) 
* After installing nvm ```nvm install node``` will install node and npm

3. ```npm install``` in the folder with App.js file to install dependencies 

4. Run the flask-backend on a separate terminal window

5. ```npm start``` to run the react-frontend from the folder with App.js

6. Ctrl+C to shut down the local frontend

### Possible problems you might run into

If ```npm start``` doesn't start the server and gives this error message 
> Invalid options object. Dev Server has been initialized using an options object that does not match the API schema. - options.allowedHosts[0] should be a non-empty string. 

Turn off your internet and try to run the server while offline.


If both frontend and backend are running but the time on the itempage is 0 after refreshing it and the react terminal gives following error message
> Proxy error: Could not proxy request /time from localhost to localhost (ECONNREFUSED)

Flask might be running at the wrong address; instead of localhost:5000 most likely at local ip-address:5000. A quick temporary fix is to change the '"proxy": "http://localhost:5000"' line in package.json to have the ip-address instead of localhost.
**Change back to localhost if pushing to avoid confusion**
