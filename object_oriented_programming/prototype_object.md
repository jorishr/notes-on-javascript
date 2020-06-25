# The prototype object
Table of contents
- [The prototype object](#the-prototype-object)
	- [Constructor function prototype object](#constructor-function-prototype-object)
	- [Object instance 'dunder proto'](#object-instance-dunder-proto)
	- [The prototype chain](#the-prototype-chain)
	- [Example](#example)

## Constructor function prototype object
Each constructor function has a property called `.prototype` which is
an object with a property constructor and value f. The value f refers to the actual constructor function.

```js
//class notation
class Person {
	constructor(name){
		this.name = name;
	}
	getName = function() {
		return this.name;
	}
	setName = function(newName) {
		this.name = newName;
	}
}
Person.prototype
/*
{constructor: ƒ}
	constructor: class Person
	__proto__:
		constructor: ƒ Object()
*/	

//or constructor function notation
function Person(name){
	this.name = name;
	this.getName = function() {
		return this.name;
	}
	this.setName = function(newName) {
		this.name = newName;
	}
}
Person.prototype		
/*
{constructor: ƒ}
	constructor: ƒ Person(name)
	__proto__:
		constructor: ƒ Object()
*/	
```
## Object instance 'dunder proto'
Objects created as instances of a constructor function or class don't have a prototype property. They do have a `__proto__` property that refers to the prototype of the constructor function. This link is created by the `new` keyword. 
```js
function Person(name){
	this.name = name;
}
const person1 = new Person("Joris")
person1 
//-> Person {name: "Joris"}
person1.__proto__ 
//-> constructor: ƒ Person(name)
//	 __proto__: Object

person1.__proto__ === Person.prototype		
//->true
```
The newly created object is given a dunder proto property by the new keyword, which is a reference to the prototype property of the constructor function.

## The prototype chain
Object methods that are not defined on the object itself need to be looked up in the prototype chain. First stop is the dunder proto object which is a reference to the constructor object (class) prototype. 

Example: find the the `push` method on an array:
```js
const arr = [1,2,3]
console.dir(arr) 
/*
-> Array(3)
0: 1
1: 2
3: 3
length: 3
__proto__:
	concat: f concat()
	constructor: f Array()
	...
	push: f push()
	__proto__: Object

Thus the push is not directly found in the arr object. But if you look inside the __proto__ of we can see the properties set on the Array.prototype where push resides.
```
If a method is not found in the `Array.prototype` there is one more step: examine the Object constructor object. The end of the prototype chain is found when `__prototype__` is null. If a method is not found in the prototype chain it evaluates as undefined.
```js
Person.prototype.__proto__ === Object.prototype 
//-> true

Object.prototype.__proto__ 
//-> null, end of the prototype chain
```
The `Object.prototype` provides a few methods that show up in all objects, such as `toString` or `hasOwnProperty`.

Functions draw first from the `Function.prototype` and Arrays draw first from the `Array.prototype`:
```js
console.dir(Math.max) 
/* 
f max()
arguments
name
length
__proto__: f ()
	...
	__proto__: Object()
*/
Math.max.__proto__ === Function.prototype 
//-> true
```

## Example
Create a constructor function for verhicles with properties: make, model, year and isRunning set to false. Also, create a method that works on all object instances and that changes the value of of the isRunning property.
```js
function CreateVehicle(make, model, year){
	this.make = make;
	this.model = model;
	this.year = year;
	this.isRunning = false;
}
car1 = new CreateVehicle("Mercedes", "E-class", 2012)
CreateVehicle.prototype.turnOn = () => this.isRunning = true;
CreateVehicle.prototype.turnOff = () => this.isRunning = false;

car1.turnOn()
car1.turnOff()
```