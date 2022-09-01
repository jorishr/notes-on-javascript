# JS Exercises for bind, this, ...arg, and concat
- [JS Exercises for bind, this, ...arg, and concat](#js-exercises-for-bind-this-arg-and-concat)
  - [Exercise 5](#exercise-5)
  - [Exercise 6 - Bind](#exercise-6---bind)
## Exercise 5
*NOTE: Check the explanation below, then all becomes clear. Reading and understanding what has to be done is the hardest part.*

Write a function called flip which accepts a function and a value for the keyword this. `flip(fn, thisArg)`

Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the parameters passed to the function REVERSED. `return function(){return fn(thisArg, allArg.reverse())}`

Hint - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked.

`flip(fn, this, ...outerArg)` to catch all extra arguments
`innerFn(...innerArg)` to catch all arguments passed to it

Combine the arrays of arguments from the outer and inner function.
Use concatenate, *but* you have to make sure the correct number of parameters is used in the fn function that is passed into flip. To do so you *slice* the array of combined arguments. Start at position 0 and up until the number of arguments that fn function accepts. Because in theory the allArg could contain more arguments. `slice(0, fn.length)`

You will have to make use of closure!
```js
function flip(fn, thisArg, ...outerArg){
    return function(...innerArg){
        let allArg = outerArg.concat(innerArg).slice(0, fn.length);
        return fn.apply(thisArg, allArg.reverse());
    };
}

function personSubtract(a,b,c){
    return this.firstName + " subtracts " + (a-b-c);
}
    
var person = {
    firstName: 'Elie'
}
    
var flipFn = flip(personSubtract, person);
    // stores the environment whereby:
    // flip(personSubtract, person) and no extra outerArg
flipFn(3,2,1) // "Elie subtracts -4"
    // fn.length is 3
    // 3, 2, 1 become the innerArg [3, 2, 1]
    // allArg is thus: [] + [3, 2, 1]
    // allArg.slice(0, 3) -> [3. 2, 1]
    // fn is called: fn.apply(person, [1, 2, 3])
    // Thus: personSubtract(1, 2, 3){return person.firstName + (1 - 2 - 3)}
    // Result: "Ellie subtracts -4"

var flipFn2 = flip(personSubtract, person, 5,6);
    // stores the environment whereby:
    // flip(personSubtract, person, [5, 6]) - now we do have outerArg
flipFn2(7,8)
    // fn.length = 3, default personSubtract.length
    // innerArg = [7, 8]
    // allArg = [5, 6, 7, 8].slice(0, 3) => [5, 6, 7] - cut off position is index[3], not inclusive!
    // fn.apply(person, [7, 6, 5])
    // Thus: personSubtract: (7 - 6 - 5) = -4

    // "Elie subtracts -4"

function subtractFourNumbers(a, b, c, d){
    return this.firstName + " subtracts " + (a-b-c-d);
}
flip(subtractFourNumbers,this,1)(2,3,4) 
    // here we immediately call the innerFn with innerArg [2, 3, 4]
    // the keyword this refers to to global object, thus that part of the 
    // string will be undefined.
    // the fn.length here is 4
    // the outerArg [1], innerArg [2, 3, 4]
    // allArg = [1, 2, 3, 4].slice(0, 4) -> [].reverse()
    // fn.apply(this, [4, 3, 2, 1]) -> 4 - 3  -2 - 1 = -2  
    
    // "undefined subtracts -2"

flip(subtractFourNumbers,this,1,2)(3,4) // -2
flip(subtractFourNumbers,this,1,2,3)(4) // -2

flip(subtractFourNumbers,this,1,2,3,4)() // -2
    // The default fn.length = 4
    // as you can check in the console: subtractFourNumbers.length
    // innerArg = [], outerArg = [1, 2, 3, 4]
    // allArg.slice(0, 4) -> [1, 2, 3, 4].reverse
    // fn.apply(this, [4, 3, 2, 1]) -> 4 - 3  -2 - 1 = -2

flip(subtractFourNumbers,this)(1,2,3,4) // -2
    // no outerArg, innerArg [1, 2, 3, 4]
    // fn.length: 4
    // 4 - 3 - 2 - 1 = 2 

flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    // allArg = [1, 2, 3, 4, 5, 6, 7].slice(0, 4), cut off at index[4], 5 but not inclusive   
    // allArg.reverse = [4, 3, 2, 1]
flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22
```
## Exercise 6 - Bind
Write a function called bind which accepts a function and a value for the keyword this. 

Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. 

Hint - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. 

You will have to make use of closure!
```js
function bind(fn, thisArg, ...outerArg){
    return function(...innerArg){
        return fn.apply(thisArg, [...outerArg, ...innerArg]);
    };
}

/* 
Compared to the exercise above, note that the return function that will invoke the function passed to bind, may or may not have arguments. The description does not say anything about them but you have to assume that when the function that is passed into bind will hold parameters and those will always be used as the parameters for the return function.

The reason for having to concatenate in the exercise above or to use spread in the current example is because of the possible outerArg that have to be taken into account. If not you just write: fn.apply(this, innerArg).
*/

function firstNameFavoriteColor(favoriteColor){
    return this.firstName + "'s favorite color is " + favoriteColor
}
    
var person = {
    firstName: 'Elie'
}
    
var bindFn = bind(firstNameFavoriteColor, person);
bindFn('green') 
    // innerArg = "green", no outerArg, thus fn.apply(person, ["green"])
    // firstNameFavoriteColor("green"){return person.firstName + "green"}
    // "Elie's favorite color is green"

var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
bindFn2('green') // "Elie's favorite color is blue" 
    // innerArg = "Green", outerArg = "blue"
    // fn.apply(person, ["blue", "green"])
    // firstNameFavoriteColor(["blue", "green"]){return person.firstName + "blue"}
    // "Elie's favorite color is blue"

    // NOTE: t


function addFourNumbers(a,b,c,d){
    return a+b+c+d;
}

bind(addFourNumbers,this,1)(2,3,4) // 10
    // innerArg [2, 3, 4], outerArg [1]
    // this is irrelevant here
    // fn.apply(thisArg, [1, 2, 3, 4]); NOTE: apply spreads out the array into
    // addFourNumbers(1, 2, 3, 4){1 + 2 + 3 + 4} = 10

bind(addFourNumbers,this,1,2)(3,4) // 10
bind(addFourNumbers,this,1,2,3)(4) // 10
bind(addFourNumbers,this,1,2,3,4)() // 10
    // no innerArg
bind(addFourNumbers,this)(1,2,3,4) // 10
    // no outerArg
bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10
    // no outerArg
    // too much innerArg. The default for addFourNumbers is 4.
    // the additional parameters will be IGNORED