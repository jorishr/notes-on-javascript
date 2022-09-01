# Arrays
Table of contents
- [Arrays](#arrays)
  - [About arrays](#about-arrays)
  - [Array properties](#array-properties)
  - [Array methods](#array-methods)
  - [Nested arrays](#nested-arrays)
  - [For loop](#for-loop)

## About arrays
Primitive or simple data types like numbers, booleans or strings are the atomic elements that more complex data structures are built from. Variables let you store just one piece of info, a number, a name, etc. But this does not work if you want to store multiple piece of info together.

Objects and arrays are groups or collections of primitive values. Arrays are used for LISTS of related data. For example, a list of all the comments on a blog post. Arrays can hold old a mixture of any type of data:

Create a new array:
```js
//declaration
var colors = [];
var random = ["hello", 20, true, null, undefined];

//array constructor function new Array(); 
var colors = new Array(5)
//-> [5 empty items]
var colors = new Array(5).fill('');
//-> ['', '', '', '', '']
```
Arrays are OBJECTS with registers or index based keys. A regular object would be called literal as the keys literally indicate what type of data is stored `({username: 'John Doe', age: 22})`. An array can be seen as `{0: 'value1', 1: true, 2: 33, 3:'value4'}`. We don't talk about key-value pairs but elements at a certain index position in the array. The advantage of index based keys is that the array is easily iterable. 

## Array properties
Arrays have a `.length` property, indicating the number of pieces of data stored inside. Property names are strings and the . notation only works with valid binding names. Thus property `John Doe` would have to be written between brackets as a string`["John Doe"]`;
```js
var colors = ["green", "yellow", "red"];
colors["length"]  //-> 3
colors.length 	  //-> 3

//shorten array hack 
const arr = [1, 2, 3, 4, 5]
arr.length = 3
console.log(arr)  //-> [1, 2, 3]


var colors = ["green", "yellow", "red"];
        index:   0        1         2
//numbers are not allowed in the dot notation thus use [] to access value at index
colors[0];  //-> "green"
colors[1];  //-> "yellow"
colors[2];  //-> "red"

//negative index values can be added to an array but they are considered to be ARBITRARY properties of the array object that don't affect the array length:
let arr = [1,2,3]; 
arr[-1] = -1;
//->	arr = [1,2,3, -1: -1]
arr.new = 5;	
//-> arr = [1,2,3, new: 5];
arr.length //-> 3
```

## Array methods
Array methods are array properties that hold function values. They can be used to manipulate arrays. Basic examples are: `.push` and `.pop` to add or remove values add the end of an array. 
```js
let colors = ["green", "yellow"];
colors.push("red");
console.log(colors); // "green", "yellow", "red"
colors.pop(); //pops "red"
```
## Nested arrays
An array can consist of multiple nested arrays, it is important to understand how the indexing works. These two-dimensional arrays are used to represent matrices with rows and columns.
```js
var groupFriends [
  ["An", "Ria", "Emily"], 		  //index position 0
  ["Jack", "Donovan", "Mike"], 	//index position 1
  ["Erik", "Rollo", "Richard"], //index position 2
]    0        1         2 		  //columns

console.log(groupFriends[1][2]); //-> Mike
```
First you call the index position of the array you want, then the usual call on the index position inside that array.

## For loop
If `n = arr.length` we need n iterations to visit each element once. The counter variable (i) needs to start at 0, index 0, and stop at `arr.length`. This gives us exactly n iteration. Because of the zero-based index the last value in an array has an index of n - 1 (`arr.length - 1).
```js
const arr = ['a', 'b', 'c'];

for(let i = 0; i < arr.length; i++){
//for(let i = 0; i <= arr.length - 1; i++){
  console.log(arr[i])
}
//-> 'a'
//-> 'b'
//-> 'c'

//a backwards loop

for(let i = arr.length - 1; i >= 0; i--){
  console.log(arr[i])
}
//-> 'c'
//-> 'b'
//-> 'a'
```