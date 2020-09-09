# Functions in Javascript
Table of contents
- [Functions in Javascript](#functions-in-javascript)
	- [Function declarations](#function-declarations)
		- [Parameters and arguments](#parameters-and-arguments)
			- [Default parameter](#default-parameter)
			- [Keyword arguments](#keyword-arguments)
			- [Calling a function](#calling-a-function)
				- [Core call method](#core-call-method)
				- [A wrapper, apply and bind](#a-wrapper-apply-and-bind)
	- [Function return value](#function-return-value)
		- [Semi-colon problem](#semi-colon-problem)
		- [Return multiple variables](#return-multiple-variables)
	- [The function object](#the-function-object)
	- [Function scope](#function-scope)
	- [Function expressions](#function-expressions)
	- [Tagged functions](#tagged-functions)
	- [Pure functions](#pure-functions)
	- [Immediately invoked functions](#immediately-invoked-functions)

## Function declarations
Functions are an essential building block of JS. They let you wrap lines of code into reusable packages.

First, you DECLARE the function and then later in the code you can CALL or INVOKE the function.
```
function <name> (parameters){
  <do smth>
  ...
}
<name>();	
//called with or without arguments
```
### Parameters and arguments
Function can accept parameters (arguments) as input. Parameters works as a regular bindings towards the function, but the initial value (the argument) is given by the caller of the function, not the code inside the function.

Thus parameters and arguments are used to indicate the same thing but there is a subtle difference. The parameter refers to the binding that is passed to the function and the argument would be the actual value that is used. In the example below the parameter is `num` and the actual argument is 10.
```js
function kwadraat(num) {
  document.write(num * num);
}
kwadraat(10);	//-> 100
```
If you define a function with two arguments or parameters but CALL the functions with more than two, the additional ones will be ignored by JS. If you have missing arguments, the parameter binding remains undefined.

#### Default parameter
If you add `= <value>` to a function parameter then the argument will be replaced by the `<value>` if you  ommit an argument for that parameter in the function call.
```js
function power(base, exponent = 2){
	//calculation
}
power(10)	
//-> 10^2 or 10 x 10 = 100
```
#### Keyword arguments
The keyword `arguments` returns an array of all the arguments passed to the function, independent of the number of parameters defined in the function declaration.
```js
function f(){
	let arg = arguments;
	return arg;
}
f(1,2,3)
//-> Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
#### Calling a function
##### Core call method
The core function invocation primitive is the call method. The syntax is usually shortened to `fn()` but what happens underneath is: `fn.call()`. The very first argument passed to the call method is the `thisValue` as represented by the keyword `this`. All arguments that come after that are part of the regular arguments list. 
```js
//fn.call(this, argument1, argument2, argument3)
function hello(thing) {
  console.log(this + " says hello " + thing);
};

hello.call("Yehuda", "world");
//-> Yehuda says hello world

//if you pass just one argument to the call method, it will always be the thisValue to set the this keyword value.
hello.call("world");
//-> world says hello undefined
```
Knowing the core primitive call function we can now elaborate the more common shorthand function call with just parentheses. The same function from above can be called as: `hello("world")` which compiles to: `hello.call(<thisValue>, "world")`. Whereby the `<thisValue>` depends on the execution context. In the global scope it will default to `window || undefined (in strict mode)` and inside an object it will take on the value of nearest enclosing object.
```js
//the example above with the symplified syntax:
hello('world');
//compiles to...
hello(window, 'world');
//-> [object Winodw] says hello world

//thus: fn(...arg) becomes fn.call(window [ES5-strict: undefined], ...args)
```
The keyword this does not have a persistent value. It will always take on the thisValue that is present upon the actual function call.

##### A wrapper, apply and bind
To explicitely set the value of the keyword this to a fixed value, the `call()`, `.bind()` or `apply()` methods can be used or a closure trick with a wrapper function:
```js
var person = {
  name: "J R",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}
/*
Wrapper function that calls the instance method hello with the call method
that explicitely sets the this value to the person object 
*/
var boundHello = function(thing) { return person.hello.call(person, thing); }

boundHello("world");
/* 
-> boundHello.call(<thisValue>, arg1, arg2, arg3, ...);
compiles to: boundHello.call(window, "world") and returns the result of 
person.hello.call(person, thing)
//-> J R says hello world
*/
```
The apply method is the same as tje call method with the exception of the additional arguments. Those should be passed in as an array-like object.

Using the apply method we can write our own bind function:
```js
function bind(fn, thisValue){
	return function(){
		return fn.apply(thisValue, arguments);
	}
}
/* 
- bind takes in a function and the thisValue
- returns a function
- when that function is called, the original functions is invoked with the set value for the this keyword
- the additional arguments passed to the original function are collected by the arguments keyword
*/

function originalFn(){
	console.log(this);
	console.log(arguments)
}
const setThis = originalFn.bind('Hello');
setThis('arg1', 'arg2');
//-> String {"Hello"}
//-> Arguments(2) ["arg1", "arg2", callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

## Function return value
The result of a function by itself is not useful (undefined). You can print it, but is does not produce an output that you can capture into a variable. To do that we use the RETURN keyword.
```js
function kwadraat(x){
  return x * x;
}
console.log(kwadraat(4))
//-> 16
```
THe return value can now be used for further computation.

The return statement ends the function. Code that comes after it will not be executed. Some functions produce a value, others only produce a result that has a side effect (console.log("hello")). 

Also a return keyword without expression behind it will return undefined.

Functions that don't have a return statement will return undefined, they are considered be VOID functions (leeg). 

### Semi-colon problem
Consider:
```js
const x = function(){
	return 
		{key: value}
}
//-> returns undefined

const x = function(){
	return {
		key: ''
	}
}
//-> returns {key: ''}
```
### Return multiple variables
Use an object to return multiple variables or computational results. You can return the object in a string format as well.
```js
function(){
	return {
		var1: var1, 
		var2: var2, 
		var3: var3
	}
	//return JSON.stringify({var1: var1, var2: var2}) 
}
```
## The function object
Function are objects in JS. The function object can be examined with `console.dir(fn-name)`. This also means you can add properties to your own functions. 

Some native methods are also accessible through the prototype of the function constructor object. For example, tp get the name of the function:
```js
function doSomthing(){}	
doSomething.name	 	
//-> 'doSomething'

(() => {}).name	 	
//-> ''	

(function(){}).name	
//-> ''	

//constructor functions are named as anonymous:

(new Function).name;  
//-> "anonymous"
```
## Function scope
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

Consider the output of the following code: 
```javascript
var y = 1;
if (function f(){}){
	y += typeof f;
}
console.log(y);
//-> 1undefined;
```
The function declarion `function f(){}` is a value, thus in a boolean context it returns true and the if block is executed.

However, the `typeof f` is not 'function' but `undefined` because of a scoping issue. The function f is declared inside the if condition and is not visible outside that limited scope. The result is thus a string concatenation of 1 + undefined.

If we declare the function inside the block, we get ``1function`.
```javascript
var y = 1;
if (1){
	function f(){};
	y += typeof f;
}
console.log(y);
//-> 1function;
```
## Function expressions
A function expression or function binding means you use an expression when defining a variable:
```js
function myFunc(){...}	
//-> fn declaration

const func = function(){}	
//-> fn expression is an anonymous function stored in a variable.
```
A function binding or expression acts as a name for a specific piece of the program. The binding is defined and usually never changed again. If later you change the value of the variable, your function will be lost because a fn expression behaves as a variable. 

You can pass on the value of the function (the right part, that contain the code) onto another binding. Or you can change the value of the binding from a function to another function or a number.

This also means that the function expression is NOT hoisted and thus not avaibable before it is declared. This is an important difference with a fn declaration.

Also, a function expression is expected to resolve to a value, even if that value is undefined. A declaration or definition on the other hand is merely a reference.

## Tagged functions
When a function is invoked with a template string the string is considered to be an argument:
```js
function f(a){
	console.log(a);
}
f`hello`;
//-> ["hello", raw: Array(1)]	
```
When using variable computations inside the template string the regular string characters can be split off from the variable computation values.
```js
const one = 1;
const two = 2;
const thre = 3;
const tagged = function(strArr, ...vals){
	console.log(strArr);
	console.log(vals);	
}
tagged`The sum of ${one} and ${two} is ${one + two}.`;
//	-> [The, sum, of, and, is], [1,2,3];
```
If you call the function the normal way you get a different result because the template string does not get broken down in to pieces.
```js
tagged(`The sum of ${one} and ${two} is ${one + two}.`);
//	-> The sum of 1 and 2 is 3., []
```
## Pure functions
A pure function is a value producing function that has no side-effects and does not rely on side-effects from other code. It doesn't read global bindings whose value may change. 
```js
const square = (x) => x * x;
square(4); //-> 16
```
## Immediately invoked functions
You can store a function inside a variable and then call that function at a later stage.
```js
const myFunc = function(num){...}
//some code
//...
myFunc(4);
```
If you only going to use a function ONCE, then you can call it while writing it:`(function(i){})(j)`. This is an anonymous function with an inner argument i and outer arg j. Also called an IIFE.

If the function returns a value you can store it in a variable: 
`const funcResult = (function(){})()`

If your function does NOT return a value you can also write:
```js
!function(){}()
-function(){}()
~function(){}()
+function(){}()
```
The use case for this is when you want to write your own library and keep methods or variables in a private scope. 

IIFE create a BLOCK SCOPE, thus variables declared inside the block are not visible outside the block.
```js
(function(){let a = b = 100})()
console.log(a)	
//-> reference error, a not defined

//however
console.log(b) = 100 	//-> 100 

//because b is not defined with the let keyword explicitely and therefore it becomes a global variable.
```