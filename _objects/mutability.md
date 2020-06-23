# Object mutability
Table of contents
- [Object mutability](#object-mutability)
	- [Immutable primitive values](#immutable-primitive-values)
	- [Object mutability](#object-mutability-1)

## Immutable primitive values
Strings, boleans and numbers are immutable, there values cannot be changed. The code for number 22 is 22 and the code for "hello" is  "hello". You can operate on strings, booleans and numbers to create new values, but that does not affect the original. Thus two number 10 and 10 are precisely the same number, whether or not they refer to the same physical bits.

For example, if you try to add properties to a binding that holds a string, this is not stored:
```js
let name = "first name";
name.surname = "last name";
console.log(name.surname) //undefined
```
Strings, numbers and boleans only have built-in properties that hold function values, i.e methods like `.length`, `.slice`, etc.

## Object mutability
Objects (and thus arrays) however, can have their properties changed so that a single object can have different properties at different times.
```js
let object1 = {'a': 5};
let object2 = object1; 
//new reference to the same object or object with same identity

//new object, different identity
let object3 = {'a': 5};
/*
Object3 contains the same property with the same value as object1 (and object2) BUT it lives a seperate life because the binding refers to a different object. 

Modifying through reference object1 or object2 changes the same physical object in memory.
*/
object2.a = 10; 
object1; // -> -> {a: 10}
object2; // -> -> {a: 10}

object1.b = "hello";
object2.b; // -> "hello"

object1 == object2 //true
object1 == object3 
//false, because == checks for object identity

//if you use the const binding for an object you cannot change the entire binding to that object. You can only update the properties of the object:
const objectScore = {home: 0, visitors: 0};
objectScore.home = 1; //allowed
objectScore = {home: 1, visitors: 1} //incorrect, because an attempt to re-assign the binding to a different object.