

//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
function setCookie(movieid, rating, wishlist, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
<<<<<<< HEAD
  document.cookie = "m" + movieid + "=" + rating + "=" + wishlist + ";" + expires + ";path=/";
  window.location.reload()
=======
  var prevRatings = getStringOfRatings()
  if(getCookie(movieid) !== 0){
    console.log(prevRatings)
    var ratings = prevRatings.split('&')
    var changedRatings = ""
    for(var i = 0; i < ratings.length; i++){
      var pair = ratings[i].split("=")
      if(pair[0] === "m" + movieid){
        pair[1] = rating
      }
      if(pair[0] !== ''){
        changedRatings = changedRatings + "&" + pair[0] + "=" + pair[1]
      }
    }
    console.log(changedRatings)
    document.cookie = "Ratings:" + changedRatings + ";" + expires + ";path=/"
    window.location.reload()
  }else{
    document.cookie = "Ratings:" + prevRatings + "&" + "m" + movieid + "=" + rating + ";" + expires + ";path=/";
    window.location.reload()
  }  
}

const getStringOfRatings = () =>{
  var cookies = document.cookie.split(';')
  if(cookies[0] === ''){
    return ""
  }
  var cookie =""
  if(cookies[0].substring(0, 8) === "Ratings:"){
    cookie = cookies[0].substring(8)
  }else{
    cookie = cookies[1].substring(9)
  }
  return cookie
>>>>>>> 2a897bc6e86e6bbd819ab6e5a527cabff276518e
}

//Searchers saved cookies for a cookie with the name movieid
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(movieid) {
  var prevRatings = getStringOfRatings()
  let pairs = prevRatings.split('&');
  for(let i = 1; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0].substring(1) === movieid){
      return pair[1];
    }
  }
  return 0;
}

//Returns boolean telling wether or not the given movie is on the users wishlist
function onWishlist(movieId) {
  let pairs = document.cookie.split(';');
  for(let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair.length === 3){
      return pair[2] === "1";
    }
  }
  return false;
}

//Returns a list of movies that are on the users wishlist
var getWishlist = function(){
  var pairs = document.cookie.split(";")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var trio = pairs[i].split("=")
    if (trio.length >= 3 && trio[2] === "1") {
      if(trio[0].substring(0, 1) === ' '){
        trio[0] = trio[0].substring(1)
      }
      trio[0] = trio[0].substring(1)
      cookies[i] = trio;
    }
  }
  return cookies;
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
//Returns only movieid and rating, excluding wishlist binary.
var getCookies = function(){
  var prevRatings = getStringOfRatings()
  var pairs = prevRatings.split("&")
  console.log(pairs)
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=")
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    pair[0] = pair[0].substring(1)
    cookies[0] = pair[0];
    cookies[1] = pair[1];
    
  }
  cookies.shift()
  return cookies;
}

<<<<<<< HEAD
  export { setCookie, getCookie, getCookies, onWishlist, getWishlist };
=======
  export { setCookie, getCookie, getCookies };
>>>>>>> 2a897bc6e86e6bbd819ab6e5a527cabff276518e
