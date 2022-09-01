/* 
#############################
I.    EXAMPLE OBJECTS
II.   FUNCTION TO CREATE AN OBJECT WITH ARROW FUNCTIONS
III.  MOVIE DATABASE EXERCISE
IV.   REMAINDER MONEY IN EURO'S
V.    OBJECT AND KEYWORD THIS WITH ARROW FUNCTION
#############################

###################
I.  EXAMPLE OBJECTS
###################

We create an array of posts and each post be an object with various properties
inside. This is an example of a complete but simple data structure.
*/
var posts = [
  { 
    title: "this is post number one",
    subtitle: "at index position 0 in the array",
    author: "JR",
    comments: ["an array of comments", "inside an object property",
      "complicate it further by making each an object!"]
  }, 
  {
    title: "post number two",
    subtitle: "at index position 1 in the array",
    author: "JR",
    comments: ["an array of comments", "inside an object property",
      "complicate it further by making each an object!" ]
  }
]

// To access the second comment in the second post:

posts[1].comment[1];
posts[0].subtitle; //subtitle post 1

/*
IMPORTANT
Practice reading the code and accessing these type of data structures because
in real world examples you'll work with 5 or 6 levels deep of nested ARRAYS
and OBJECTS.
*/

var someObject = {
  friends: [
    {name:"Eric", lastname:"Stack"},
    {name:"Jan"},
    {name: "George"}
  ],
  city: [],
  age:[],
}

// To access "George":
// To access "Stack"
someObject.friends[2].name
someObject.friends[0].lastname;

/*  
#####################################################
II. FUNCTION TO CREATE AN OBJECT WITH ARROW FUNCTIONS
########3############################################

Write a function called createStudentObj which accepts two parameters, 
firstName and lastName and returns an object with the keys of firstName 
and lastName with the values as the parameters passed to the function.
*/
let createStudentObj = 
    (firstName, lastName) => {return {firstName: firstName, lastName: lastName}};

createStudentObj('Elie', 'Schoppik') 
// {firstName: 'Elie', lastName: 'Schoppik'}

/* 
But, if you want to have the really short version, the following does not work
because the {} gets mistaken for function block and not the object we want to
create.*/ 
let createStudentObj = (firstName, lastName) => {firstName: firstName, lastName: lastName};

// Final solution:
let createStudentObj = (firstName, lastName) => ({firstName: firstName, lastName: lastName});


/*
#############################
III.  MOVIE DATABASE EXERCISE
#############################

Create an array of movie objects. Each movie should have a title, rating and
hasWatched properties. Iterate through the array to print out the list with
different text based on whether the movie has been seen or not.
*/
var movieDb = [
  {title: "Die Hard", rating: "4 stars", hasWatched:true},
  {title: "James Bond", rating: "3.5 stars", hasWatched:true},
  {title: "Lord of the Rings", rating: "3 stars", hasWatched:true},
  {title: "Beauty and the Beast", rating: "2 stars", hasWatched:false}
]
/*
The printing out part is not as straight forward. What we need to do is
build a string for each item in the array that consists of text, and
object properties.
*/
movieDb.forEach(function(movie){
  var displayMovies = "You have ";
  if(movie.hasWatched){
    displayMovies += "watched ";
  } else {displayMovies += "NOT watched";}
  displayMovies += "\"" + movie.title + "\"" +"- ";
  displayMovies += movie.rating + " stars.";
  console.log(displayMovies);
})

// REFACTORING
// The building of the string can be put into a function of its own:
function buildMovieString(movie){
  var displayMovies = "You have ";
  if(movie.hasWatched){
    displayMovies += "watched ";
  } else {displayMovies += "NOT watched";}
  displayMovies += "\"" + movie.title + "\"" +"- ";
  displayMovies += movie.rating + " stars.";
  return displayMovies;
}

movieDb.forEach(function(movie){
  console.log(buildMovieString(movie))
})


/*
#############################
IV.  REMAINDER MONEY IN EURO'S
#############################

Kasse met de volgende samenstelling. 
*/
let till = {
  euro10: 10,
  euro5: 10,
  euro: 35,
  cents50: 20,
  cents20: 15,
  cents10: 15,
  cents5: 20
}

//Give het exacte bedrag van 20.75 terug met zo weinig mogelijk muntjes. 

let value = {
  euro10: 1000,
  euro5: 500,
  euro: 100,
  cents50: 50,
  cents20: 20,
  cents10: 10,
  cent5: 5
}

/*
below works, refactor to loop over the value object, better tracking of 
remainder

*/ 

function returnM(amount){
  centsTotal = amount * 100;
    let remainder = centsTotal%value.euro10;
    let notesOf10 = (centsTotal - remainder) / 1000;
    console.log(`Return ${notesOf10} notes of 10`)
    if(Number.isInteger(remainder%value.euro5)){
      rest = remainder%value.euro5;
      let notesOf5 = (remainder - rest) / 500;
      console.log(`Return ${notesOf5} notes of 5`|| '10 Euro Notes: none')
    }
}

/*
amount = 2075 cents
*/

/*
###############################################
V.  OBJECT AND KEYWORD THIS WITH ARROW FUNCTION
###############################################

When using arrow functions the keyword this binds to the global object.

*/
const profile = {
  name: 'x',
  //getName: () => console.log(this.name) //->undefined
  getName: () => console.log(profile.name)
  //OR -> getName: function(){console.log(this.name)}
}
profile.getName();