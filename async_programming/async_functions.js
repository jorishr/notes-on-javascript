// ELOQUENTJS CHAPTER XI, ASYNCHRONOUS PROGRAMMING

// ASYNC FUNCTIONS

async function getMovieData(movieName){
    console.log("start");
    var movieData = await $.getJSON(`https://omdbapi.com?t=${movieName}&apikey=thewdb`);
    console.log("done, promise resolved");
    console.log(movieData);
}
getMovieData("titanic");
/*
-> 
start
Promise {<pending>}
done, promise resolved
{Title: "Titanic", Year: "1997", Rated: "PG-13", Released: "19 Dec 1997", Runtime: "194 min", …}

NOTE: thus await pauses, waits for the promise to resolve, then goes on the
print the movieData object

Error handling with TRY/CATCH
Get userData from a server database*/
async function getUserData(user){
    try {
        var response = await $.getJSON(`https://api.github.com/users/${user}`);
        console.log(response.name);
    } catch(error){ 
        console.log("The user does not exist")
    }
}
getUserData("eaeea");
// -> 404 error from server is presented as "The user does not exist"
getUserData("Colt"); // -> Colt Steele

/*
AWAIT AND PROMISE.ALL
Get data for multiple movies:*/

async function getMovieData(first, second){
    var movieList = await Promise.all([
        $.getJSON(`https://omdbapi.com?t=${first}&apikey=thewdb`), 
        $.getJSON(`https://omdbapi.com?t=${second}&apikey=thewdb`)
    ]);
    console.log(movieList[0].director, movieList[0].Year);
    console.log(movieList[1].director, movieList[1].Year);
};
getMovieData("titanic", "braveheart");
/* 
we wait for an array of promises to resolve. Returned is an array of objects.
Those objects contain the data for each movie. To access them use the position 
of the object in the array and the property you want to log.


11. REFACTOR EXERCISE 9 and 10 with async functions.*/

async function getMostFollowers(...users){
    let baseUrl = "https://api.github.com/users/";
    let urls = users.map(username => $.getJSON(baseUrl + username));
    var results = await Promise.all(urls)
    let most = results.sort((a, b) => a.followers < b.followers)[0];
    return `${most.name} has the most followers, ${most.followers}`;
};
// NOTE: the above returns a .then, thus it returns a promise to which we 
// can chain another one to log its result.
getMostFollowers("jorishr", "tigarcia", "colt").then(function(data){console.log(data)});


async function starWarsString(id){
    let str = ``; // use backticks because we will compute inside the string
    let result = await $.getJSON(`https://swapi.co/api/people/${id}`)
    str += `${result.name}`;
    let movies = result.films[0];
    let nextResult = await $.getJSON(movies);
    str += `is featured in ${nextResult.title}, directed by ${nextResult.director}`;
    let planets = nextResult.planets[0];
    let finalResult = await $.getJSON(planets);
    str += ` and it takes place on ${finalResult.name}.`
    return str;
}
starWarsString(1).then(function(data){console.log(data)});