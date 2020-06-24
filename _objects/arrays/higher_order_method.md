# Higher order array methods
Table of contents
- [Higher order array methods](#higher-order-array-methods)
	- [Overview](#overview)
	- [Find](#find)
	- [For Each](#for-each)
	- [Map](#map)
	- [Filter](#filter)
	- [Some](#some)
	- [Every](#every)
	- [Reduce](#reduce)
		- [Callback parameters](#callback-parameters)
		- [Example](#example)

## Overview
Higher order functions trully shine once you have to compose operations that are like a pipeline of computation. For example, start with all scripts, filter out the living (or dead) ones, take the years from those, average them, and round the result.  

In general the higher order functions are going to be better readable for human eyes but may result in more use of computational power. If speed with huge datasets is an issue, you have to evaluate the approach: higher order functions with better readable code or faster code that may be more difficult to debug.

- Use `.forEach` to iterate over arrays
- Use `find` to find a value in the array based on a condition defined in the callback function
- Use `.map` to transform arrays into new ones of the same length. 
- Use `.filter` to filter arrays into arrays of different length (based on a condition).
- Use .reduce to accumulate values, and transform arrays into different datatypes. 
- Use `.some` and `.every` to return booleans for conditions defined in the callback function

These higher order functions will execute a callback function for each item in the array. The callback function has access to the value of the array it is running on, the index position of that value, and the array itself. Parameters, in that order: `[1, 2, 3].forEach(function(value, index, array){})`. These parameters are optional. The reduce `.reduce` method has its own set of parameters.

## Find
The `find(cb(){})` method is useful for searching for a value in an array without having to write a for loop. The method accepts a callback function with parameters (value, index, array). Inside the callback you define a condition. 

The find method returns the first value (not the index) for which that condition turns true. If no value is found that matches the condition, undefined is returned.
```js
var instructor = 
	[{name: "J"}, {name: "R"}, {name: "Q"}, {name: "J"}];

instructor.find(function(val){
	return val.name === "J";
});
// -> {name: "J"}
```
## For Each
The `forEach` method is a higher order function that makes use of an abstraction, a temporary name as placeholder, inside a function.

The `.forEach(cb(){})` method is built into Javascript since 2009 and is faster than using the for loop. It is part of the array proto-type, the collection of methods that can be applied to all arrays (such as shift, unshift, pop, push,..).

```js
var colors = ["#fff", "green", "yellow", "red"];

colors.forEach(function(){
  document.write("hello"); 
})

colors.forEach(function(clr){
  document.write("<br />" + colors + "&nbsp;" + clr);
})
//-> #fff,green,yellow,red #fff 
//-> #fff,green,yellow,red green
//-> #fff,green,yellow,red yellow
//-> #fff,green,yellow,red red 
```
Since there is no return statement, forEach will always return undefined. Thus if you try to store the result of a .forEach method into a binding, this will be UNDEFINED.

## Map
The map method transform an array into a new one with the same length but with different values. This is similar to the forEach method but then you need the additional step of a `.push` method to create the new array.

Thus `.map(cb(){})` iterates through the original array, calls a callback function on each value of that array and adds the result of that function to a new array of the same length. And finally returns that new array. 
```js
const arr = [1,2,3]
const result = arr.map((val, i, arr) => {
	console.log(i)
	console.log(arr)
	return val * 2;
});
//-> [2, 4, 6]
```
## Filter
The filter method builds up a new array with only those elements that pass a test. The test or condition is defined by the callback function that has to include an expression that returns a boolean. Only the elements for which the callback returns the boolean value true are included:
```js
//arr.filter(() => {return boolean}) 
var arr = [1, 2, 3]
arr.filter(function(value, index, array){
	return value > 1;
}) 
// -> [2, 3] 
```
## Some
The `.some()` method returns a boolean value. It returns true when the callback function returns true for at least one of the elements in the array. You can think of the some method as the `||` operator for elements of an array.
```js
[1, 2, 3].some(function(value, index, array){
	return value < 2;
})	
// -> true

[1, 2, 3].some(function(value, index, array){
	return value > 3;
})	
// -> false
```
## Every
Similar to the some method but for the every method to return true, the callback function needs to return true for every single value in the array.

You can think of the every method as the `&&` operator for elements of an array.
```js
//Are all the array values negative numbers?
var arr = [-1, 2, -3]
function allNegative(arr){
	return arr.every(function(value){
		return value < 0;
	});
}
allNegative(arr);
// -> false
```

## Reduce
Basic idea behind reduce method is to turn an array into a another datastructure: a number, an object, an array of arrays, etc.

The reduce function has an optional starting value parameter in addition to the callback function: 
`arr.reduce(cb(acc, next, i, arr), accStartVal);`

If no parameter is passed on to reduce method the starting value argument becomes the first index value (index[0]). 

### Callback parameters
- Accumulator: the first parameter is called the accumulator and starts as the optional starting value argument in the outer reduce function.

The return value from the callback  functio becomes the new value of the accumulator for each new iteration of the loop over the original array. Thus the end result of the reduce function will be the end value of the accumulator once the looping is done.

- The second parameter is the `nextValue`. If an accumulator starting value is specified as an argument, the nextValue is equal to  index[0]. If no optional argument is given, the nextValue is the second position in the array at index[1].

### Example
```js
//return sum of an array of integers
const arr = [1,2,3];
const arrSum = arr.reduce((acc, next) => {
	return acc += next;
})
//-> 6
/*
No starting value is sepecified thus acc = index[0] and next = index[1]
For each iteration you add the next value to acc
Loop:
0	acc = 1 + 2
1	acc = 3 + 3
2	acc = 6 + undefined
3	end loop return acc = 6
*/
```