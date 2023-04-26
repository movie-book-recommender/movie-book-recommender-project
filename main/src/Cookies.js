import { GetMovieByID } from "./components/Movie"

//Used if user has opted to not allow cookies.
//These reset if user refreshes the page or closes the session.
var nonCookieBookRatings = []
var nonCookieMovieRatings = []
var nonCookieBookWishlist = []
var nonCookieMovieWishlist = [] 
var nonCookieBookRecommendations = []
var nonCookieMovieRecommendations = []


//Creates a new cookie with the movieid as the name of the cookie, 
//rating as the value of the cookie. Exdays is the amount of days until the cookie expires
//if rating is 0, the movieid is removed 
function setCookie(borm, movieid, rating, exdays) {
  if(localStorage.cookie === "Disallow"){
    if(borm === "B"){
      var wasAlreadyRated = false
      for(let i = 0; i < nonCookieBookRatings.length; i++){
        if(nonCookieBookRatings[i][0] === movieid){
          if(rating === 0){
            nonCookieBookRatings.splice(i, 1)
            wasAlreadyRated = true
          }else{
            nonCookieBookRatings[i] = [movieid, rating]  
            wasAlreadyRated = true
          }
        }
      }
      if(!wasAlreadyRated){
        nonCookieBookRatings.push([movieid, rating])
      }
    }else{
      var wasAlreadyRated = false
      for(let i = 0; i < nonCookieMovieRatings.length; i++){
        if(nonCookieMovieRatings[i][0] === movieid){
          if(rating === 0){
            nonCookieMovieRatings.splice(i, 1)
            wasAlreadyRated = true
          }else{
            nonCookieMovieRatings[i] = [movieid, rating]  
            wasAlreadyRated = true
          }
        }
      }
      if(!wasAlreadyRated){
        nonCookieMovieRatings.push([movieid, rating])
      }
    }
  }else{
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    var prevRatings = getStringOfRatings(borm)
    if(getCookie(borm, movieid) !== 0){
      var ratings = prevRatings.split('&')
      var changedRatings = ""
      for(var i = 0; i < ratings.length; i++){
        var pair = ratings[i].split(":")
        if(pair[0] === movieid){
          pair[1] = rating
        }
        if(pair[0] !== ''){
          if(pair[0] === movieid && pair[1] === 0){
          }else{
            changedRatings = changedRatings + "&" + pair[0] + ":" + pair[1]
          }
        }
      }
      document.cookie = borm + "Ratings=" + changedRatings + ";" + expires + ";path=/"
    }else{
    document.cookie = borm + "Ratings=" + prevRatings + "&" + movieid + ":" + rating + ";" + expires + ";path=/";
    }
  }  
}

//fetchCookie is used to get the desired cookie from the browser
const fetchCookie = (borm, cookieName, cookieNameLength) =>{
  //splits the recieved cookie string into different cookies
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies.length === 0){
    return ""
  }
  var cookie = ""
  //If only one cookie is saved and it is the desired cookie, return it
  if(cookies[0].substring(0, cookieNameLength) === borm + cookieName){
    cookie = cookies[0].substring(cookieNameLength)
  }
  //For loop goes through all cookies and returns cookie with matching name
  for(var i = 1; i < cookies.length; i++){
    cookies[i] = cookies[i].substring(1)
    if(cookies[i].substring(0, cookieNameLength) === borm + cookieName){
      cookie = cookies[i].substring(cookieNameLength)
    }  
  }
  return cookie
}

const removeAllRatings = (borm) =>{
  if(localStorage.cookie === "Disallow"){
    if(borm === "B"){
      nonCookieBookRatings = []
    }else{
      nonCookieMovieRatings = []
    }
    return;
  }
  const d = new Date();
  d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = borm + "Ratings=" + ";" + expires + ";path=/";
}

const getStringOfRatings = (borm) =>{   
  var cookie = fetchCookie(borm, "Ratings=", 9)
  return cookie
}


function addToWishlist(borm, id, exdays) {
  if (localStorage.cookie === "Disallow"){
    var bormId = borm + id
    if (borm === "M") {
      if (nonCookieMovieWishlist.includes(bormId)) {
        var i = nonCookieMovieWishlist.indexOf(bormId)
        nonCookieMovieWishlist.splice(i, 1)
      } else {
        nonCookieMovieWishlist.push(bormId)
      }
    } else if (borm === "B") {
      if (nonCookieBookWishlist.includes(bormId)) {
        var i = nonCookieBookWishlist.indexOf(bormId)
        nonCookieBookWishlist.splice(i, 1)
      } else {
        nonCookieBookWishlist.push(bormId)
      }
    }
  } else {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    var prevWishlist = getStringOfWishlist()
    var list = prevWishlist.split('&')
    for (var i = 0; i < list.length; i++) {
      if (list[i] === borm + id) {
        list.splice(i, 1)
        changedList = list.join('&')
        document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"
        return
      }
    }
    var changedList = prevWishlist + borm + id + "&"
    document.cookie = "Wishlist:" + changedList + ";" + expires + ";path=/"
  }
}

function onWishlist(borm, id) {
  var bormId = borm + id
  if (localStorage.cookie === "Disallow") {
    if (borm === "M") { return nonCookieMovieWishlist.includes(bormId) }
    if (borm === "B") { return nonCookieBookWishlist.includes(bormId)}
    } else {
    var prevWishlist = getStringOfWishlist()
    var list = prevWishlist.split('&')
    return list.includes(bormId)
  }
}

const getStringOfWishlist = () =>{
  if (localStorage.cookie === "Disallow") {
    if (nonCookieBookWishlist.concat(nonCookieMovieWishlist).length === 0) { return "" }
    var retStr = nonCookieBookWishlist.concat(nonCookieMovieWishlist).join('&')
    return retStr.concat("&")
  }
  var cookies = document.cookie.split(';')
  if(cookies[0] === '' || cookies[0] === undefined){
    return ""
  }
  var cookie =""
  for(var i = 0; i < cookies.length; i++) {
    if(cookies[i].trim().substring(0, 9) === "Wishlist:"){
      cookie = cookies[i].trim().substring(9)
    }
  }
  return cookie
}
//Searches saved cookies for a cookie with the name movieid
//Returns rating associated with that cookie or 0 if no cookie is found
function getCookie(borm, id) {
  if(localStorage.cookie === "Disallow"){
    if(borm === "B"){
      for(let i = 0; i < nonCookieBookRatings.length; i++){
        if(nonCookieBookRatings[i][0] === id){
          return nonCookieBookRatings[i][1];
        }
      }
    }else{
      for(let i = 0; i < nonCookieMovieRatings.length; i++){
        if(nonCookieMovieRatings[i][0] === id){
          return nonCookieMovieRatings[i][1];
        }
      }
    }
    return 0;
  }
  var prevRatings = getStringOfRatings(borm)
  let pairs = prevRatings.split('&');
  for(let i = 1; i < pairs.length; i++) {
    let pair = pairs[i].split(':');
    if(pair[0].substring(0, 1) === ' '){
      pair[0] = pair[0].substring(1)
    }
    if(pair[0] === id){
      return pair[1];
    }
  }
  return 0;
}

//Returns a list of pairs. A pair has a cookies name/movieid in pair[0]
//and value/rating in pair[1]
function getCookies(borm){
  if(localStorage.cookie === "Disallow"){
    if(borm === "B"){
      return nonCookieBookRatings;
    }else{
      return nonCookieMovieRatings;
    }
  }
  var prevRatings = getStringOfRatings(borm)
  var pairs = prevRatings.split("&")
  var cookies = []
  for(var i=0; i<pairs.length; i++){
    var pair = pairs[i].split(":")
    cookies[i] = pair;
  }
  cookies.shift()
  return cookies;
}

function setRecommended(borm, listOfIds){
  if(localStorage.cookie === "Disallow"){
    for(var i = 0;i < listOfIds.length; i++){
      if(borm === "B"){
        nonCookieBookRecommendations[i] = listOfIds[i]
      }else{
        nonCookieMovieRecommendations[i] = listOfIds[i]
      }
    }
  }else{
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    var recommendedIDs = ""
    for(var i = 0;i < listOfIds.length; i++){
      recommendedIDs =  recommendedIDs + "&" + listOfIds[i] 
    }
    document.cookie = borm + "Recommendations" + "=" + recommendedIDs + ";" + expires + ";path=/";
  }
}

function getRecommended(borm){
  var recommended = []
  if(localStorage.cookie === "Disallow"){
    if(borm === "B"){
      recommended = nonCookieBookRecommendations
    }else{
      recommended = nonCookieMovieRecommendations
    }
  }else{
    var cookie = fetchCookie(borm, "Recommendations=", 17)
    var recommended = []
    recommended = cookie.split("&")
    recommended.shift()
  }
  var recommendedItems = []
  for(var j = 0; j<recommended.length; j++){
    if(borm === "M"){
      var info = recommended[j].split("%")
      var poster = ""
      if(info[2] === "null"){
        poster = null
      }else{
        poster = info[2]
      }
      const id = {
        similar_item_id: parseInt(info[0]),
        movieid: parseInt(info[0]),
        title: info[1],
        posterpath: poster
      }
      recommendedItems[j] = id
    }else{
      var info = recommended[j].split("%")
      var poster = ""
      if(info[2] === "null"){
        poster = null
      }else{
        poster = info[2]
      }
      const id = {
        similar_item_id: parseInt(info[0]),
        item_id: parseInt(info[0]),
        title: info[1],
        img: poster
      }
      recommendedItems[j] = id
    }
  }
  return recommendedItems
}



  export { setCookie, getCookie, getCookies, addToWishlist, getStringOfWishlist, onWishlist, removeAllRatings, getRecommended, setRecommended };
