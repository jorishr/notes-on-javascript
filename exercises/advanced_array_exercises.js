/*
#################################
ELOQUENT JS: CHAPTER IV EXERCISES
#############################################
I.      COPY ARRAY AND EXCLUDE SPECIFIC VALUE
II.     SUM OF AN ARRAY
III.    RANGE, STEP INCREMENTS, REVERSE LOOPS
IV.     REVERSING AN ARRAY (WITH NEW ARRAY)
V.      MODIFY OR REVERSE ARRAY
VI.     PICK RANDOM VALUE FROM ARRAY
VII.    TWO DIMENSIONAL ARRAY: SUM OF BORDERS
#############################################


#########################################
I.  COPY ARRAY AND EXCLUDE SPECIFIC VALUE
#########################################

//COPY ARRAY


Write a function that takes an array and an index, and it returns a new array 
that is a copy of the original array with the element at the given index 
position removed.
*/	
function copyRemove(array, index){
    return array.slice(0, index)
                .concat(array.slice(index + 1);	
}
copyRemove(["a", "b", "c"], 1)  // -> ["a, "c"];
/*
- you cut the first part up untill the index
- concat with the part starting at index +1
- remember: slice(1,2): start indices is inclusive, end exclusive	


#######################
II.    SUM OF AN ARRAY
#######################

Create a function sum that takes an array of number and returns the sum of
the numbers from that array.
*/
function sum(array){
    let result = 0;
    for(let element of array){ //loop over the array, add each element to sum
        result = result + element;
    } //shorter: result += element;
    return result;
}

//USING HIGHER ORDER METHOD REDUCE

var arr = [1, 2, 3, 4, 5];
arr.reduce(function(accumulator, nextValue){
	return accumulator + nextValue;
}); 

/*
NOTE: no optional argument, thus startValue for accumulator is the first value 
in the arr[0], thus 1. The nextValue therefore is arr[1], thus 2.

If you run through the call stack this is what happens when looping over the 
array:

first iteration: 1 + 2 = 3
second iteration with accumulator now 3:    3 + 3 = 6
third iteration with accumulator now 6:     6 + 4 = 10
fourth iteration with accumulator now 10:   10 + 5 = 15

Done. End value for accumulator: 15. The reduce method returns 15. 

Same exercise WITH and optional parameter set at 10 means that the accumulator 
starts at 10, and the nextValue starts at index[0], thus 1:*/

arr.reduce(function(accumulator, nextValue){
	return accumulator + nextValue;
}, 10); 
/*
10 + 1 = 11
11 + 2 = 13
13 + 3 = 16
16 + 4 = 20
20 + 5 = 25

Thus here the return value for the reduce method is 25.


/*
##########################################
III. RANGE, STEP INCREMENTS, REVERSE LOOPS
##########################################

Write a range function that takes two arguments, start and end, and returns 
an array containing all the numbers from start up to (and including) end.
*/
function range(start, end){
    let arrayRange = [];
    for(let i = start; i <= end; i++){ //end has to be included, thus <=
        arrayRange.push(i);
    }
    return arrayRange;
}
/*build up an empty array loop through the range and add the numbers one by 
one to the array*/
range(5, 8);    //-> [5, 6, 7, 8]

/*
BONUS
Modify your range function to take an optional third argument that indicates 
the “step” value used when building the array. If no step is given, the 
elements go up by increments of one, corresponding to the old behavior.*/

function range(start, end, step = 1){ //optional parameter, think = 1
    let arrayRange = [];
    for(let i = start; i <= end; i += step){ //step think modify i++ of the loop
        arrayRange.push(i);
    }
    return arrayRange;
}
/*
NOTE: the above does not work for descending ranges 10,1 or negative step 
values, it returns an empty array []

To solve this change the default step parameter to either 1 or -1 by using
the conditional operator (bolean expresion ? x : y). The value on the left 
of the question mark “picks” which of the other two values will come out. 

To account for a descending range: the step in a descending range HAS to
be a negative value, if not it would be ascending. 

Plus, the loop has to be adjusted. In 1,10 range [i] goes from 1 to 10 and 
the loop stops one [] <= 10.

But in 10,1 range the loop starts at 10, the i++ is negative and thus goes 
from 10 to 9 to 8 and needs to be stopped at 1, therefore >= end.
*/

function range(start, end, step = start < end ? 1 : -1){ //true: 1; false (end < start): -1
    let arrayRange = [];
    if(step < 0){
        for(let i = start; i >= end; i += step){
            arrayRange.push(i);
        }
    } else {
        for(let i = start; i <= end; i += step){ //step think modify i++ of the loop
            arrayRange.push(i);
        }
    }
    return arrayRange;
}

/*
######################
IV. REVERSING AN ARRAY
######################

Write a function that takes an array as argument and produces a new array that 
has the same elements in the inverse order.

Arrays have a reverse method that changes the array by inverting the order in 
which its elements appear.

Write the function WITHOUT using the built-in method reverse().
*/
function arrayReverse(array){
    let newArray = [];
    for(elements of array){
        newArray.unshift(elements);
    }
    return newArray;
}
arrayReverse([a,b,c])   //-> [a] -> [b,a] -> [c,b,a]
/* Build a new array and loop over the given array in ascending order. By using
the .unshift method you add each element at the beginning of the new array 
before the previous one, thereby reversing the array. 

The same can be done by looping over the array backwards and using .push
although this is more complicated:*/

function arrayReverse(array){
    let newArray = [];
    for(let i = array.length - 1; i >= 0; i--){ //last postion of [] is array.length -1
        let elements = array[i];
        newArray.push(elements);
    }
    return newArray;
}

/*
####################################
V.  MODIFY OR REVERSE EXISTING ARRAY
####################################

Write a function that takes an array as argument and modifies the given array by 
rearranging its elements. 
*/
function arrayReverseNow(array){
    for(let i = 0; i < Math.floor((array.length) / 2); i++){
        let temp = array[array.length -1 -i];
        array[array.length - 1 - i] = array[i];
        array[i] = temp;
    }
    return array;
}
arrayReverseNow([1,2,3,4]);     //-> [4,2,3,1] -> [4, 3, 2, 1]  
/*
with temp = arr[4 -1 -0] thus temp = arr[3] = 4 and arr[3] = arr[0] = 1
with temp = arr[4 -1 -1] thus temp = arr[2] = 3 and arr[2] = arr[1] = 2
*/
arrayReverseNow([1,2,3,4,5]);   //-> [5,4,3,2,1]
/*
Reversing the array means you only have to go halfway as you swap the value at 
position 0 with position arr.length -1 and position 1 with arr.length -2, etc. 
In an odd numbered array the middle elements remains always the same. For the 
odd arrays length /2 produces a decimal number that has to be rounded down.

To swap the elements without losing them when you overwrite on their
position, you can hold the value in a temporary binding. Update the position of
the loop arr[i] with the temp binding value.

Alternatively you can hold the first element in the temp binding instead of the
last one.*/

function arrayReverseNow(array){
    for(let i = 0; i < Math.floor(array.length / 2); i++){
        let temp = array[i];
        array[i] = array[array.length -1 -i];
        array[array.length -1 -i] = temp; 
    }
    return array;
}


/*
###########################
VI. RANDOM VALUE FROM ARRAY
###########################
- produce a random number > 0 and less than arr.length -1
- call that number on the array as property
*/
let arr = [1,2,3,4];
let x = arr.length -1;
let raNum = Math.round(x * Math.random()); 
let randomVal = arr[raNum] //-> produces element on that position in the array


/*
#############################################
VII.    TWO DIMENSIONAL ARRAY: SUM OF BORDERS
#############################################
GIven a two-dimensional array: 

let matrix = [
    [1,2,3],
    [1,2,3],
    [1,2,3]
]

What is the sum of the border values, here: 1+2+3 + 1 + 1+2+3 + 3?
Thus sum of first row and last row, other row: first and last value.
*/
let matrix1 = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
]

let matrix2 = [
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1],
    [1,1,1]
]

function sum(arr){
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        if(i === 0 || i === arr.length - 1){
            let arrSum = 0;
            for(let j = 0; j < arr[i].length; j++){
                arrSum += arr[i][j];
            }
            sum += arrSum;
        } else{
            sum += arr[i][0]
            sum += arr[i][arr[i].length - 1] //last value in arr           
        }
    }
    return sum;
}

sum(matrix1);   //-> 8;
sum(matrix2);   //-> 12;

