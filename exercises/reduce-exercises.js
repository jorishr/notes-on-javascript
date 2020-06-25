/*
##################################
HIGHER ORDER ARRAY METHODS: REDUCE
##############################################################
I.    CONSTRUCT A STRING FROM ARRAY OF STRINGS
II.   ARRAY OF OBJECTS INTO ONE SINGLE OBJECT+COUNT DUPLICATES
III.  FLATTENING AN ARRAY OF ARRAYS
IV.   SUM OF ODD NUMBERS IN AN ARRAY
V.    CREATE FULL NAME FROM TWO OBJECT PROPERTIES IN ARRAY
VI.   EXTRACT A PROPERTY VALUE FROM ARRAY OF OBJECTS
VII.  COUNT VOWELS IN A STRING
VIII. ADD KEY-VALUE PAIR TO AN EXISTING ARRAY OF OBJECTS
IX.   PARTITION ARRAY
X.    MANUALLY RECREATE REDUCE
XI.   JOIN OR CONCAT MULTIPLE ARRAYS
XII.  UNSORTED NUM ARR: FIND THE ONE NUM THAT IS MISSING
##############################################################

SUM OF AN ARRAY WITH MODERN REDUCE METHOD:*/

arr.reduce(acc, val => acc + val);
/*
No acc start value is specified thus acc starts at arr[0] and val starts at 
arr[1]. The loop adds to the acc each next value and the end result of the acc
is the sum of the arr.

For loop version see basic array methods exercises.

############################################
I.  CONSTRUCT A STRING FROM ARRAY OF STRINGS
############################################

Example: turn an array of strings into a single string sentence:
var names = ["Biko", "Max", "Brego"] 
// -> "The dog names I know are: Biko Max Brego."*/

arr.reduce(function(accumulator, nextValue){
	return accumulator + " " + nextValue;
}
, "The dogs I know are:");
/*
The string is built up like this when looping over the array:
"The dogs I know are:" + "Biko" = "The dogs I know are Biko" 
"The dogs I know are Biko" + "Max" = "The dogs I know are Biko Max"
"The dogs I know are Biko Max" + "Brego" = "The dogs I know are Biko Max Brego"  


###########################################
II. ARRAY OF OBJECTS INTO ONE SINGLE OBJECT
###########################################

Construct an object from existing array of objects.

var arr = [5, 4, 1, 4, 5] 

Create an object whereby the property is the value of each number and the value
of each property is the number of times that a value is present in the array. 

Thus {5: 2, 4: 2, 1: 1}

NOTE: you start with an empty object as the accumulator, thus passed in as an 
optional argument.*/

arr.reduce(function(accumulator, nextValue){
	if(nextValue in accumulator){
		return accumulator[nextValue]++;
	} else {
		return accumulator[nextValue] = 1;
	}
	return accumulator;
}, {})
/*
First iteration: accumulator starts at {}, the nextValue is arr[0], thus 5.
5 is not present in the empty object, thus {5: 1}. A new property is created
with the value 5 as property names and 1 as it value.

Second iteration: accumulator is now {5: 1}, nextValue arr[1], thus 4.
Results in: {5: 1, 4: 1}

Third iteration: accumulator: {5: 1, 4: 1}, nextValue arr[2], thus 1.
Results in: {5: 1, 4: 1, 1: 1}

Fourth iteration: accumulator: {5: 1, 4: 1, 1: 1}, nextValue arr[3], thus 4.
This value is already present in the object as a property, thus this results
in: {5: 1, 4: 2, 1: 1}

Fifth iteration: accumulator: {5: 1, 4: 2, 1: 1}, nextValue arr[4], thus 5.
This value is already present in the object as a property, thus this results 
in: {5: 2, 4: 2, 1: 1}

NOTE: this is an efficient way to count duplicates in an array of objects.
NOTE: [] to evaluate nextValue instead of hard coding "nextValue" into the 
object as a property.


###################################
III.  FLATTENING AN ARRAY OF ARRAYS
###################################

Use the REDUCE method in combination with the concat method to “flatten” 
an array of arrays into a single array that has all the elements of the 
original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];
→ [1, 2, 3, 4, 5, 6]

The REDUCE function takes a combineFunction and a startValue, and it produces
an array. Instead of starting at 0 you can start at [], the first array 
inside the array. The reduce function than loops over the arrays array and 
adds the currentArrray to the innerFirstArray.
*/

arrays.reduce((innerFirstArray, currentArray) => innerFirstArray.concat(currentArray), []);


/*
##################################
IV. SUM OF ODD NUMBERS IN AN ARRAY
##################################
- start with accumulator at zero, not arr[0]
- next you only need to check whether the nextValue is odd
- if so, add to accumulator */
function sumOddNumbers(arr){
  return arr.reduce(function(accumulator, nextValue){
    if(nextValue % 2 !== 0){
      accumulator += nextValue;
    }
    return accumulator;  
  }, 0);
}
var arr = [1, 2, 3, 4, 5] 
sumOddNumbers(arr) // -> 9


/* 
########################################################
V.  CREATE FULL NAME FROM TWO OBJECT PROPERTIES IN ARRAY
########################################################

var arrOfObj = [
  {first: "Joris", second: "R"}, 
    {first: "Jan", second: "En Alleman"}, 
      {first: "Dom", second: "Blondje"}
]
*/
function fullName(arr){
  return arr.reduce(function(accumulator, nextValue){
    accumulator.push(nextValue.first + " " + nextValue.second)
    return accumulator;
  }, []);
}
fullName(arrOfObj) // -> ["Joris R", "Jan En Alleman", "Dom Blondje"]

// Using string interpellation
function fullName(arr){
  return arr.reduce(function(accumulator, nextValue){
    accumulator.push(`${nextValue.first} ${nextValue.second}`)
    return accumulator;
  }, []);
}
/* 
Construct an array of strings with the full name stored in each object.
NOTE: we assume those properties are present in all the objects.
- start the accumulator as an empty array.
- when looping over the value of the array, the respective objects, you
push to the new array (accumulator) the .first and .second values of each
object in the original array.


/*
##################################################
VI. EXTRACT A PROPERTY VALUE FROM ARRAY OF OBJECTS
##################################################

Write a function called extractValue which accepts an array of objects and a
key and returns a new array with the value of each object at the key.*/

function extractValue(arr, key){
  return arr.reduce(function(accumulator, nextValue){
      accumulator.push(nextValue[key]);
      return accumulator;
  }, []);
}

var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']


/*
##############################
VII.  COUNT VOWELS IN A STRING
##############################
Write a function called vowelCount which accepts a string and returns an 
object with the keys as the vowel and the values as the number of times 
the vowel appears in the string. This function should be case insensitive 
so a lowercase letter and uppercase letter should count.*/

function vowelCount(string){
  var vowels = "aeoui"
  return string.toLowerCase().split("").reduce(function(accumulator, nextValue){
    if(vowels.indexOf(nextValue) !== -1){
      if(nextValue in accumulator){
        accumulator[nextValue]++;
      } else {
        accumulator[nextValue] = 1;
      } 
    }
    return accumulator;
  }, {});
}
vowelCount('Elie') // {e:2,i:1};
vowelCount('Tim') // {i:1};
vowelCount('Matt') // {a:1})
vowelCount('hmmm') // {};
vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
/*
- toLowerCase is better to perform on the string immediately and not at the
indexOf because if not the capitalized letter will be pushed into the object


/*
########################################################
VIII. ADD KEY-VALUE PAIR TO AN EXISTING ARRAY OF OBJECTS
########################################################

Write a function called addKeyAndValue which accepts an array of objects and
returns the array of objects passed to it with each object now including the
key and value passed to the function.*/

function addKeyAndValue(arr, key, value){
  return arr.reduce(function(acc, next, indx){
     acc[indx][key] = value;
    return acc;
  }, arr); 
}
var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
addKeyAndValue(arr, 'title', 'Instructor') 
/*
[ {title: 'Instructor', name: 'Elie'}, 
  {title: 'Instructor', name: 'Tim'}, 
  {title: 'Instructor', name: 'Matt'}, 
  {title: 'Instructor', name: 'Colt'}
]
NOTES: we are modifying an existing array of objects, thus we should set
the accumulator to start with that same array.

IMPORTANT is the use of the index parameter in the callback function:
We do not start with an empty array, therefore when looping through the
original array and adding new properties, we have to specify at which index
position to do so:
- first iteration: 
acc = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
we create acc[0]["title"] = "Instructor" 

- second iteration: 
acc = [{title: "Instructor", name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'},
  {name: 'Colt'}]
we create acc[1]["title"] = "Instructor"

- third iteration acc starts as:
acc = [{title: "Instructor", name: 'Elie'}, 
      {title: "Instructor", name: 'Tim'}, 
      {name: 'Matt'}, {name: 'Colt'}] etc...



###################
IX. PARTITION ARRAY
###################

Write a function called partition which accepts an array and a callback and 
returns an array with two arrays inside of it.

The partition function should run the callback function on each value in the
array and if the result of the callback function at that specific value is 
true, the value should be placed in the first subarray. 

If the result of the callback function at that specific value is false, the
value should be placed in the second subarray. */

function partition(arr, callBackFn){
  return arr.reduce(function(acc, next){
    if(callBackFn(next)){
      acc[0].push(next);
    } else {
      acc[1].push(next);
    }
    return acc;
  }, [[], []]);
}
/*
NOTE: Important here is the callBackFn(next), you have to specify the value
at which the callBackFn is called. Not merely state the function. 

Second, you start the accumulator at an empty array with two empty subarrays
inside of it, the first subarray thus has [0], the second [1]

Then if the value passed through the callbackfunction returns true, you
push it to the first array inside the array at acc[0]

If returns false, push to second subarray at acc[1]*/

function isEven(val){
  return val % 2 === 0;
}

var arr = [1,2,3,4,5,6,7,8];
partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
function isLongerThanThreeCharacters(val){
  return val.length > 3;
}

var names = ['Elie', 'Colt', 'Tim', 'Matt'];
partition(names, isLongerThanThreeCharacters) 
// [['Elie', 'Colt', 'Matt'], ['Tim']] 


/*
##############################
X.    MANUALLY RECREATE REDUCE
##############################

- Take in the cb and accumulator value.
- check if accStart value is provided, if true: 
accStartVal = accVal and nextVal = arr[0]
- if false: accStartVal = this[0] and nextVal = this[1]

- the loop needs to ignore the first value in the array if an accStartVal is
provided because then the starting value for the acc = arr[0], the first
element in the array
*/

Array.prototype.myReduce= function(cb, accVal){
  let l = 0;
  if(!accVal){
    accVal  = this[0];
    l = 1;
  }
  //console.log(accVal)

  for(let i = l; i < this.length; i++){
    accVal = cb(accVal, this[i], i, this);  
    //console.log('this[i]:', this[i])
    //console.log('accVal:', accVal)
  }
  return accVal;
}

[1,2,3].myReduce((a,b) => a + b);       //-> 6 
[1,2,3].myReduce((a,b) => a + b, 5);    //-> 11 


/*
##################################
V.  JOIN OR CONCAT MULTIPLE ARRAYS
##################################

Write a function called joinArrays which accepts a variable number of 
parameters (you can assume that each argument to this function will be an 
array) and returns an array of all of the parameters concatenated together

When declaring the function with the rest parameter we get an array of 
arrays. Next reduce that array of arrays to one single array by 
concatenating. The startingValue of the accumulator is an empty array to
which you add each subsequent value of the array of array.
*/
let joinArrays = (...arg) => arg.reduce((acc, next) => acc.concat(next), []);

joinArrays([1],[2],[3]) // [1,2,3]
joinArrays([1],[2],[3],[1],[2],[3]) // [1,2,3,1,2,3]
joinArrays([1,2,3],[4,5,6],[7,8,9]) // [1,2,3,4,5,6,7,8,9]
joinArrays([1],[3],[0],[7]) // [1,3,0,7]

// REDUCE TO A STRING OF NUMBERS
let joinArrays = (...arg) => arg.reduce((acc, next) => acc + next);
joinArrays([1],[2],[3]) // "123"


/*
#######################################
XII.  FIND ONE MISSING VALUE IN NUM ARR
#######################################
Arr with numbers 1-100 sorted or unsorted. Find the missing number.
*/
const arr = [];
for(let i = 1; i <= 100; i++){
  arr.push(i);
}
/*sort the arr first then you can loop over it and expect each next value to be
i+1
*/
function findMissing(arr){
  arr.sort((a,b) => a - b);
  let tracker = 1;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== tracker){
      return tracker;
    }
    tracker += 1;
  }
}
/*
Smarter solution: if one number is missing then the sum of the array is 
different than the sum of the array 1-100. The difference is the missing 
number.
*/
function sum(arr){
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  return sum;
}
/*
// -> 5047 vs 5050 -> 3. 
To automate this for any type of array use a math formula whereby the total sum
of an array of numbers is: n x (x + 1) / 2
Thus for an array of 100 numbers: 100 x (100 + 1) / 2 or 5050;
*/
function findMissing(arr){
  let expectedTotal = ((arr.length + 1) * (arr.length + 1 + 1)) / 2; 
  let actualTotal = arr.reduce((acc, val) => acc + val);
  let missingNum = expectedTotal - actualTotal;
  return missingNum;
}
//-> 3
