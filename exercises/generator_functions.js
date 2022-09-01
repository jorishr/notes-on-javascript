// GENERATOR FUNCTIONS
// basic example
function* pauseAndResume(num){
    for(let i = 0; i < num; i++){
        yield i;
    }
}
pauseAndResume(5); // -> {<suspended>}
pauseAndResume(5).next(); // -> {value: 0, done: false} NOTE: first iteration
var genObj = pauseAndResume(5);
genObj.next(); //-> {value: 0, done: false}
genObj.next(); //-> {value: 1, done: false}
genObj.next(); //-> {value: 2, done: false}
genObj.next(); //-> {value: 3, done: false}
genObj.next(); //-> {value: 4, done: false}
genObj.next(); //-> {value: undefined, done: true} 
               // NOTE: last iteration does not yield a result because i < num

// multiple yield statements
function* printStrings(){
    yield "first";
    yield "second";
    yield "third";
}
var genObj = printStrings();
genObj.next(); // -> {value: "first", done: false}
genObj.next(); // -> {value: "second", done: false}
genObj.next(); // -> {value: "third", done: false}
genObj.next(); // -> {value: undefined, done: true}

// iterate over a generator
for(val of pauseAndResume(5)){console.log(val)};    // -> 0, 1, 2, 3, 4
for(val of printStrings()){console.log(val)};       // -> first, second, third

// pause for a promise
// NOTE:
function* getMovieData(movieName){
    console.log("Start, before pause");
    yield $.getJSON(`https://omdbapi.com?t=${movieName}&apikey=thewdb`);
    console.log("Resume and end");
}
getMovieData("titanic");        // -> {<suspended>}
getMovieData("titanic").next(); 
    // start, before pause
    // -> {value: {promise unresolved} , done: false}

getMovieData("titanic").next().value.then(val => console.log(val));
/*  //->    {Title: "Titanic", Year: "1997", Rated: "PG-13", 
            Released: "19 Dec 1997", Runtime: "194 min", …}

We access the unresolved promise that is stored inside .value property of
the generator object. Then we resolve that promise with .then and the
callback function we use logs the value of the resolved promise, which
is an object containing all the info of the respective movie.
*/