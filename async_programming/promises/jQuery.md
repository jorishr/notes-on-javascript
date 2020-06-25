# Promises with jQuery
Building an array with years of movies, taken from a database API using JSON formatting. Note that jQuery needs to be running to use this example. `.getJSON` is an AJAX methods that returns a promise. Thus we can call the then method directly on to it.
```js
var years = [];
var url = "https://omdbapi.com?t=titanic&apikey=thewdb";

$.getJSON(url)
    .then(function(movie){
        years.push(movie.Year); 
        return $.getJSON("https://omdbapi.com?t=shrek&apikey=thewdb")
    })
    .then(function(movie){ 
        years.push(movie.Year);
        console.log(years);
    });
console.log("The above is asynchronous, thus this sentence will be printed first");
// -> ["1997", "2001"] 
```
Check the API DOCS: the promise returned above is an object and we know it has a property year which we push to our array. Next we make the then method return another new AJAX call.

Usually you will be working with libraries like jQuery with methods that return promises. Only rarely will you be using native JS promises that you have to write yourself.