# Object enhancements
Table of contents
- [Object enhancements](#object-enhancements)
	- [Short hand notations](#short-hand-notations)
	- [Computed property names](#computed-property-names)

Update to the Javascript language brought various enhancements for working with object.

## Short hand notations
- When declaring an object and the object property and object value have the same name you only have to write the name once (if they exist as variables).
```js
let firstName = "#me";
let lastName  = "too";

const person = {
	firstName: firstname,
	lastName: lastName
};
const person = {
	firstName,
    lastName
};
```
- Storing a function as a property  becomes shorter. Omit the function keyword, start with function name
```js
let instructor = {
	firstName: "#me",
    	lastName = "too",
    	sayHello(){return "Hello"}
	    //sayHello: function(){return "Hello"}
};
```
## Computed property names
Assign a property to an object with a name that is the value of an existing binding. This takes two steps: 
- Create an empty object, or have an existing object. 
- Compute the value of the binding with the bracket notation [] when declaring the property and its value.
```js
let myName = "Joris"
let object = {}
object[myName] = "awesome";

let object = {
	[myName]: "awesome"
};

object       // -> {Joris: "awesome"}
object.Joris // -> "awesome"
```