

//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
function setCookie(movieid, rating, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
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
  }else{
    document.cookie = "Ratings:" + prevRatings + "&" + "m" + movieid + "=" + rating + ";" + expires + ";path=/";
  }  
}
function addToWishlist(movieid, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  var prevWishlist = getStringOfWishlist()
  var list = prevWishlist.split('&')
  for (var i = 0; i < list.length; i++) {
    if (list[i] === movieid) {
      list.splice(i, 1)
      changedList = list.join('&')
      document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"
      window.location.reload()
      return
    }
  }
  var changedList = prevWishlist + movieid + "&"
  console.log(changedList)
  document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"

  window.location.reload()
}

function onWishlist(id) {
  var prevWishlist = getStringOfWishlist()
  var list = prevWishlist.split('&')
  for (var i = 0; i < list.length; i++) {
    if (list[i] === id) {
      return true
    }
  }
  return false
}

const getStringOfRatings = () =>{
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies[0] === undefined){
    return ""
  }
  var cookie =""
  for(var i = 0; i < cookies.length; i++) {
    if(cookies[i].substring(0, 8) === "Ratings:"){
      cookie = cookies[i].substring(8)
    }
  }
  return cookie
}
const getStringOfWishlist = () =>{
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies[0] === undefined){
    return ""
  }
  var cookie =""
  for(var i = 0; i < cookies.length; i++) {
    if(cookies[i].trim().substring(0, 9) === "Wishlist:"){      
      cookie = cookies[i].substring(9)
    }
  }
  return cookie
}
//Searchers saved cookies for a cookie with the name id
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(id) {
  var prevRatings = getStringOfRatings()
  let pairs = prevRatings.split('&');
  for(let i = 1; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0].substring(1) === id){
      return pair[1];
    }
  }
  return 0;
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
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
    cookies[i] = pair;
  }
  cookies.shift()
  return cookies;
}

  export { setCookie, getCookie, getCookies, addToWishlist, getStringOfWishlist, onWishlist };
