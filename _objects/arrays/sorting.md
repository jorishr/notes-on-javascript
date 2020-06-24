# Sorting arrays
Table of contents
- [Sorting arrays](#sorting-arrays)
	- [Reverse method](#reverse-method)
	- [Sort method](#sort-method)
		- [Callback function](#callback-function)
		- [Sorting an array of integers in ascending order](#sorting-an-array-of-integers-in-ascending-order)
		- [Sort an array of date strings](#sort-an-array-of-date-strings)
		- [Sort an array of objects](#sort-an-array-of-objects)

## Reverse method
The reverse method produces a new array, it does not reverse the existing one.
```js
function arrayReverse(arr){
    const result = arr.reverse();
    return result;
}
const reversed = arrayReverse([1,2,3]);
//-> [3, 2, 1]
```
## Sort method
For complete guide on the sort method see [Level-up-your-sort-game](https://css-tricks.com/level-up-your-sort-game/).

While many of the ES5 array methods such as filter, map, and reduce will return a new array and leave the original array untouched, the sort method does its sorting IN PLACE, modifying the original array.

If you need a new array with a seperate identiy use the spread operator to on an new array:
```js
const arr = [`a`, `c`, `b`];
const arrSorted = arr.sort();
// arrSorted : [a, b, c];
// arr : [a, b, c];

//different object identity
const arr = [`a`, `c`, `b`];
const arrSorted = [...arr].sort();
// arrSorted : [`a`, `b`, `c`];
// arr : [`a`, `c`, `b`];
```
### Callback function
The sort method can be used with an optional callback function to specify the type of sorting operation you want to perform: `sort(compare(a, b){});`. If no comparison function is given, each array value will be type coerced into a string and the sorting is done according to the Unicode point value.

Thus simple string comparison without an explitely defined compare function may work as expected but a numbers array without a compare function does not produce an array in ascending order because you end up comparing string values, not number values:
```js
const arr = [1, 4, 3, 22, 12, 44, 6];
arr.sort() 
//-> arr: [1, 12, 22, 3, 4, 44, 6]
```
The comparison function will compare two array values at a time (parameters a and b). The result of the comparison of those function parameters a and b is expected to yield three possible results:
- a negative integer: a will be ordered before b
- a positive integer: b will be ordered before a
- zero: a and b will maintain their current order

### Sorting an array of integers in ascending order
Ascending order means that comparing the value at index i (a) with the value at index i + 1 (b), b should be bigger or equal than a. 

If a pair is found for which a > b, positions should be swapped. Following the logic described above, if a > b the compare function should yield a positive value. The can be obtained as follows:
```js
const nums = [1,3,2]
nums.sort((a, b) => a - b);
//-> [1, 2, 3] 
/*
compare a, b: 1 - 3	= -2; 1 ordered before 3 (no change)
compare a, b: 3 - 2 = 1; 2 ordered before 3 (swap) 
*/
const numbers = [13,8,2,21,5,1,3,1];
const sorted = [...numbers].sort((a,b) => a - b;);
console.log(sorted); 
//-> [1,1,2,3,5,8,13,21]
```
The sort the numbers array in descending order, change the comparison expression to: `sort((a,b) => b - a;);

### Sort an array of date strings
Sort an array of dates.
```js
const dates  = [
	'2018-12-10', 
	'1991-02-10', 
	'2015-10-07', 
	'1990-01-11'
];
//helper function to convert string into UTC datestring
const getDate = str => new Date(str)

dates.sort((a, b) => getDate(a) - getDate(b))
```
### Sort an array of objects
Sort an array of object based on the values of a common object property.

For example, one of the properties of each object in the array is price. Sort the objects based on price.
```js
const products = [{name: "a", price: 20},{name: "b", price: 			10},{name: "c", price: 30}] 

//use helpers function to access the price property in an object and create an array 
const getPrice = obj => obj.price;

const sortedProducts = [...products].sort((a,b) => getPrice(a) - getPrice(b))
```