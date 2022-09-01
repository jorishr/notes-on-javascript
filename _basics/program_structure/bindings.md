# Bindings
Table of contents
- [Bindings](#bindings)
	- [Bindings](#bindings-1)
	- [Hoisting](#hoisting)
	- [Updating binding values shortcodes](#updating-binding-values-shortcodes)

Reference Guide
[Eloquent JS: Program structure](https://eloquentjavascript.net/02_program_structure.html)

## Bindings
Variables and constants are containers that store data throughout the program. Variables can change the value they grasp onto while constants cannot change once their value is assigned. Since JS is a loosely typed language you can change not only the value of a variable but also the data-type. This is not possible in strictly typed languages.

You define a variable: The full statement consists of `var`, `let` or `const` keywords; a name; the `=` operator; expression of a value;
```javascript
var name1 = value; 
let name2 = value;
let sum = 5 + 5; 
var sum = 10;
```
Once the variable is defined it can be used as an expression elsewhere in statements. And the value of this expression is the value it currently holds (this can be changed). Multiple variables can point to the same value. Bindings are like tentacles that temporarily grasp values.
```js
console.log(sum * sum); //100

let debt = 100;
debt = debt - 35;
console.log(debt); //65

const surname = "Raymaekers";  
let debt = 100, paid = 5, netDebt = 20; 
//define multiple var in one statement with comma separation
```
Binding names: do not start with a number and mind reserved keywords. `$` or `_` is allowed. Uppercase only for constructor functions.

## Hoisting
The `var` keyword for variable definition also means the variable gets hoisted to the top and can be referenced from the beginning of the program, BEFORE its value is declared. Hoisting happens inside each scope. Thus inside the scope of a function, code block or global scope. The practical implication of hoisting is that there is no reference error for a variable that receives its value later on in the program. Until it gets assigned a value, the variable is initialized with a value `undefined`.
Consider the example below:
```js
function f(){
	console.log(1, y)
	var y = 0;
	console.log(2, y)
}
console.log(3, y);
//->	reference error, y is not defined
f()
//-> 1, undefined
//-> 2, 0
```
If you run the function, no reference error appears because inside the function `y` is hoisted to the top of the program and is declared without a value at the start of the program. This is the reason why you should always declare your variables at the top of a function to mimic the hoisting behavior by default.

Another example. What is the value of y in the log?
```js
var y = 2;
function(){
	console.log(y);
}
//-> 2, the global variable is used in the function. 

var y = 2;
function(){
	console.log(y);
	var y = 1
}
//-> undefined
```
Because the `y` variable inside the functions has the same name as the global variable and will override the existing value. Inside the function `y` gets hoisted to the top of the function as `var y;` declared with a value of `undefined`.

## Updating binding values shortcodes
```js
let count = 0;
const x = 1;
//x can be any number

//add 1
count = count + 1;
count += 1; 
count++;

count = count + x;
count += x;

//subtract 1
count = count - 1;
count -= 1; 
count--

count = count - x;
count -= x;

//multiply
count = count * x;
count *= x;

//divide
count = count / x;
count /= x;