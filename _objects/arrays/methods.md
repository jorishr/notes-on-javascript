# Basic array methods
Table of contents
- [Basic array methods](#basic-array-methods)
	- [Array.from](#arrayfrom)
	- [Shift and unshift](#shift-and-unshift)
	- [Slice](#slice)
	- [Splice: cut and delete](#splice-cut-and-delete)
	- [Concat](#concat)

## Array.from
Convert other datatypes into arrays with the static `.from()` method on the array constructor function. `Array.from()` works with array-like-objects, strings, sets and maps. 
```js
var divs = document.getElementsByTagName("div"); 
var divsArr = Array.from(divs);

//var divsArr = Array.from(document.getElementsByTagName("div"))
```

## Shift and unshift
The shift method removes the first element in the array (index and value).
The unshift method add an element to the beginning of the array, at `index[0]` and
thus moves the existing values on index up.

The shift method also return the eliminated value.
```js
const colors = ["green", "yellow", "red"]
colors.unshift("#fff"); //-> ["#fff" "green", "yellow", "red"]

var removedColor = colors.shift(); //-> "#fff"

//in ES6 adding a value to an existing array can also be done with the spread operator 
const arr = [1,2,3];
//add at beginning
arr = [0, ...arr];
//add at the end
arr = [...arr, 4];
//at beginning and end
arr = [0, ...arr, 4];
```

## Slice
The `slice()` method is used to copy or extract different portions of an array without changing the original array by creating a new array with different identity.
```js
//copy entire array, no arguments given
var colors = ["#fff" "green", "yellow", "red"];
var colorsCopy = colors.slice();

//partial copy: .slice(<start (incl)>, <end (excl)>) 
var colorsCopy = colors.slice(1,3);
//-> ["green", "yellow"]

//partial copy: .slice(<start (incl)>) start to end
var colorsCopy = colors.slice(1); 
//->  ["green", "yellow", "red";]

//partial copy, starting at the end with negative index
const arr = [1, 2, 3, 4, 5]
const copyArr = arr.slice(-1)
//-> [5]
const copyArr = arr.slice(-2)
//-> [4, 5]
const copyArr = arr.slice(-3)
//-> [3, 4, 5]

//copy values from another array
const arr1 = [1, 2, 3];
const arr2 = [].slice.call(arr1);
//-> [1, 2, 3]
```
## Splice: cut and delete
The `splice()` method is used to modify the original array. A cut is made into the array at index i and only the next n values (incl i) are retained in the array.
```js
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
arr.splice();
//no arguments, no changes 
arr.splice(1, 3); 
//-> arr: ['a', 'e', 'f', 'g']
arr.splice(0, 2); 
//-> arr: ['f', 'g']

//the elements you cut out of the array can be captured in a variable
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const cutOut = arr.splice();
/*
no arguments, no changes 
cutOut : [];
arr: ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
*/
const cutOut = arr.splice(1, 3); 
//-> cutOut : ['b', 'c', 'd']
//-> arr: ['a', 'e', 'f', 'g']

const cutOut = arr.splice(0, 2); 
//-> cutOut : ['a', 'e']
//-> arr: ['f', 'g']
```

## Concat
The push method does not concatenate the arrays, it can only add another  array as a value at the last index position. Also, using the `+` operator does not work either because you get string concatenation. The concat method, however, does create a single array with the values of the concatenated array spread out into the existing array.
```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
arr1.push(arr2);
arr1;		
//-> (4)[1,2,3, Array(3)]

const plusArr = [1,2,3] + [4,5,6];
//-> "1,2,34,5,6"

//proper array concatenation
const partOne = ["a", "b", "c", "d", "e"];
const partTwo = ["f", "g", "h"];

const concatArr = partOne.concat(partTwo);
//-> ["a", "b", "c", "d", "e", "f", "g", "h"]
//the original arrays remain untouched

//concatenation with the spread operator
let x = [...[1,2,3], ...[4,5,6]]	
//-> [1,2,3,4,5,6]
```