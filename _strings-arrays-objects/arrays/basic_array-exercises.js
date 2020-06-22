/*
INDEX
1.  SUM OF ARRAY
2.  MAX OF ARRAY
3.  CALCULATE AVERAGE
4.  PRINT AN ARRAY IN REVERSE
5.  FIND DUPLICATE IN ARR
6.  CHECK FOR IDENTICAL VALUES
7.  INSERT ARR IN MIDDLE OF ANOTHER ARRAY
8.  CREATE COPY OF AN ARRAY
9.  EMPTY AN ARRAY
10. SHUFFLE AN ARRAY
11. SWAP VALUES IN ARRAY
12. ROTATE ARRAY VALUES


################
1.  SUM OF ARRAY
################

Write a function that accepts an array of numbers and returns the sum of all
the numbers in the array.

sumArray([1, 2, 3]);  //-> 6
*/
function sumArray(arr){
  var total = 0;
  arr.forEach(function(elem){
    total += elem;
  })
  return total;
}
sumArray([1,4,1,3,1,1]);  //-> 11
sumArray([1,1,1,1,1,1]);  //-> 6

//create a variable that holds AND updates the total when we run through the array

//WITH MODERN REDUCE METHOD:

arr.reduce(acc, val => acc + val);
/*
No acc start value is specified thus acc starts at arr[0] and val starts at 
arr[1]. The loop adds to the acc each next value and the end result of the acc
is the sum of the arr.

/*
MIN AND MAX SUM OF AN ARRAY
When you take out a number from any given arr the max sum changes. Find that
max and min sum.

In other words, what is the minimum Sum if you would take out the largest 
number of the array. And what is the maximun sum if you would take out the 
smallest number from the array.
*/
function findMinMax(arr){
  let minNum = Math.min.apply(null, arr); //
  let maxNum = Math.max.apply(null, arr);

  arrSum = arr.reduce((acc, val) => acc + val);

  minSum = arrSum - maxNum;
  maxSum = arrSum - minNum;

  return JSON.stringify({maxSum: maxSum, minSum: minSum})
}
findMinMax([1,2,3,4]) //-> {maxSum: 9; minSum: 6}

/*
################
2.  MAX OF ARRAY
################
Write a function that accepts an array of numbers and return the max number in 
that array.

max([1,2,3]) //3
*/
function max(arr){
  var highest = arr[0]; //keep track of the highest item, starting with the first
  //loop through with for or .forEach
  for(var i = 1; i < arr.length; i++){
    if(arr[i] > highest){
      highest = arr[i]; //the variable will change if a higher one is detected
    }
  }
  return highest;
}
max([1,4,1,3,1,1]);   //-> 4
max([123256666,3443344,13335545,3,1000,14]);  //-> 123256666 

/*
#####################
3.  CALCULATE AVERAGE
##################### 
Define a function named "average" that takes a single parameter: an array of 
test scores (all numbers). 

It should return the average score in the array, rounded to the nearest whole 
number.
*/
function average(arr){
  var total = 0;
  arr.forEach(function(punten){
      total += punten; //punten refereert naar elke individueel nummer in de array       
  });
  var gemiddelde = total/arr.length;
  return Math.round(gemiddelde);
}
var scores = [90, 98, 89,100, 100, 86, 94];
console.log(average(scores));
var scores2 = [49, 65, 77, 82,80, 54, 73, 63, 95, 49];
console.log(average(scores2));

/*
#############################
4.  PRINT AN ARRAY IN REVERSE
#############################
Write a function that takes an array as single argument AND prints out the
array in reverse order, without changing the order of the array.
Thus [1,2,3,4] prints out as 4,3,2,1
*/

var listN = [1,2,3,4,5,6,7,8,9,10];

for(var i = listN.length - 1; i >=0 ; i--){
  document.write(listN[i]+"<br />");
}
//loop over array in reverse and log/write

/*
#########################
5.  FIND DUPLICATE IN ARR
#########################
1. loop inside a loop
*/

function findDup(arr){
  for(let i = 0; i < arr.length; i++){
    let check = arr[i];
    let count = 0;
    for(let x = 0; x < arr.length; x++){
      if(arr[x] === check){count++}
      if(count > 1){return console.log(arr[x])}
    }
  }
  return console.log('no duplicates found');
}
findDup([1,2,3,4,4,5])  //-> 4
findDup([1,2,3,4,5])    //-> 'no duplicates found'
/*
Limitations: if there is more than one number duplicate, that will not be found
findDup([1,2,3,4,4,5,5])  //-> 4

Plus, two for loops will cost more computational power.

2. One loop: push to unique list or duplicates arr*/
function findDup(arr){
  let uniqueList = [];
  let dups = [];
  for (let i = 0; i < arr.length; i++){
    if(uniqueList.includes(arr[i])){
      if(dups.indexOf(arr[i]) === -1){
        dups.push(arr[i]);
      }
    }else {
      if(uniqueList.indexOf(arr[i]) === -1){
        uniqueList.push(arr[i])
      }
    }
  }
  console.log(uniqueList)
  console.log(dups)
}

findDup([1,2,3])      //-> [1,2,3], []
findDup([1,2,3,4,4])  //-> [1,2,3,4], [4]
/*
Note the extra conditional statement indexOf, without it each duplicate 
gets added to the arr as many times as it is found:

findDup([1,2,3,4,4,4])  //-> [4,4]


2. Dictionary Object Solution. 
*/

function findDup(arr){
  let dups = [];
  let obj = {};
  for(let i = 0; i < arr.length; i++){
    if(!obj[arr[i]]){obj[arr[i]] = 1}
    else {dups.push(arr[i])}
  }
  return dups;
}
findDup([1,2,3,4,4,5]); //-> [4]
findDup([1,2,3,4,4,5,5]); //-> [4,5]
findDup([1,2,3,4,4,4,5,5]); //-> [4,4,5]
/*
This a dictionary like approach. You start with an empty object. The loop adds
keys to the object with a random value (here:1) when object[arr[i]] is null, 
thus when obj {arr[i]: val} does not exist. 

If it does exist, the if() condition is false and we know we have a duplicate.

The solution with the two arrays is similar but more code.

3. Reduce method solution*/

function findDup(arr){
  let duplicate = arr.reduce((acc,currentValue,index, array) => {
    if(array.indexOf(currentValue)!=index && !acc.includes(currentValue)) acc.push(currentValue);
    return acc;
  }, []);
  
  console.log('Duplicate items are ' + duplicate.join(','));
}
/*
- the end state of the acc should be an array that contains all the duplicates.
- indexOf always returns ONLY the FIRST instance of value. 
Thus in [1,1,1].indexOf(1) //-> will always be 0
- when the loop finds a value 1 at index position 3, the condition
arr.indexOf(1) will return 0 while index (in the loop) = 3
- the means we have a duplicate this should be pushed to the acc array.
- if that value is already found to have a previous duplicate nothing happens.
!acc.includes(val)

acc | val | i (loop)  | indexOf(val) in arr
[]    2     5             5                 -> no action
[]    2     7             5                 -> duplicate, acc = [2]
[2]   2     11            5                 -> duplicate, no action
[2]   3     12            12                -> no action
[2]   3     13            12                -> duplicate, acc = [2,3] 


4.   REMOVE DUPLICATES FROM ARRAY
No loops, no functions:
*/
let arr = [1,2,2,3];
let newArr = [...new Set(arr)];
/*
The new Set creates a new SET, thus you have to spread it out into an 
empty array.

##############################
6.  CHECK FOR IDENTICAL VALUES
##############################
Write a function that takes an array as single argument AND returns true if
all the elements in the array are identical.

The argument arr refers to any array we will use as input
*/
function isUniform(arr){
  var compare = arr[0]; //index position 0, the first item as compare value
  for(var i = 1; i < arr.length; i++){
    if(arr[i] !== compare){
      return false;
    }
  }
  return true; 
}
isUniform([1,4,1,3,1,1]);   //-> false
isUniform([1,1,1,1,1,1]);   //-> true
isUniform(["a","a","a","a","a","a"]);   //-> true
isUniform(["a","a","a","a","a","f"]);   //-> false
/*
No need to work with ELSE because once we get through to the end of the loop,
the result is obvious, so just put in a RETURN true

IMPORTANT: if logic, we don't need a true return every time we encounter an
identical element. Thus, invert the logic: if it is not identical then return
false and the loop ends. If we make it all the way to the end of the array
without finding a different item, only then we return true.

SAME EXERCISE WITH .forEach cannot be used. Spot the problem!
*/
function isUniform(arr){
  var compare = arr[0];
  arr.forEach(function(element){
    if(element !== compare){
        return false;
    }
  })
  return true;
}
isUniform([1,4,1,3,1,1]);   //-> false

/*
SPOT THE PROBLEM: the first return that ends the .forEach does not end the
isUniform function! Thus the return value will be the second return: true.
REMEMBER: a return only peals back one layer


##################################
7.    INSERT IN MIDDLE OF AN ARRAY
##################################

Write a function called placeInMiddle which accepts two parameters, an array
and another array. This function should return the first array with all of 
the values of the second array placed in the middle of the first array.

- find the middle of an array: Math.floor(arr.length /2), NOTE: if the array
has uneven length, example 3, the middle is index position 1. On that 
position you start adding the other arr values.

- to add values to an array, use SPLICE which accepts three parameters:
splice(beginPos, howManyValueToRemove, listOfValuestoAddSeperatedByComma)
*/
let placeInMiddle = (arr, arrToAdd) => {
  let middle = Math.floor(arr.length / 2);
  arr.splice(middle, 0, ...arrToAdd);
  return arr; // return the arr after the .splice method is applied.
}

placeInMiddle([1,2,6,7],[3,4,5]) // [1,2,3,4,5,6,7]
placeInMiddle([1],[3,4,5]) // [3,4,5,1]
placeInMiddle([1,6],[2,3,4,5]) // [1,2,3,4,5,6]
placeInMiddle([],[2,3,4,5]) // [2,3,4,5]

/*
###################
8.    COPY AN ARRAY
###################

- loop
- slice()
- es6: object, spread, Array.from()
These are shallow copies: we just copy the elements. If a prototype would be
present, this is ignored. 
To make a deep copy

*/
//not a copy but new reference, thus if you change b, a changes as well
let a = [1,2,3];
let b = a;

//loop

let b = [];
for(let i = 0; i < a.length; i++){
  b.push(a[i]);
}

//slice
let b = a.slice();

//ES6: Object
let b = Object.assign([], a);

//ES6: spread
let b = [...a];

//ES6: Array.from
let b = Array.from(a);

/*
####################
9.    EMPTY AN ARRAY
####################
*/
var arr = ['a','b','c','d','e','f'];
var refArr = arr;

//set value of arr to []
arr = [];
console.log(arr);     //-> []
console.log(refArr);  //-> ['a','b','c','d','e','f']
//note that a new arr is created, other references remain unaffected

//set length to zero
arr.length = 0;
console.log(arr);     //-> []
console.log(refArr);  //-> []

//splice, starting at index 0 and .length number of values
arr.splice(0, arr.length);

console.log(arr)      //-> []
console.log(refArr);  //-> []

//loop over it and pop  (start at back, include position 0)
for(let i = arr.length - 1; i > -1; i--){
  arr.pop();
}

while(arr.length){    // 0 -> false
  arr.pop();
}
console.log(arr)      //-> []
console.log(refArr);  //-> []
/*
#################
10. SHUFFLE ARRAY
#################
- loop over the arr and for each value you pick another value and swap places
*/
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    console.log(arr[i], arr[randomIndex])
    swap(arr, arr[i], arr[randomIndex]);
  }
  return arr;
}
/*
########################
11. SWAP VALUES IN ARRAY
########################
*/
const swap = function(arr, elemA, elemB){
  if(!arr.includes(elemA) || !arr.includes(elemB)){
    console.warn(`ERROR: At least one parameter is not a value of the array`);
    return null;
  } else if(elemA === elemB){
    return arr;    
  } else if(elemA != null && elemB != null){   
    let indexA = 0;
    let indexB = 0;
    while(arr[indexA] !== elemA){
      indexA++;
    }
    while(arr[indexB] !== elemB){
      indexB++;
    }
    arr[indexA] = elemB;
    arr[indexB] = elemA;
    console.log(`Element ${elemA} and element ${elemB} swapped places succesfully`);
    return arr;
  } else {
    console.warn('WARNING: Swap function parameter(s) invalid. No swap operation performed. Number values expected.');
    return arr;
  }
}
const myArr = [1,5,6,3,4,7,9,2,8];
const sortedArr = selectionSort(myArr);
console.log(sortedArr);

console.log(shuffle(myArr));
console.log(shuffle(myArr));
console.log(shuffle(myArr));

/*
#######################
12. ROTATE ARRAY VALUES
#######################
Write a function that takes and step value (integer) that return an array with
the original values shifted to the left/right x step positions.

LOGIC
The rotation consists of popping the last element from the array and inserting 
it at the front. The native pop() and unshift() functions can be used. 
Repeat this process with a loop as many times as the step value indicates.

For negative step values the rotation is elimating the firest value and 
inserting that value at end of the array. The shift() and push() methods can be
used.

Time complexity is O(1) at best and O(n) at worst (with being the number of steps to shift).
*/
function rotate(array, stepsToShift){
  if(stepsToShift > 0){
    for (let i = 0; i < stepsToShift; i++){
      array.unshift(array.pop());
    }
  } else {
    for (let i = stepsToShift; i < 0; i++){
      array.push(array.shift());
    }
  }
  return array;
}

rotate(['a', 'b', 'c', 'd'], 1);    //-> ["d", "a", "b", "c"]
rotate(['a', 'b', 'c', 'd'], 2);    //-> ["c", "d", "a", "b"]

rotate(['a', 'b', 'c', 'd'], -1);   //-> ["b", "c", "d", "a"]
rotate(['a', 'b', 'c', 'd'], -2);   //-> ["c", "d", "a", "b"]   


/*
Write a function that takes in array of weekdays and prints out the next 7 
days after today.

LOGIC
- find index position of today: getDay() returns 0-6 with 0 = Sunday
- print n+1
- problem arises when n = 6 (Saturday) because there is no index position 7 (6 + 1)
- to start counting again from 0 modulo can be used:
7 % 7 = 0 and for all index numbers < 7 the result of n % 7 is always n
Sunday: 0 + 1 = 1 and 1 % 7 = 1, thus next day after Sunday is weekdays[1]
Monday: 1 + 1 = 2 and 2 % 7 = 2, thus next day after Monday is weekdays[2]
...
Saturday: 6 + 1 = 7 and 7 % 7 = 0, thus next day after Saturday is weekdays[0]

To print out not only the next day but the next 7 days, use a loop that 
increments 7 times.
*/
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function nextDay(arr){
  const today = new Date();
  const n     = today.getDay();
  console.log(weekdays[(n + 1) % 7]);
}
function next7Days(arr){
  const today = new Date();
  const n     = today.getDay();
  for(let i = 0; i < 7; i++){
    console.log(weekdays[(n + 1 + i) % 7]);
  }
}