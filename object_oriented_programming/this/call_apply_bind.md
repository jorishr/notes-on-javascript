# Explicit execution context
Table of contents
- [Explicit execution context](#explicit-execution-context)
	- [Set an explicit execution context](#set-an-explicit-execution-context)
	- [Call and apply](#call-and-apply)
	- [Bind](#bind)
	- [Examples](#examples)
		- [setTimeout](#settimeout)
			- [setTimeout and bind](#settimeout-and-bind)
			- [setTimeout and arrow function](#settimeout-and-arrow-function)
		- [Get property value](#get-property-value)
		- [This inside a function expression (variable)](#this-inside-a-function-expression-variable)
		- [Arguments array](#arguments-array)

## Set an explicit execution context
The methods CALL, APPLY, BIND will explicitly change the value of the this keyword. 

The call and apply methods immediately invoke the function they are called on whereas bind will return a new function definition with the value of the keyword this explicitly set. 

Call and bind can take an infinite number of parameters whereas apply on accepts two: 
- a new value for `this`,
- an array

## Call and apply
The call method invokes a function immediately with a different execution context set. It can be used to 'borrow' a function defined in another object and call that function within the current execution context: `call(this)`

The only difference between call and apply is the parameter structure whereby apply accepts an optional array:
`apply(this, arr)`.
```js
//
var person1 = {
	firstName: "Joris",
	sayHi: function(){
        return "Hi " + this.firstName
    },
    addNumbers: function(a, b, c, d){
        return this.firstName + " calculated " + (a + b + c + d);
    }
}
var person2 = {
	firstName: "Sara",
}
person1.sayHi() 
// -> "Hi Joris"
person1.sayHi.call(person2) 
// -> "Hi Sara"	
person2.sayHi.apply(person2) 
// -> "Hi Sara"

person1.addNumbers(1, 2, 3, 4) 
//-> "Joris calculated 10"
person1.addNumbers.call(person2, 1, 2, 3, 4);
//-> "Sara calculated 10"
person1.addNumbers.apply(person2,[1, 2, 3, 4]);
//-> "Sara calculated 10"
//the array get spread out into arguments of the function 
```
## Bind
Bind does not execute the function right away. It returns a function environment with whereby the keyword this is set to a specific value. This function environment can be stored into a binding and called upon on at a later point in the control flow. This is useful when we do not know all of the parameters yet. You only need to know what the value of the keyword this has to be. The most use cases will be in asynchronous programs where you set the context for the keyword this for a function that will be called at later point in the code.
```js
person1.addNumbers.bind(person2, 1, 2) 
// -> (a, b, c, d){return this.firstName + " calculated " + (a + b + c + d);} with the firstName set to the property of the person2 object, and with only two parameters known. 

const calcPerson2 = person1.addNumbers.bind(person2, 1, 2)
calcPerson2() 
// -> "Sara calculated NaN" because some parameters are missing.
calcPerson2(3, 4) 
// -> "Sara calculated 10"
```

## Examples
### setTimeout
Considere the example below. The `sayHi` property is a function value. That function logs a string after a setTimeout of 2000ms whereby the string is supposed to refer to the `person.firstName` value.
```js
var person = {
	firstName: "Joris",
	sayHi: function(){
		setTimeout(function(){
            console.log("Hi " + this.firstName);
        }, 2000);
	}
}
person.sayHi() // Hi undefined, after 2000ms
```
The regular rule for determining the value of the keyword this seems to apply: the nearest enclosing parent is the person object.

The setTimeout function, however, operates on the global object (browser window) and is called on a later point by the event loop. Therefore the execution context for the this keyword is NOT the person object but the global object where no `firstname` property is defined.

There are two solutions:
- use the bind method
- use an arrow function
- 
#### setTimeout and bind
Use the bind method on the callback function inside setTimeout. At the time of this function declaration the keyword this references to the enclosing person object and we bind the callback function to that object.
```js
var person = {
	firstName: "Joris",
	sayHi: function(){
		setTimeout(function(){
              console.log("Hi " + this.firstName);
           }.bind(this), 2000);
	},
}
person.sayHi() // "Hi Joris" after 2000ms
```
#### setTimeout and arrow function
Arrow functions don’t have their “own” this. If we reference this from within such a function, the value of this is taken from the outer “normal” function.
```js
var person = {
	firstName: "Joris",
	sayHi: function(){
		setTimeout(() => {
              console.log("Hi " + this.firstName);
           }, 2000);
	},
}
person.sayHi() // "Hi Joris" after 2000ms
```

### Get property value
By creating a new variable the execution context can change and the value of this can become undefined.
```js
var hero = {
	name: 'john doe',
	getIdentity: function(){
		return this.name
	}	
}
console.log(hero.getIdentity());
//-> john doe

var identity = hero.getIdentity;
console.log(identity());
//-> undefined

var identity = hero.getIdentity.bind(hero);
console.log(identity());
//-> john doe
```
### This inside a function expression (variable)
The this keyword is unbound inside the function expression. Thereby referring to the global object.
```js
const a = {
	x: 1, 
	logThis() { console.log(this) },
	getX(){
		const inner = function(){
			//console.log(this)	//-> Window {…}
			console.log(this.x)
		}
		inner();
	}
}
a.getX()	
//-> undefined
a.logThis()
//-> {x: 1, logThis: ƒ, getX: ƒ}

//Fix1: call with setting the value of the keyword this to the object
const a = {
	x: 1, 
	getX(){
		//console.log(this)	//->{x: 1, getX: ƒ}
		const inner = function(){
			console.log(this.x)
		}
		inner.call(this);
	}
}
a.getX()	//-> 1

//Fix2: hardcode the this value
const a = {
	x: 1, 
	getX(){
		const that  = this;
		const inner = function(){
			console.log(that.x)
		}
		inner();
	}
}
a.getX()	//-> 1
```
### Arguments array
```js
var length = 10;
function y(){
	console.log(this.length)
}
y()
//-> 10
//this inside a function refers to the global object
//the variable is a global variable

var x = {
	length: 5,
	method = function(y) {
		y();
		arguments[0]();
	}
}

x.method(y, 1, 2, 3)	
//-> 10, 4
```
The method function first calls the y function defined above and the execution context for this function is the global window where `window.length = 10;`.

Inside the method function the method `arguments[0]()` invokes the first parameter passed to the method, which is the function y. The function returns the value for `this.length`. The question is, what is the value of the keyword this?

The function gets called inside the array-like object ARGUMENTS. And the arguments object refers to the arguments called on the method function. Thus, `arguments.length = 4`. 