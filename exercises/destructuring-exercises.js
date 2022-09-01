// DESTRUCTURING

// DESTRUCTURING OBJECTS:
let name = {name: "JR", age: 35};
console.log(name) // -> {name: "JR", age: 35}
console.log(name.name) // -> "JR"

let {name} = {name: "JR", age: 35};
console.log(name) // -> "JR" You look directly into the value of the property name, not the object.
console.log(name.name) // -> undefined


/* 
################################
1. DEFAULT VALUES WITH AN OBJECT
################################
WHEN CREATING AN OBJECT THROUGH A FUNCTION*/

function createInstructor(options){
    var options = options || {};
    var name = options.name || {first: "Joris", last: "R"};
    var available = options.available || false;
    return [name.first, name.last, available]; 
} 
createInstructor(); //-> ["Joris", "R", false]
createInstructor({available: true}); //-> ["Joris", "R", true]
createInstructor({name: {first: "Sara", last: "Palacios"}}); //-> ["Sara", "Palacios", false]
createInstructor({name: {first: "Sara", last: "Palacios"}, available: true}); 
//-> ["Sara", "Palacios", true]
/*
- var options: we check if an arguments is passed to the function, if not  
assign a default value, an empty object.
- start with an empty object, no argument: var options = {}
- options.name does not exist, thus assign new properties
- options.available does not exist, thus assign false*/

// DESTRUCTURED VERSION:
function createInstructor({name = {first: "Joris", last: "R"}, available = false} = {}){
    return [name.first, name.last, available];
}
createInstructor(); // ["Joris", "R", false]
/*
- pass a de-structured object as a parameter to the function.
- if no parameter is passed, the default value is an empty object. If you don't
do this, the function will return null or undefined when called without an
argument.

NOTE the difference in SYNTAX: 
{name = {}, available = false} // NOT {name: {}, available: false}
Thus we destructure the nameless object into two new bindings:
name and available. 


###################################
2. DESTRUCTURING AN EXISTING OBJECT
###################################*/

var instructor = {first: "Joris", last: "R", course: "English"};

function displayInstructorInfo(object){
    return [object.first, object.course]
}
displayInstructorInfo(instructor); // ["Joris", "English"]

// DESTRUCTURED:
function displayInstructorInfo({first, last}){
    return [first, last];
}
displayInstructorInfo(instructor); // ["Joris", "R"]


/*
#######################
3. DESTRUCTURE AN ARRAY
#######################

This function takes in two numbers and returns an array of those numbers*/
function returnNumbers(a, b){
    return [a, b]
}
returnNumbers(1, 2); // [1, 2]

// We can manually access each value in the array like this:
returnNumbers(1, 2)[0] // 1
returnNumbers(1, 2)[1] // 2

// and store it in new variable:
var first = returnNumbers(1, 2)[0]
var second = returnNumbers(1, 2)[1]

// DESTRUCTURED VERSION:

var [first, second] = returnNumbers(1, 2);

/*
How it works: returnNumbers(1, 2) produces an array with two values.
Destructure that array by creating two variables: first and second.
First will access the value of index[0] and second will get index[1].


###################################################
4. SWAPPING VALUES IN AN ARRAY CREATED FROM NUMBERS
###################################################

Write a functions that takes in three numbers. And returns the an array
of those numbers with places swapped. Thus swap(1, 2, 3) returns [3, 2, 1] */

function swap(a, b, c){
	[c, b, a] = [a, b, c];
	return [a, b, c];
}
swap(1, 2, 3);  //-> [3, 2, 1]
/*
Here we destructure the array [a, b, c] to create three new bindings
whereby c = a, b = b and a = c.
Then we return an array of [a, b, c], whereby a = c, b = b and c = a.

A version whereby the expected argument is an existing binding that holds 
an array:
*/
var arrNum = [1, 2, 3];
function swap(arr){
    [c, b, a] = arr;
    return [a, b, c];
}
swap(arrNum); // [3, 2, 1]
/* 
When you don't want to create a new array but just swap the values of an existing array.

ES5: creating a function that temporarily stores one value before changing it.*/

function swap(a, b){var temp = a; a = b; b = temp; return [a, b]}
swap(1, 2) // -> [2, 1]

/* NOTE: You can also take in an array, but then you have to work with a loop.

############################################################
5. DESTRUCTURE OBJECT PROPERTIES INTO A STRING CONCATENATION
############################################################

Write a function called displayStudentInfo which accepts an object and 
returns the string "Your full name is" concatenated with the value of the 
first key and a space and then the value of the last key. See if you can 
destructure this object INSIDE OF THE FUNCTION.*/

function displayStudentInfo(object){
    var {first, last} = object;
    return `Your full name is ${first} ${last}`;
}

// OR destructured directly from the parameters
function displayStudentInfo({first, last}){
    return `Your full name is ${first} ${last}`;
}

displayStudentInfo({first: 'Elie', last:'Schoppik'}) 
    // 'Your full name is Elie Schoppik')


/*
#############
6. SAME AS 5.
#############

Write a function called printFullName which accepts an object and returns 
the string "Your full name is" concatenated with the value of the first key 
and a space and then the value of the last key. 

See if you can destructure this object DIRECTLY from the parameters. 
The output of the printFullName function should be the exact same as the 
displayStudentInfo function. */

function printFullName({first, last}){
    return `Your full name is ${first} ${last}`;
}

printFullName({first: 'Elie', last:'Schoppik'}) 
    // 'Your full name is Elie Schoppik'

// OR DESTRUCTURED INSIDE FUNCTION
function printFullName(object){
    var {first, last} = object;
    return `Your full name is ${first} ${last}`;
};

/* NOTE: for both 5. and 6. to work you need to pass the correct object as
the argument. In 7. you we mend this by starting off with a destructured
default object.*/
printFullName({}); // "Your full name is undefined undefined"
displayStudentInfo({classRoom: 'B-One'}); // "Your full name is undefined undefined"


/*
######
7. !!!
######

Write a function called createStudent which accepts as a parameter, a 
default parameter which is a destructured object with the key of likesES2015
and value of true, and key of likesJavaScript and value of true. 

If both the values of likesJavaScript and likesES2015 are true, the function
should return the string 'The student likes JavaScript and ES2015'. 

If the value of likesES2015 is false the function should return the string 
'The student likes JavaScript!'

If the value of likesJavaScript is false the function should return the 
string 'The student likesES2015!'

If both the value of likesJavaScript and likesES2015 are false, the function
should return the string 'The student does not like much...'

IMPORTANT: NOTE that part of the string is always the same. The constant 
part can be become a variable to which you assign the correct concatenation
based on the if statement logic.*/

function createStudent({likesES2015 = true, likesJavaScript = true} = {}){
    // NOTE: when working with a default parameter that is a destructured 
    // object use = {}!!!
    var string = "The student "
    if(likesES2015 && likesJavaScript){
        string += "likes JavaScript and ES2015";
    }else if(likesES2015){
        string += "likes ES2015";
    }else if(likesJavaScript){
        string += "likes Javascript";
    }else {
        string += "does not like much..."
    }
    return string;
}
createStudent() // 'The student likes JavaScript and ES2015' -> DEFAULT OBJECT!
createStudent({likesES2015:false}) // 'The student likes JavaScript!')
createStudent({likesJavaScript:false}) // 'The student likes ES2015!')
createStudent({likesJavaScript:false, likesES2015:false}) 
// 'The student does not like much...')


/*
###################
8. REVERSE AN ARRAY
###################

Write a function called reverseArray which accepts an array and returns the 
array with all values reversed. See if you can do this without creating a 
new array!

NOTES:
Reversing an array can be seen as swapping the first value with the last 
value. The second to last with the second, etc... upon each iteration.
Thus we work with the following arrays: [arr[last],arr[0]] or in an example:
at i = 0: [1, 2, 3, 4] -> [4, 1] -> [4, 2, 3, 1] as we destructure 
[arr[last],arr[0]] into: [arr[0], arr[last]]
Next loop i = 1: [3, 2] -> [4, 3, 2, 1]

arr.length/2: 4/2 = 2 -> loop runs 0, 1 < 2
*/
function reverseArray(arr){
    for(let i = 0; i < arr.length/2; i++){
        [arr[i], arr[arr.length -1 -i]] = [arr[arr.length -1 -i], arr[i]];
    }
    return arr;
}

reverseArray([1,2,3,4,5]) // [5,4,3,2,1]
reverseArray([1,2]) // [2,1]
reverseArray([]) // []
reverseArray([1,2,3,4,5,6,7,8,9,10]) // [10,9,8,7,6,5,4,3,2,1]