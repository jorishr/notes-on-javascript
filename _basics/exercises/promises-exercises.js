/* 
##################
PROMISES EXERCISES
########################
I.      MANUAL PROMISE
II.     PAUSE AN APP
III.    GITHUB FOLLOWERS
IV.     STARWARS STRING
########################

##################
I.  MANUAL PROMISE
##################
The promise constructor function creates a new Object that holds data 
*/

async function myPromise(){
    return  new Promise((resolve, reject) => {
        if(success) {
            const successObject = {
                msg: 'Success',
                data: 'Test'//...some data we got back
            }
            resolve(successObject); 
        } else {
            const errorObject = {
                msg: 'An error occured',
                error: 'Test', //...some error we got back
            }
            reject(errorObject);
        }
    });
}

//consume that promise
let success = true;
//let success = false;

myPromise() //-> resolved/rejected

myPromise()
   .then((result) => console.log(result))
   .catch((result) => console.log(result));
//->    {msg: 'success', data: 'test}   + new Promise


/*CUSTOM FROM SCRATCH
-The promise takes a cb function.
-Has a state that goes from PENDING (default) to REJECTED or RESOLVED
-Produces a value, null by default
-A function that defines a Promise fulfilled and rejected
*/
function myPromise(cb){
    const states = {pending: 'pending', resolved: 'resolved', rejected: 'rejected'}
    let state = states.pending;
    let value = null;

    if(typeOf(cb) !== 'function'){throw new typeError('The parameter has to be a function')}

    function fulfill(result){
        state = states.resolved;
        value = result;
    }
    function reject(error){
        state = states.rejected;
        value = error;
    }
    // a resolve function that passes a value to the fulfill and reject function
    function resolve(value){
        try {
            fulfill(value)
        } catch(err) {
            reject(err)
        }
    }
    //more steps at:
    //https://medium.com/@cmakyr12/understanding-promises-by-writing-your-own-promise-library-14c739eb9a42
}
/*
#####################
II. PAUSE AN APP X MS
#####################
To pause a function executio in an ASYNCHRONOUS MANNER use a combination of a
promise and setTimeout fn.

SetTimeout will call the resolve function after x miliseconds.
*/
function wait(miliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, miliseconds);
    })
}


/*
#####################
III. GITHUB FOLLOWERS
#####################

Write a function called getMostFollowers, which accepts a variable number
of arguments. 

You should then make an AJAX call to the Github User API 
(https://developer.github.com/v3/users/#get-a-single-user) to get the name 
and number of followers of each argument. 

The function should return a promise, which when resolved, returns a string
which displays the username who has the most followers. 

NOTE: do read the API info
 */

function getMostFollowers(...names){
    let baseUrl = "https://api.github.com/users/";
    let urls = names.map(function(val){
        return $.getJSON(baseUrl + val);
    });
    Promise.all(urls).then(function(data){
        let most = data.sort(function(startVal, nextVal){
            return startVal.followers < nextVal.followers; 
        })[0];
        return `${most.name} has the most followers, ${most.followers}`;
    });
}
getMostFollowers("ellie", "colt").then(function(data){console.log(data)});
/* 
LOCIC

- working with a baseUrl cleans up the code, to it you can concatenate
whatever you need

- ...names is an array of usernames we can apply methods to. Use map to
create an new array of equal length which holds the url promise for 
each user. 

NOTE that .map loops over the array and performs the function on each
value(val). 

NOTE that When you find yourself using forEach and pushing into an 
array, it's a good sign you should be using map, which returns a new 
array to you.

- urls holds an array of promises that are pending! To resolve them all at 
once you use Promise.all. The result is an array of resolved promises of 
which the values are dataObjects retrieved for each username. 

- to this array we apply .then method. The cbFn we use takes in a parameter
data which is the array of objects representing each user.

- SORTING ARRAY OF OBJECTS BASED ON A PROPERTY VALUE:
use the array method sort(). This takes a cbFn with two parameter: startVal
and nextVal. It compares and returns the highest value when looping over 
the array.

IMPORTANT: the result is a sorted array with the highest val at index[0].

- last step is to return as string composed of the username property, string
and followers property.
*/

//  The same function but with arrow functions looks cleaner:

function getMostFollowers(...users){
    let baseUrl = "https://api.github.com/users/";
    let urls = users.map(username => $.getJSON(baseUrl + username));
    return Promise.all(urls).then(function(data){
        let most = data.sort((a, b) => a.followers < b.followers)[0];
        return `${most.name} has the most followers, ${most.followers}`;
    });
}
/* 
NOTE that the above returns a .then, thus it returns a promise to which we 
can chain another one to log its result.
*/

getMostFollowers("jorishr", "tigarcia", "colt").then(function(data){console.log(data)});

/*  
######################
IV.    STARWARS STRING
######################

Write a function called starWarsString, which accepts a number. You 
should then make an AJAX call to the Star Wars API (https://swapi.co/) 
to search for a specific character by the number passed to the function. 

Your function should return a promise that when resolved will console.log 
the name of the character.
*/

function starWarsString(num){
    let baseUrl = "https://swapi.co/api/people/"
    let promise =  $.getJSON(baseUrl + num);
    promise.then(function(obj){
        console.log(obj.name);
    })
}
starWarsString(1); // -> Luke SkyWalker

/*  
BONUS EXERCISE 1 & 2

Using the data from the previous AJAX call above, make another AJAX request
to get the first film that character is featured in, and return a promise 
that when resolved will console.log the name of the character and the film 
it is featured in.

Build a string such that: "Luke Skywalker is featured in The Empire Strikes 
Back, directed by Irvin Kershner and it takes place on Hoth" 
*/

function starWarsString(id){
    var str = ``; 
    return $.getJSON(`https://swapi.co/api/people/${id}`).then(function(charObj){
        str += `${charObj.name}`;
        let filmData = charObj.films[0];
        return $.getJSON(filmData);
    }).then(function(movieObj){
        str += `is featured in ${movieObj.title}, directed by ${movieObj.director}`;
        let planets = movieObj.planets[0];
        return $.getJSON(planets);
    }).then(function(planetObj){
        str += ` and it takes place on ${planetObj.name}.`
        return str;
    })
};

starWarsString(1).then(function(data){console.log(data)});
/* 
-> Luke Skywalkeris featured in The Empire Strikes Back, directed by Irvin 
Kershner and it takes place on Hoth.

LOGIC 

- inside the first thenable we add the name of the obj to the string,
create a var filmData that holds a reference to the film property on the
object and accesses its first value. 

You can see in the API docs that the film property is an array of strings 
with links to the movies. That string link is used for the next chained 
promise, a new AJAX request.

- inside the second thenable we are working with a new object, the movieObj.
We add the relevant property value to our string and go on to the next AJAX
call for planets. 

- on the third thenable we finish our string AND RETURN THE STRING!
*/