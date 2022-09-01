# Object creation patterns
Table of contents
- [Object creation patterns](#object-creation-patterns)
	- [Mimicking classes](#mimicking-classes)
	- [Factory pattern](#factory-pattern)
	- [Constructor pattern](#constructor-pattern)
		- [Modern class notation](#modern-class-notation)
	- [Class notation](#class-notation)
			- [Object or instance methods](#object-or-instance-methods)
	- [Prototype pattern](#prototype-pattern)
		- [Has own property](#has-own-property)
	- [Static methods](#static-methods)
		- [Example](#example)

## Mimicking classes
One of the techniques in OOP is to use blueprints for constructing objects. These blueprints are called CLASSES. The objects created by classes are called INSTANCES.

JS does not have built-in support for classes as other languages do, thus we use functions and objects to mimic that behavior. Basically, you create a base object and create new object instances from that object.

## Factory pattern
A factory function is created that returns an object. First you declare the object, then add properties and methods.
```js
function personFactory(name, age, email){
	let person = {};
	
	person.name  = name;
	person.age	 = age;
	person.email = email;

	person.print = () => console.log(`${person.name}, ${person.age}, ${person.email}`)

	return person;	
}

var person1 = personFactory('John', 20, 'john@doe.com');
var person2 = personFactory('Jane', 18, 'jane@doe.com');

person1.print();		
//-> John, 20, john@doe.com
person2.print();		
//-> Jane, 18, jane@doe.com
```

## Constructor pattern
A constructor function is used to define the object properties and functions. Here you make use of the keywords `this` and `new`. The constructor function itself does not return anything. 

The keyword new is crucial:
- it creates a new empty object
- sets the value of the this keyword to refer to the newly created object
- adds "return this" to the constructor function so the that it  returns the newly created object
- adds a `__proto__` property to the object. This links the newly created object to the prototype property on the constructor function.

Thus we use the new keyword to create a new execution context for each new object that is created. The new keyword sets the keyword this to refer to the current object instance.
```js
function PersonConstructor(name, age, email){
	
	this.name	= name;
	this.age 	= age;
	this.email  = email;

	this.print = function(){console.log(`${this.name}, ${this.age}, ${this.email}`)}
}

const person1 = new PersonConstructor('John', 20, 'john@doe.com');
const person2 = new PersonConstructor('Jane', 18, 'jane@doe.com');

person1.print();	
//-> John, 20, john@doe.com
person2.print();
//-> Jane, 18, jane@doe.com
```
### Modern class notation
## Class notation
A class is a constructor function with modern notation.
```js
class Dog {
	constructor(name, age){
		this.name 	= name;
		this.age	= age;
	};
	method1(){};
	method2(){};
};
const dog1 = new Dog('Victus', 2);
```
#### Object or instance methods
The constructor method, and the instance methods `method1` and `method2` are available in the `__proto__` object of dog1 and every instance of the Dog class created with the keyword new.

The instance methods are defined each time we create an object or new instance from the class.

## Prototype pattern
The issue with the constructor pattern is that for each new object that is created, all the defined properties and methods get stored into the object.

This can lead to bloated objects that take up too much memory space. Especially the print function in the example is a good candidate to move out of the individual objects and move to the prototype property. When you have thousands of user objects you want them to be as lightweight as possible.

The constructor function does nothing but we can define shared properties for all object instances that will be created by that function using the keyword new.

An advantage is also that you can specify default values.
```js
function Person(name, age, email){
	this.name	= name;
	this.age 	= age;
	this.email  = email;
};
Person.prototype.print	= function(){console.log(`${this.name}, ${this.age}, ${this.email}`)}

const person1 = new Person('no name', 0, 'no email');
person1.print()	//-> no name, 0, no email

person1	
//	-> Person {...} 
//	->__proto__: print: f ();
//	-> constructor: f Person(name,age, email)
```
### Has own property
To test whether a property on an object is available through the prototype or directly set on the object use the method `hasOwnProperty`:
```js
console.log(person1.hasOwnProperty('name'))		
//-> true
console.log(person1.hasOwnProperty('print'))	
//-> false
//the in operator however will look for all properties in the object, including the prototype
console.log('print' in person1)		
//-> true
```
## Static methods
Methods can also be directly set on the class function object itself and not in the prototype. Usually, static methods are used to implement functions that belong to the class, but not to any particular object or instance created through that class.

Static properties and methods are inherited when a class is extended even though they are not found in the prototype. If the method is not found in the child class the search continues in the parent class.

There are two way to set a static property:
- keyword static inside the class
- add a property with the dot notation
```js
class User {
	constructor(name, age){
		this.name = name;
		this.age = age;
	}
	static printName = function(){console.log(this)}
}
//or
User.printName = function(){console.log(this)}
```
Both methods defined by the keyword static or directly as class property are STATIC or class methods. 

None are useful for object instances created by this class because the method are not part of the prototype object.
```js
const user1 = new User('jr', 20);
user1.printName	
user1.printAge	
//-> not a function

//can only be called on the class itself
User.printName();
//-> class User {}
```
### Example
Add a new class method on the Array class that does the same as the existing class method `.isArray`:	
```js	
Array.isMyArray = function(arr){
	return arr.constructor == Array;
};
Array.isMyArray([1, 2])
// -> true;
Array.isMyArray(['hello') 	
// -> false;
```