# Variable declaration
Table of contents
- [Variable declaration](#variable-declaration)
	- [Var](#var)
		- [Hoisting](#hoisting)
	- [Const](#const)
	- [Let](#let)
	- [Scope examples](#scope-examples)
		- [Block scope](#block-scope)
		- [Shorthand variable declaration](#shorthand-variable-declaration)
## Var
The var keyword creates variables which have a function scope. This means that any variable created with var is available anywhere in the function in which it is defined.

A binding created with var keyword OUTSIDE of a function is a global  variable defined on the global object.

In most programming languages however a variable will have BLOCK SCOPE by default. Thus if a var is declared inside an if statement, the rest of the function would NOT have access to it.

Both LET and CONST are BLOCK SCOPED when defined inside a function. A block defines any set of code that is inside a set of curly braces.  

You also CANNOT redeclare a variable with let or const but you can with var.

### Hoisting
One of the major differences is that the variables defined by var are hoisted which means that they are available to be used even before they get assigned a value.

Just like in most other programming languages, a variable declared with let/const must be defined before it is used the first time.

## Const
Allows you to create bindings that cannot be redeclared. Note that when using `var arr = [1, 2]`, this can be easily REASSIGNED to hold a different value by simply declaring arr again: `arr = "string";`.

This cannot be done when `const arr = [1, 2]` is used. Changing to `arr = "string"` will return a `TypeError: constant variable`. And REDECLARING `const arr = "string"` gets a syntax Error. Thus you cannot redeclare a binding with the same name. 

The value of bindings declared with const can only be changed through the properties that are defined on that value. For example, object and array methods. 
```js
const arr = [1, 2]
arr.push(10) // -> [1, 2, 10];
```
You cannot change the binding if the value is a primitive: string, bolean, number, null or undefined and symbols. You can still use methods on those values but the resulting modification will not be stored because the binding itself is a constant, and thus immutable.

## Let
With let keyword you can still reassign a binding but NOT redeclare it. Thus `let x = 1; to x = 0;` can be done. But `let x = 1; to let x = 0;` produces a SyntaxError.

Note that before ES2015 there were two scopes: global and local. A binding declared in the global scope could be accessed from everywhere. While a var declared inside a function, thus in a local scope, would not be visible outside that function. 

A block scope is created by keywords such as IF, FOR, WHILE, DO, TRY and CATCH. And when we use let inside those blocks, it cannot be accessed outside that scope, just as a var binding would not be accesible outside a function. 

The var binding declaration in a function is always hoisted to the top of the (local) scope: 

The let keyword also hoists the binding but it behaves differently and is put into a temporal deadzone where variables are declared but we cannot access their values. It does produces a reference error when you declare it after the use of it.

Each time you have a block and you don't need the binding outside that block, use LET. Thus in loops, for example.

## Scope examples
### Block scope
```js
function log(){

	{
	let l = 'let';
	var v = 'var';
	}
	
	console.log(v);
	console.log(l);
}
log();
//-> undefined
//-> 'var'
```
A common problem when converting ES6 to ES5 is that the LET keyword gets converted to VAR, but this also changes the scope of the variable.To fix this, transpilers use self-invoked functions.
```js
function log(){
	
	{
	(function(){
		let l = 'let';
		var v = 'var';
	})()
}
	console.log(v);
	console.log(l);
}
log()
//-> Reference error
```
### Shorthand variable declaration
The declaration `var a = b = 3;` is shorthand for:
```js
b = 3;
var a = b;
```
In strict mode the first statement is invalid but in normal code b will become a global variable even if defined inside a function scope.
```js
(function(){
	var a = b = 3;
})();
console.log(a);	
//-> reference error a is not defined
console.log(b);	
//-> 3, global variable
```