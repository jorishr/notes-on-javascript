/* 
########
CURRYING
###################################
I.      CURRING AVERAGE
II.     CURRYING + RECURSION SUM
III.    CURRYING: ELABORATE EXAMPLE
###################################

###################
I.  CURRING AVERAGE
###################

Write a function that takes in an unknown number of Number arguments and returns 
the average of those arguments.
*/
function avg(...n){
    let sum = 0;
    for(let i = 0; i < n.length; i++){
        sum += n[i];
    }
    let result = sum / n.length;
    return result;
}
avg(1,2,3); //->2
/* 
CURRYING

Calculating the average is relatively expensive operation and you don't want
to redo the entire calculus for each new additional number. You can therefore
store the value of previous calculations by using closure (previously returned
functions), as in the example of return a + b; in the docs. 

You can take the abstraction to a higher level and curry a function that can 
take whatever function and returns a function that calls the given function 
with the correct parameters.
*/

function curried(fn, ...outerArg){
    return function(...innerArg){
        return fn.apply(this, outerArg.concat(innerArg));
    }
}

let calcAvg = curried(avg, 1,2,3);  //-> stores function(...innerArg){return avg(1,2,3)}
calcAvg();          //-> 2, no innerArg
calcAvg(4,5,6);     //-> 3.5 with innerArg = [4,5,6]


/* 
################
II. CURRYING SUM
############3###
Write a function that can be called as follows: 

sum(1)(2)(3)(4)...(n)()   //-> 1 + 2 + 3 + 4 + ... + n

If you break it down it has two parts: basic currying and recursion until 
there are no more arguments.
*/
let sum = function(a){
    return function(b){
        return a + b;
    };
};
sum(1)      //-> function(b){return a + b}; Scopes -> closure: {a: 1}
sum(1)(2)   //-> 3
sum(1)(2)() //-> 3

/*
To have this function work with n parameters you see a pattern emerge: for
each additional parameter you would have to return another function in exactly
the same way. This is ideal for RECURSION.

The second part is to repeat the above n times, that is, until the function 
gets called without an argument for parameter b, thus where b is undefined.
*/
let sum = function(a){
    return function(b){
        if(b){
            return sum(a + b);
        } else {
            return a;
        }
    };
};
sum(1)      //-> fn(b){...}, closure {a: 1}
sum(1)()    //-> 1
sum(1)(2)   //-> fn(b){...}, closure {a: 3}
sum(1)(2)() //-> 3
sum(1)(2)(3)(4)()     //-> 10

/* 
ES6 Syntax
*/
let sum = a => b => b ? sum(a + b) : a;
/*
###############################
II. CURRYING: ELABORATE EXAMPLE
###############################

Write a function called bind which accepts a function and a value for the 
keyword this. 

Bind should return a new function that when invoked, will invoke the 
function passed to bind with the given value of the keyword 
this. 

HINT - if you pass more than two parameters to bind, those parameters 
should be included as parameters to the inner function when it is invoked. 

You will have to make use of closure!
*/

function bind(fn, thisArg, ...outerArg){
    return function(...innerArg){
        return fn.apply(thisArg, [...outerArg, ...innerArg]);
    };
}
/* 
Note that the return function that will invoke the function passed to bind, 
may or may not have arguments. The description does not say anything about them
But, you have to assume that when the function that is passed into bind will 
hold parameters and those will always be used as the parameters for the return 
function.

The reason for having to concatenate in the exercise above or to use spread
in the current example is because of the possible outerArg that have to be 
taken into account. If not you just write: fn.apply(this, innerArg).
*/

function firstNameFavoriteColor(favoriteColor){
    return this.firstName + "'s favorite color is " + favoriteColor
}
    
var person = {
    firstName: 'Elie'
}
    
var bindFn = bind(firstNameFavoriteColor, person);
bindFn('green') 
/*
innerArg = "green", no outerArg, thus fn.apply(person, ["green"])
firstNameFavoriteColor("green"){return person.firstName + "green"}
"Elie's favorite color is green"
*/
var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
bindFn2('green') // "Elie's favorite color is blue" 
/* innerArg = "Green", outerArg = "blue"
fn.apply(person, ["blue", "green"])
firstNameFavoriteColor(["blue", "green"]){return person.firstName + "blue"}
"Elie's favorite color is blue"
*/

function addFourNumbers(a,b,c,d){
    return a+b+c+d;
}

bind(addFourNumbers,this,1)(2,3,4) // 10
/*
innerArg [2, 3, 4], outerArg [1]
this is irrelevant here
fn.apply(thisArg, [1, 2, 3, 4]); NOTE: apply spreads out the array into
addFourNumbers(1, 2, 3, 4){1 + 2 + 3 + 4} = 10
*/
bind(addFourNumbers,this,1,2)(3,4)  // 10
bind(addFourNumbers,this,1,2,3)(4)  // 10
bind(addFourNumbers,this,1,2,3,4)() // 10
    // no innerArg
bind(addFourNumbers,this)(1,2,3,4)  // 10
    // no outerArg
bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10
    /* no outerArg and too much innerArg. 
    The default for addFourNumbers is 4 and the additional parameters will 
    be IGNORED*/



/* 5. !!! 
NOTE: Check the explanation below, then all becomes clear. Reading and
understanding what has to be done is the hardest part.

Write a function called flip which accepts a function and a value for the 
keyword this. 

Flip should return a new function that when invoked, will 
invoke the function passed to flip with the given value of the keyword 
this and all of the parameters passed to the function REVERSED.

EXTRA - if you pass more than two parameters to flip, those parameters should
be included as parameters to the inner function when it is invoked.

You will have to make use of closure!

-> THE GOAL IS TO HAVE: flip(fn, this, a, b)(x,y,z) 
*/

function flip(fn, thisVal, ...outerArg){
    return function(...innerArg){
        let allArg = outerArg.concat(innerArg).slice(0, fn.length);
        return fn.apply(thisVal, allArg.reverse());
    };
}

/*
-> flip(fn, this, ...outerArg) to catch all extra arguments
-> innerFn(...innerArg) to catch all arguments passed to it

-> concatenate the arrays of arguments from the outer and inner function.

-> But, you have to make sure the correct number of parameters is used in the fn
function that is passed into flip. Because in theory the AllArg could contain 
more arguments.

To do so you SLICE the array of combined arguments: Start at position 0 and up 
until the number of arguments that fn function accepts. 

To find the number of arguments passed to a function use fn.length property.
*/


function personSubtract(a,b,c){
    return this.firstName + " subtracts " + (a-b-c);
}
    
var person = {
    firstName: 'Elie'
}
    
var flipFn = flip(personSubtract, person);
/* 
stores the environment whereby:
flip(personSubtract, person) and no extra outerArg
*/
flipFn(3,2,1) // "Elie subtracts -4"
/* fn.length is 3
3, 2, 1 become the innerArg [3, 2, 1]
allArg is thus: [] + [3, 2, 1]
allArg.slice(0, 3) -> [3. 2, 1]
fn is called: fn.apply(person, [1, 2, 3])
Thus: personSubtract(1, 2, 3){return person.firstName + (1 - 2 - 3)}
RESULT: "Ellie subtracts -4"
*/
var flipFn2 = flip(personSubtract, person, 5,6);
/* stores the environment whereby:
flip(personSubtract, person, [5, 6]) - now we do have outerArg
*/
flipFn2(7,8)
/* 
fn.length = 3, default personSubtract.length
innerArg = [7, 8]
allArg = [5, 6, 7, 8].slice(0, 3) => [5, 6, 7] - cut off position is index[3], not inclusive!
fn.apply(person, [7, 6, 5])
Thus: personSubtract: (7 - 6 - 5) = -4

"Elie subtracts -4"
*/
function subtractFourNumbers(a, b, c, d){
    return this.firstName + " subtracts " + (a-b-c-d);
}
flip(subtractFourNumbers,this,1)(2,3,4) 
/*
here we immediately call the innerFn with innerArg [2, 3, 4]
the keyword this refers to to global object, thus that part of the 
string will be undefined.
the fn.length here is 4
the outerArg [1], innerArg [2, 3, 4]
allArg = [1, 2, 3, 4].slice(0, 4) -> [].reverse()
fn.apply(this, [4, 3, 2, 1]) -> 4 - 3  -2 - 1 = -2  
    
"undefined subtracts -2"
*/
flip(subtractFourNumbers,this,1,2)(3,4) // -2
flip(subtractFourNumbers,this,1,2,3)(4) // -2

flip(subtractFourNumbers,this,1,2,3,4)() // -2
/*
The default fn.length = 4
as you can check in the console: subtractFourNumbers.length
innerArg = [], outerArg = [1, 2, 3, 4]
allArg.slice(0, 4) -> [1, 2, 3, 4].reverse
fn.apply(this, [4, 3, 2, 1]) -> 4 - 3  -2 - 1 = -2
*/
flip(subtractFourNumbers,this)(1,2,3,4) // -2
/*
no outerArg, innerArg [1, 2, 3, 4]
fn.length: 4
4 - 3 - 2 - 1 = 2 
*/
flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
/*allArg = [1, 2, 3, 4, 5, 6, 7].slice(0, 4), cut off at index[4], 5 but not inclusive   
allArg.reverse = [4, 3, 2, 1]*/
flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22


