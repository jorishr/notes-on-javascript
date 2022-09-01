# Object methods
Table of contents
- [Object methods](#object-methods)
  - [Object.keys and Object.values](#objectkeys-and-objectvalues)
  - [For...in loop over object keys](#forin-loop-over-object-keys)
  - [Clone with Object.assign](#clone-with-objectassign)
  - [Define, freeze and seal](#define-freeze-and-seal)
    - [Define property with options](#define-property-with-options)
    - [Freeze or seal an object](#freeze-or-seal-an-object)
  - [Custom object methods](#custom-object-methods)
  - [Private object methods](#private-object-methods)
  - [The keyword this](#the-keyword-this)
    - [Method chaining](#method-chaining)

## Object.keys and Object.values
The `Object.keys` method shows you all the properties or keys present inside an object and returns an ARRAY of strings. The `Object.values` does the same for the values present in the object.
```js
console.log(Object.keys({a:"hello", b:22}));
//-> ["property name", "property name"]
//-> ["a", "b"]

object.values(obj)	
//->[valueA, valueB, ..., valueX]
```
## For...in loop over object keys
The for...in loop allows us to loop over the keys in an object, including the properties defined on the dunder proto (`_proto_`).
```js
const obj = {};
let keys  = [];
for (let key in obj){keys.push(key)};
//or
for (let i in obj){keys.push(i)};
```
## Clone with Object.assign
Since object names are mere references to the actual object stored in the computers memory, we cannot copy an object by simply assigning another name to an existing object. Thus
`var obj1 = {a:1}; var obj2 = obj1;` IS NOT A COPY, it is a new reference to the same existing object. 

A copy or clone can be made using the `Object.assign()` method which will copy/clone all properties from one object into another. 

An alternative method is the use of the spread operator.
```js
var obj1 = {'a': 1, 'b': 2}
//clone with Object.assign
var obj2 = Object.assign({}, obj1);
//clone with spread operator
var obj2 = {...obj1};

Object.assign(obj1, {'c': 3});
console.log(obj1);
// {'a': 1, 'b': 2, 'c': 3} 
```
The copying of the unnamed object into the existing obj1 with `Object.assign()` happens only ONE LEVEL DEEP. To make a DEEP CLONE you need a recursive function or a hack:
```js
const copyObj = JSON.parse(JSON.stringify(obj))
/*
First the object is converted into a string and then we parse that string into a new object without reference to the original.
*/
```
## Define, freeze and seal
### Define property with options
Defines a new property directly on an object, or modifies an existing property.
```js
//Object.defineProperty(obj, 'key', descriptor);

const descriptor = {
    value: '';			
    //value of the key
    writable: false;		
    //default: false, true: val can change
    configurable: true	
    //default: false, cannot be deleted
}
```
### Freeze or seal an object
A frozen object can no longer be changed: No additional properties can be added, values cannot be changed, no deletion of properties and also the prototype cannot be changed.

Sealing an object means no new properties can be added but existing values can be changed if the property is writable.
```js
const obj = {'x': 1};
Object.freeze(obj)

//seal
Object.seal(obj);
```
## Custom object methods
Why use custom object methods? The reason for using methods on objects is to keep code organized and group things together and to avoid namespace collision.

For example, we want to have a function to delete usernames and comments, a general function "delete" could be created but we might want the function to return slightly different feedback and that's not possible. Thus we create methods, functions inside objects, to solve this:
```
user.delete 
comments.delete

user.createNew 
comments.createNew
```
All the functions that belong to usernames are grouped together, similar thing for the functions related to comments.

## Private object methods
One of the drawbacks of creating true private methods in JavaScript is that they are very memory-inefficient. A new copy of the private method is created for each object instance.
```js
var Employee = function (name, company, salary) {
    this.name = name || ""; 
    //public attribute 
    this.company = company || ""; 
    //public attribute 
    this.salary = salary || 5000; 
    //public attribute 

    //private method
    var increaseSalary = function (){
        this.salary = this.salary + 1000;
    };
}
```
## The keyword this
In the context of an object with data and methods the value of the keyword is refers to the nearest enclosing parent.
```js
var objComments = {
  data: ["well done", "good job", "liked it", "bad"],
  print: function(){
    this.data.forEach(function(item){
      console.log(item);
    })
  }
}
objComments.print()
```
### Method chaining
```js
const obj = {
	'a': 1,
	'b': 2,
	getA: function(){console.log(this.a)},
	getB() {console.log(this.b)}
}
obj.getA().getB()	//-> TypeError
/*
To make the method chaining work you have to return the object through the keyword this for each method:
*/
const obj = {
	'a': 1,
	'b': 2,
	getA(){console.log(this.a); return this;},
	getB(){console.log(this.b); return this;}
}
```