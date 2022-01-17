# Core principles of Object Oriented Programming
Table of contents
- [Core principles of Object Oriented Programming](#core-principles-of-object-oriented-programming)
  - [About OOP](#about-oop)
  - [Encapsulation](#encapsulation)
  - [Abstraction](#abstraction)
  - [Inheritance](#inheritance)
  - [Polymorphism](#polymorphism)
  
## About OOP
Object-oriented programming is a set of techniques that use objects as the central principle of program organization. There are 4 main principles:
- encapsulation, 
- abstraction, 
- inheritance, 
- and polymorphism.

For example, imagine a user object class wherein data and related functionality is grouped together. Thus names, ages, address, etc. plus the functions to get, update and delete those property values.

Inheritance could be used to create child classes based on the user object model. For example, administrators have the same functionality and data attributes that they inherit from the base object, plus some extra features.

## Encapsulation
Different pieces of a program, objects for example, interact through interfaces: interfaces are limited sets of functions and bindings.

The properties and method that belong to the interface are called PUBLIC. 

The properties and methods that contain the various functionalities of the program are called PRIVATE. 

This distinction is not built-in to JS. Use underscore to indicate a private object property name: 
```js
object {
	'publicFunction': interfaceFunction(){}, 
	'_privateFunction': programFunction(){},
	'_privateData': []
} 	
```
Seperating the internal implementation from the external interface is called encapsulation.Public properties and methods can easily be get/set from the outside to any value. The distinction is not enforced by Javascript itself but it is a good guideline for writing code.

The importance of encapsulation:
- prevent users from modifying core functionality
- hiding complexity to end user 
- clearer development: an internal overhaul can be done without changing external functionality

In the example of a coffee machine below `_power` belongs to the internal interface. For `_power` no setter is defined, as it supposed to be defined through the constructor, only once. The property `waterAmount`, however, is something that the end user can control by setting it as required.
```js
class CoffeeMachine {
  constructor(power) {
    this._power = power;
    this.waterAmount = 0;
  }
  
  getPower() {
    return this._power;
  }
  
  setWaterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this.waterAmount = value;
  }

  getWaterAmount() {
    return this.waterAmount;
  }
}

const myCoffeeMachine = new CoffeeMachine(100);
//set power in Watt once, upon creation of the class object instance

console.log(`Power is: ${myCoffeeMachine.power}W`); 
//-> Power is: 100W

myCoffeeMachine.setWaterAmount(100);
myCoffeeMachine.getWaterAmount();	
//-> 100

myCoffeeMachine.setWaterAmount(-10);	//-> Error: Negative water
```
## Abstraction
Applying abstraction means that each object should only expose a high-level mechanism. It's a natural extension of encapsulation as internal implementation details get abstracted. It should only expose operations that are relevant for the end users or external objects.

For example: a smartphone phone has only three main buttons. The processes that run in the background are not revealed to the user.

## Inheritance
Inheritance is a technique that allows for sharing logic between classes and instances of classes. It means that you create a (child) class and inherit all functionality from another (parent) class. This way, we form a hierarchy. The child class re-uses all fields and methods of the parent class (common part) and can implement its own unique functionality on top of that.

For example: a class with a method `walk()`. A child classes that extends the parent class now has access to the walk method:

```js
class Animal {
  constructor(name){
    this.name  = name;
  }
  walk(){
    console.log('The animal starts walking');
  }
}
class Dog extends Animal {
  bark(){
    console.log('The dog barks');
  }  
}
const myDog = new Dog('Shepard');
myDog.walk();
//-> 'The animal starts walking'
myDog.bark();
//-> 'The dog barks'
```
In practice there are limits to inheritance. And picking the correct abstraction level is not always as straightforward as it seems. Take the example of order information in a multi-country app. You cannot assume that the address field is going to be the same everywhere. For example, Belgium uses separate fields for street and number while in most other countries the street and number are in the same field.

## Polymorphism
Polymorphism means many shapes in Greek. In OOP polymorphism takes advantage of inheritance in order to override shared or extended methods with specific ones for each child class. Thus polymorphism allows to perform a single action in different forms, depending on the execution context. 

A good example is the `+` operator that is primarily a math operator that produces a sum of numbers. However, when one of the operands is a string the operator performs string concatenation.

```js
//simple inheritance
class A {
	display(){console.log('A')}
}
class B extends A {}

const b = new B();
b.display //-> 'A'

//inheritance + polymorphism
class A {
	display(){console.log('A')}
}
class B extends A {
	display(){
		console.log('B')
	}
}

const b = new B();
b.display //-> 'B'
```