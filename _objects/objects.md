# Objects in Javascript
Table of contents
- [Objects in Javascript](#objects-in-javascript)
	- [About objects](#about-objects)
		- [Arrays](#arrays)
		- [Object is array?](#object-is-array)
		- [Is value an object?](#is-value-an-object)
		- [Array limitations](#array-limitations)
	- [Getting and modifying object properties](#getting-and-modifying-object-properties)
	- [Deleting object properties](#deleting-object-properties)
		- [Delete value at array index](#delete-value-at-array-index)

## About objects
Objects are arbitrary collections or groups of properties. Those properties can be nouns, adjectives and verbs that describe the properties and actions you can undertake with the object.
```js
const car = {
	color: 'red', 
	getIn: function(){}, 
	parked: true
}

const object1 = {
	a: false,
	b: 22,
	c: ["yellow", "red"]
};

console.log(object1.a); //->false
```
Thus `object1` is a collection of the properties `a`, `b` and `c` that hold the values `false` (boolean), `22` (number), `["yellow", "red"]`(an array of strings).

### Arrays
Arrays are objects with properties that have zero-based number names.
```js
const arr = ["hello", 22, false]; 

typeof arr	//-> object

//is similar to:
const arr = {
	0: "hello",
	1: 22,
	2: false	
}
```
Because of the index based naming an array is especially useful for storing a (ordered) sequence of things. Since you can store objects inside objects it is possible to create an array of objects or two-dimensional arrays (matrices).
```js
const arrOfObjects = [
	{
		property1: value, 
		property2: value, 
		property3: value
	},
	{
		property4: value, 
		property5: value
	},
	{
		property6: value, 
		property7: value
	}	
]

const twoDimArr = [
	[1,2,3,4],	//row1
	[5,6,7,8],	//row2
	[9,10,11]	//row3
]
```
Practical example: A journal whereby you have entries every day. Inside every day you have activities and a result (boolean). Thus you can have an array of days that hold an object with the properties: activities and result:
```js
let journal = [
	{activity: ["work", "swim"], result: true}, //day 1, index 0
	{activity: ["run", "write"], result: false}, //day 2, index 1
	{activity: ["walk", "work"], result: true}	//day 3, index 2 
]
```
### Object is array?
Check the prototype in the console or use the Object constructor function and call it on the object at hand with the `toString()` method:
```js
var myObject = [1,2,3];

Object.prototype.toString.call(myObject);	
//-> "[object Array]"

Array.isArray(myObject);	//-> true
```

### Is value an object?
```js
const bar = {};
bar.constructor === Object	//-> true
typeof bar === "object"		//-> true

//null is also an object, to avoid this possibility use:
(typeof bar === "object" && bar !== null)
```
### Array limitations
For example, using an array for a variable `person = ["name", "age", "city"]` is not adequate because the list does not have a meaningful order. To access "city", you need to know its index position 2, and if you make changes to the array, the position might change.

That's where OBJECTS come in. Objects don't have a built-in order, so there is no index position for each property (or key-value pair), it doesn't matter in which order you declared them or which position they occupy in the collection. In objects we talk about FLOATING key-value pairs. In computer science the concept is also known as a DICTIONARY: {key("word")=value("definition")}.

## Getting and modifying object properties
Retrieving data can be done via the dot or bracket notation. The [] notation is called the computed member access. Everything between the brackets is treated a js statement and will be invoked or computed.
```js	
//console.log(object.property); 
console.log(person.name) 		//-> "Joris"

//console.log(object["city"]);
console.log(person["city"]); 	//-> "Sant Cugat"
```
Its is easier to use the dot notation *but* that does not work with properties that start with a NUMBER or that contain spaces.

Update key-values pairs can be done in a similar way:
```js
//object.a = newValue; 	//->changes the existing a property value
//getting a property that does not exist will return undefined 
person.age = 35;
person.age = += 2; 

person["age"] += 4;
```
## Deleting object properties
Delete is a unary operator that only works on object properties, not variables. You also cannot delete properties inherited from prototype object:
```js
delete object1.d; 
//deletes the property d
console.log(object1.d); //-> undefined 

//delete object property
var x = { foo : 1};
var output = (function(){
	delete x.foo;
    	return x.foo;
})();
console.log(output);	//-> undefined

//delete global variable (attempt fails)
var x = 1;
var output = (function(){
	delete x;
    	return x;
})();
console.log(output);	//-> 1

//delete a argument binding (attempt fails)
var output = (function(x){
	delete x;
    	return x;
})(0);
console.log(output); //-> 0

//delete prototype property (attempt failed)
var Employee = {
	//constructor object
	company: 'xyz'
}
//create instance of constructor
var emp1 = Object.create(Employee);
delete emp1.company
console.log(emp1.company);	//-> 'xyz'
console.log(emp1.hasOwnProperty('company')) -> false
/*
The new instance of the constructor object does not have a property 'company'. It is an inherited property on the constructor object.

You have either delete it from the dunder proto in 'emp1' or delete it from the Employee constructor object:
*/
delete emp1.__proto__.company
delete Employee.company
```
### Delete value at array index
Simply using the delete operator will erase the value but not the index position. Thus the length of the array is not affected by the delete operator. Actually removing the index means all other index-value pairs will have to be re-arranged, which is a much more expensive operation.
```js
var arr = ['a', 'b', 'c', 'd'];
arr.length; 	//-> 4
delete arr[2];	//-> true
console.log(arr);	
//-> ['a', 'b', empty]; 0: 'a', 1:'b', 3: 'd'
arr.length; 	//-> 4