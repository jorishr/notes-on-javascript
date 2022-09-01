/*
#################################
HIGHER ORDER ARRAY METHODS: EVERY
#################################
I.    MANUAL EVERY FUNCTION
II.   ARE ALL CHARACTERS IN THE STRING LOWERCASE?
III.  ARE ALL THE ELEMENTS IN THE ARRAY ARRAYS THEMSELVES?
IV.   ARE ALL THE NUMBERS IN THE ARRAY NUMBER ODD/EVEN?
V.    HAS NO DUPLICATES
VI.   DO ALL OBJECTS HAVE THE SAME SPECIFIC PROPERTY?
VII.  DO ALL OBJECTS IN THE ARRAY HAVE A CERTAIN KEY-VALUE PAIR?

#########################
I.  MANUAL EVERY FUNCTION
#########################

Implement every as a function that takes an array and a predicate function as 
parameters. 

function every(array, testFunction) {
// Your code here.
}

Write two versions, one using a loop and one using the some method.
*/

function every(array, testFunction) {
    for (let element of array) {
      if (!testFunction(element)) return false;
    }
    return true;
};

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

/* 
LOGIC 
You loop over every element in the array and testFunction every element.
If the element passes the test (n < 10 = true) -> if statement true
use the the ! for the when the element does not pass the test
In all other cases, incl. [], return true.
*/

function every2(array, predicate) {
    return !array.some(element => !predicate(element));
}
/* 
LOGIC

If any of the elements returns true when tested, we flip it an get a false 
result for some. This means that some elements within the array comply with 
the test condition but others don't. 
Thus we flip the result of the !array.some to get false.

When none of the elements comply with the test, some will return false but it 
flipped to true. And flipped again to false.

When all of the elements comply with the test, some will return true, this is
flipped to false, and again to true.

NOTE:
Like the && operator, the every method can stop evaluating further elements 
as soon as it has found one that doesn’t match. 

Thus the loop-based version can jump out of the loop—with break or return as 
soon as it runs into an element for which the predicate function returns 
false. 

If the loop runs to its end without finding such an element, we know that all
elements matched and we should return true.

To build every on top of some, we can apply De Morgan’s laws, which state that 
a && b equals !(!a || !b). This can be generalized to arrays, where all 
elements in the array match if there is no element in the array that does not 
match. 


###############################################
II. ARE ALL CHARACTERS IN THE STRING LOWERCASE?
###############################################*/

function allLowercase(string){
  return string.split("").every(function(value){
    return value === value.toLowerCase();
  });
}
allLowercase("Hello World") // -> false
allLowercase("hello world") // -> true
// compare value to itself, but converted to lowercase()


/*
##########################################################
III.  ARE ALL THE ELEMENTS IN THE ARRAY ARRAYS THEMSELVES?
##########################################################

To solve this problem you need to know the built-in JS constructor function 
Array and its properties like .isArray.

Instead of writing our own callBackFn with a conditional, you can use any
other built-in function that returns a bolean.*/

function allArrays(arr){
  return arr.every(Array.isArray);
}

allArrays([["a", "b"], ["name", "b"]]) // -> true
allArrays([["a", "b"], {name: "name"}]) // -> false

// For objects you can use typeof, Note: all arrays are objects.
function allArrays(arr){
  return arr.every(function(value){
    return typeof value === "object";
  });
};
allArrays([["a", "b"], ["name", "b"]])


/*
#####################################################
IV. ARE ALL THE NUMBERS IN THE ARRAY NUMBER ODD/EVEN?
#####################################################

Write a function called hasOnlyOddNumbers which accepts an array and returns
true if every single number in the array is odd. 

If any of the values in the array are not odd, the function should return 
false.*/

function hasOnlyOddNumbers(arr){
  return arr.every(function(value){
    return value % 2 !== 0;
  });
}
hasOnlyOddNumbers([1,3,5,7]) // true
hasOnlyOddNumbers([1,2,3,5,7]) // false

/*
#####################
V.  HAS NO DUPLICATES
#####################

Write a function called hasNoDuplicates which accepts an array and returns 
true if there are no duplicate values (more than one element in the array 
that has the same value as another). 

If there are any duplicates, the function should return false.

NOTE: to solve this you have to compare whether the index position of a 
value really is the last index position that can be found for that value. 

Thus use indexOf AND lastIndexOf on the arr. Check whether this is the 
case for all values, if not, false is returned.*/

function hasNoDuplicates(arr){
  return arr.every(function(value){
    return arr.indexOf(value) === arr.lastIndexOf(value);
  })
}
hasNoDuplicates([1,2,3,1]) // false
hasNoDuplicates([1,2,3]) // true


/*
####################################################
VI.  DO ALL OBJECTS HAVE THE SAME SPECIFIC PROPERTY?
####################################################

Write a function called hasCertainKey which accepts an array of objects
and a key, and returns true if every single object in the array contains 
that key. 
Otherwise it should return false.

NOTE: to check whether a properties or key is present in an object: 
use the IN operator.*/

function hasCertainKey(arr, property){
  return arr.every(function(value){
    return property in value;
  })
}

var arr = [
  {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
  {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
  {title: "Instructor", first: 'Matt', last:"Lane"}, 
  {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
]
hasCertainKey(arr,'first') // -> true
hasCertainKey(arr,'isCatOwner') // -> false


/*
################################################################
VII.  DO ALL OBJECTS IN THE ARRAY HAVE A CERTAIN KEY-VALUE PAIR?
################################################################

Write a function called hasCertainValue which accepts an array of objects 
and a key, and a value, and returns true if every single object in the array
contains that value for the specific key. 

Otherwise it should return false.*/

function hasCertainValue(arr, key, value){
  return arr.every(function(val){
    return (key in val && val[key] === value);
  })
}
var arr = [
    {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
    {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
    {title: "Instructor", first: 'Matt', last:"Lane"}, 
    {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
]
hasCertainValue(arr,'title','Instructor') // -> true
hasCertainValue(arr,'first','Elie') // -> false
/*
- we need to comply with not one but two conditions -> &&
- check whether the key is present in the respective object when looping
over the array of objects.
- evaluate that property for each object and check if is equal to the given
value.

NOTE: BETTER: read in wrong. key in val is redundant.
NOTE: BETTER: be more specific when using val and value, that can be 
confusing, use searchValue instead.*/

function hasCertainValue(arr, key, searchValue){
  return arr.every(function(value){
    return value[key] === searchValue;
  });
}