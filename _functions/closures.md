# Closures
Table of contents
- [Closures](#closures)
	- [About](#about)
	- [Closures in a loop](#closures-in-a-loop)
	- [Private variables](#private-variables)
## About
Anytime a function uses a variable from outside it's own local function scope it uses a closure to store that value. A closure thus can give you access to an outer function's scope from an inner function.

In other words, closures are used to preserve data inside a function and access values from its surrounding environment. 

The closure has access to variables in three scopes: (1) variables in its own local scope, (2) variables in the enclosing function's scope, and (3) global variables.

- Example 1:
```js
(function(){
	var x = 1;
	const sum = function(){
		var y = 1;
		return x + y;
}
console.dir(sum);
})()
//-> f sum() -> Scopes -> Closure {x: 1}
```
Thus the variable x with value 1 from the outer function scope is stored inside the inner function sum as a closure.

- Example 2:
```js
function wrapValue(n){
	let local = n;
	return () => local;
}
const	wrap1 = wrapValue(1);
const	wrap2 = wrapValue(2);

console.dir(wrap1)
//-> fn () => local; Scopes -> Closure {local: 1};

console.dir(wrap2)
//-> fn () => local; Scopes -> Closure {local: 2};
```	
Each local binding exists within an enclosing scope.

- Example 3:
```js
//Write a function that multiplies a given number by a given factor

function multiplier(factor){
	return number => number * factor
}
const factorThree = multiplier(3);
console.dir(factorThree);	
//-> Scopes: Closure {factor: 3}

factorThree(10)
//-> 30

const factorFive = multiplier(5);
console.dir(factorFive);
//-> Scopes: Closure {factor: 5}
factorFive(10)
//-> 50
```
- example 4
```js
const f = () => {
	let i = 0;
	let j = 1;
	return () => {
		console.log(i);
		console.log(j);
	}
}
f();
//-> () => {...}
f()()
//-> 0
//-> 1
console.dir(f())	
//-> closure {i: 0, j: 1};
```
## Closures in a loop
When using a loop with the keyword LET, the i counter variable has a BLOCK SCOPE that is available inside the inner functions you may write. 

This means that for each iteration of the loop, the i variable is created as a new instance. Thus on the first iteration of the loop: `i = 0;` AND once this first iteration is over, the i variable is erased. On each new iteration of the loop, i is created again with a new updated value.

On the other hand if you use the keyword VAR, the i counter variable has a FUNCTION SCOPE, which means that the SAME variable is used on each iteration, but with an updated value. Thus i = 0 on the first iteration and the same i = 1 on the second iteration, etc.

The subtle difference has no effect with a normal inner function:
```js
for(let i = 0; i < 3; i++){	
	console.log(i)
}	
//-> 0, 1, 2

for(var i = 0; i < 3; i++){
	console.log(i)
} 	
//-> 0, 1, 2
```
The above does have an interesting consequence for closures. If the loop has an inner function that references the counter variable i and the var keyword is used we can get a strange result in combination with a setTimeout.
```js
//normal behavior with let and block scope
for(let i = 0; i < 3; i++){
	setTimeout(() => console.log(i), 1000);
}
//-> i = 0: setTimeout(log, 1s) with i = 0 in a block scope
//-> i = 1: setTimeout(log, 1s) with i = 1 in a block scope
//-> i = 2: setTimeout(log, 1s) with i = 2 in a block scope
//-> after 1 second: 0, 1, 2 

//irregular behavior with var and function scope
for(var i = 0; i < 3; i++){
	setTimeout(() => console.log(i), 1000);
}
//-> i = 0: setTimeout(log, 1s)
//-> i = 1: setTimeout(log, 1s)
//-> i = 2: setTimeout(log, 1s)
//-> i = 3: end of loop
//-> after 1 second: 3, 3, 3 
```
With var defined as a global variable, i is 3 after one second. Since `console.log` function is called after one second, three times with a variable i that has a closure value based on the variable i with a function scope. 

And after three iterations of the loop, the value of `var i = 3` because that is when the loop condition is met.

To 'fix' this, you would have to invoke the setTimeout function immediately by wrapping it in another function. This way the value of the closure in the inner function gets stored correclty because a block scope is created.
```js
for(var i = 0; i < 3; i++){
	((i) => {setTimeout(() => console.log(i), 1000);})(i)
}
//-> after 1 second: 0, 1, 2 
```
## Private variables
When closures are used? Other programming languages have support for private variables or bindings that can not be modified externally. In JS private bindings don't exist and therefore closure can be used.
- Example 1
```js
function secretVar(){
	var private = 'secret';
	return function(){
		return private
	}
}
console.log(private);	
//-> reference error, is not defined
secretVar();		
//-> f() {return private}

secretVar()();	
//-> 'secret'

//or
const getPrivateVar = secretVar();
console.log(getPrivateVar());
//-> secret
```
- Example 2: private counter
```js
function counter(){
	let _counter = 0;
	//var _counter = 0;
	return {
		add: function(increment){_counter += increment},
		get: function(){return _counter}
	};
}
let count = counter();
count; 	
//-> {add: ƒ, get: ƒ}

count.add(5);
count.get();	//-> 5
```
The inner functions defined in the object have access to the outer function variable _counter as a closure.

- Example 3
```js
function classRoom(){
	var instructors = ["Jack", "Tina"];
	return {
		getInstructor: function(){return instructors;},
		addInstructor: function(newPerson){
			instructors.push(newPerson);
			return instructors;
		}
	}
}
const classOne = classRoom();
const classTwo = classRoom();

classOne.getInstructor() // ["Jack", "Tina"]
classTwo.getInstructor() // ["Jack", "Tina"]

classOne.addInstructor("John")

classOne.getInstructor() // ["Jack", "Tina", "John"]
classTwo.getInstructor() // ["Jack", "Tina"]
```
Because the instructors var is private it cannot be modified by external code. Plus by using closure we can isolate logic and application.

However: the `.push` and `.pop` methods do modify the instructors variable. To make the var completely immune from modification we can use a different implementation: make the inner functions return A COPY of the variable/array/object by using the `slice()` method, not the original:
```js
function classRoom(){
	var instructors = ["Jack", "Tina"];
	return {
		getInstructor: function(){
			return instructors.slice();
		},
		addInstructor: function(newPerson){
			instructors.push(newPerson);
			return instructors.slice();
		}
	}
}
classOne.getInstructor().pop()  //-> "Tina"
classOne.getInstructor()	    //->["Jack", "Tina"] --no change