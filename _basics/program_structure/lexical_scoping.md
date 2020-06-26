# Lexical scoping in Javascript
Lexical scoping means that the scope of a variable is defined by its location in the source code.

Nested functions have access to variables declared in their OUTER space.

Consider the example with a function A that has another function inside called function B:
```js
var x = 0;
function outer(){
	var y = 1;
	return function inner(){
		var z = 2;
}
```
THE SCOPE CHAIN looks like this: 
```
Global scope 
	-> scope of function outer
		-> scope of function inner 
```
The nested inner should have access to the variables inside the scope of function outer and the global variables. The outer function should have access to the variables in the global scope but NOT to the variables inside inner function.

## Shadowing and overriding
You can override a global variable inside a function:
```js
var global = 'global';
function override(){
	global = 'overridden';
	console.log(global);
}
override();		//-> 'overridden'
```
If you redeclare a global variable inside a function scope it is not overridden but SHADOWED. By redeclaring a variable with the same name as in the outer scope a new variable is created with a different value.
```js
var global = 'global';
function shadow(){
	var global = 'shadow';
	console.log(global);
}
shadow();			
//-> 'shadow'
console.log(global);	
//-> 'global'
```