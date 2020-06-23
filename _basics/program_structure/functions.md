# Functions and function scope
Table of contents
- [Functions and function scope](#functions-and-function-scope)
	- [Functions](#functions)
		- [Example](#example)
		- [Return values and side effects](#return-values-and-side-effects)
		- [Scope](#scope)
## Functions
Functions are pieces of programs wrapped in a value. A lot of the values that are part of the Javascript language are functions. These values can be applied to run the program they have wrapped inside. e.g `prompt("hello")`. CALL, INVOKE or APPLY a function with parentheses, this produces a function value. You use the name of the binding that hold the function.

The values between the parentheses are called arguments. These arguments are given to the program inside the function. The number of arguments and the type of arguments may differ. In `prompt("Enter surname");` we give a string to the program inside the function called `prompt`.

### Example
The console binding holds a number of function as properties. The `log` property is applied to this binding and retrieves a specific part of the console binding.  
`console.log('hello')`.

### Return values and side effects
Sometimes we use functions because of the side-effects they produce. Like showing a dialog box or changing on-screen text. Other times we use functions because of the values they produce. When a function produces a value, it RETURNS a value. 

The return value by a function is a JS expression that can be used in within larger expressions or statements. Here the return value of the `Math.max()` functions is used an argument inside the `console.log()` function.
```js
console.log(Math.max(2,3,5,7,10) + 22); //10+22=32
console.log(Math.min(2,3,5,7,10) + 22); //24
```
### Scope
Javascript has Lexical scoping: Thus a global variable can be accessed inside functions and a variable defined inside a function will be available in all subsequent blocks inside that function.

The `var` keyword has function scope when defined inside a function: 
```js
function f(){
	var y = 0;
	function g(){
		console.log(y);
	}
	g();
}
console.log(y);	//-> reference error
f()	//-> 0
```
In most other languages, however, variables have BLOCK scope and are only accessible inside the block `{}` they are declared. 