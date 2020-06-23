# Higher Order Functions
Table of contents
- [Higher Order Functions](#higher-order-functions)
	- [About abstractions](#about-abstractions)
	- [Higher order functions](#higher-order-functions-1)
		- [Repitition abstraction](#repitition-abstraction)
		- [Comparison abstraction](#comparison-abstraction)
		- [For Each abstraction](#for-each-abstraction)
## About abstractions
It is a useful skill, in programming, to notice when you are working at too low a level of abstraction. Every single step and loop that the computer has to perform is obviously important but equally important is to be able to write meaningful code that is easy to understand and debug if necessary. This requires thinking at a more abstract level that easily explains the solution for the problem. For example, it is easy to understand what `sum(range(1, 10))` does and why. The details of the loops and tracking bindings are ommited here but when you have hundreds of lines of code this one is easy to identify and debug.
## Higher order functions
Higher order functions are functions that operate on other functions: 
- either by taking other functions as arguments 
- or by returning other functions

A simple example is `setInterval(cbFn, interval)`: it will execute a function at a set interval in ms.
```js
setInterval(function(){
  document.write("this is an anonymous function")
 }, 2000);
```
One area where higher-order functions shine is data processing. 

### Repitition abstraction
Functions can be passed as arguments because they are regular values (objects). Write a higher order function that repeats 'whatever function' is given to it through a loop.
```js
//base example
function repeatLog(n){
	for(let i = 0; i <=n; i++){
		console.log(i);
	}
}
repeatLog(10); 	//-> 0, 1, ...,10

//abstract the log function
function repeat(n, action){
	for(i = 0; i <= n; i++){
		action(i);
	}
}
repeat(10, console.log)	
//-> 0, 1, ...,10
```
Now the function repeat take two parameters: `n` the number of repetition, and the `action` to be performed `n` times.

### Comparison abstraction
This function returns another function that compares two values and returns a boolean result.
```js
function greaterThan(n){
	return m => m > n;
}
//store the environment in a variable
const greaterThan10 = greaterThan(10);
greaterThan10(5)		
//-> (5) => return 5 > 10 -> false	
```

### For Each abstraction
The `forEach` method is an array method that provides a higher order function that performs a for loop on the given array:
```js
["a", "b", "c"].forEach((val) => console.log(val));
// -> a, b, c 
```
For each element in the array the anonymous arrow function is executed once.