# Arrow functions
## Example
```js
var add = function(a, b) {return a + b;};
add(1,1) // -> 2

//becomes: 
var add = (a, b) => {return a + b;};
```
## One line arrow functions
Omit the `{}` and the `return` keyword:
```js
var add = (a, b) => a + b;
```
Shortcode one line arrow functions are useful with higher order functions that can become long and tedious to write. For example, double the numbers of an array:
```js
[1, 2, 3].map(function(value){
	return value * 2;
});

//becomes:

[1, 2, 3].map(value => value * 2);
```
## Keyword this
Arrow function are not regular functions and do not have their own keyword `this`. If we reference the keyword this from inside an arrow function, it’s value is taken from the outer “normal” function.

## keyword arguments
Similarly the keyword arguments is not bound to the function object and thus cannot access the arguments given to an arrow function.
```js
var showArg = (a, b) => {
	return arguments
};
showArg();
// -> reference error

let a = () => arguments;
console.log(a('hello'));	
//->arguments is not defined 
```
The alternative is to use the spread operator that collects all arguments and stores them in a variable:
```js
let a = (...n) => n;
console.log(a('hello'));
//-> ['hello'] 
```
## Applied example
Consider the execution context of the cb function in the setTimeout. The cb function gets added to the queue by the setTimeout. The execution context or enclosing scope then becomes the global object, not the instructor object. To have this fixed use the bind() method to bind the keyword this in the setTimeout to the instructor object.
```js
var instructor = {
	firstName: "Joris",
	sayHi: function(){
		setTimeout(function(){
			console.log(`Hello ${this.firstName}`)
		}.bind(this), 1000);
	}
}
instructor.sayHi() 
// -> "Hello undefined" after 1000ms.
```
When using an arrow function for in this example we can avoid the bind() method fix because the arrow function does not have an enclosing scope. The nearest parent object is therefore the instructor object.  
```js
var instructor = {
	firstName: "Joris",
	sayHi: function(){
		setTimeout(() => {
			console.log(`Hello ${this.firstName}`)
		}, 1000);
	}
}
instructor.sayHi() // -> "Hello Joris"
```
If you would go a step further and also write an arrow function for the `sayHi` function, the undefined problem would come back. Because then the execution context becomes the global object for that function. 
```js
var instructor = {
firstName: "Joris",
sayHi: () => {
		setTimeout(() => {
			console.log(`Hello ${this.firstName}`)
		}, 1000);
	}
}
instructor.sayHi() // -> "Hello undefined"
```
Thus arrow functions can clean up code but are no automatic replacement for normal functions. Never use them when creating methods in objects because this will create confusing around the value of the keyword this.