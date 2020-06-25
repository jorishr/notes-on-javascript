# The keyword this
Table of contents
- [The keyword this](#the-keyword-this)
	- [Execution context](#execution-context)
		- [Global context](#global-context)
		- [Implict execution context](#implict-execution-context)
## Execution context
Unless set otherwise, the value of the keyword this will refer to the nearest enclosing parent object. 

The most common situation are:
1. global,
2. object, 
3. explicitly changed: see [call, bind, apply](call_apply_bind.md)
4. keyword new: see [Object creation patterns](../object_creation-patterns.mdobject_creation-patterns.md)

### Global context
When the keyword this is used NOT inside a declared object it's value is the global object, which in the browser is the window object:
```js
console.log(this) 	// -> window
```
This will refer to the global scope. And the global scope in the browser is the window, just as when you create a global binding it is attached to the browser window object.

The same behavior is observed if `this` is used inside a function. 
```js
function whatIsThis(){
	this.newVar = 'Hello';
	return this;
}; 
whatIsThis(); 	//-> window
newVar
//-> Hello
window.newVar 	
// -> hello

//this is bad practice that is prevented in strict mode
```
### Implict execution context
Implicit or object rule: when the keyword this is inside a declared object the value of the keyword this will be the value of the CLOSEST PARENT OBJECT.
```js
var person = {
	firstName: "Joris",
	sayHi: function(){
			return "Hi " + this.firstName
	},
	determineContext: function(){
		return this === person; 
		//return true or false
	}
}
person.sayHi() // -> "Hi Joris"
person.determineContext() // -> true

var instructor = {
    	firstName: "Colt",
    	sayHi: function(){
        	setTimeout(() => {
          		console.log(`Hello ${this.firstName}`)
        }, 1000)
    }
}
instructor.sayHi()
//-> Hello Colt, after one second

var person = {
	firstName: "Joris",
	sayHi: function(){
			return "Hi " + this.firstName
	},
	determineContext: function(){		return this === person; 
	},
	dog: {
		sayHello: function(){
				return "Hello " + this.firstName;
		},
		determineContext: function(){
			return this === person;
		}
}
person.dog.sayHello() 
//-> "Hello undefined"
//because the value of this is the closest parent object, dog, which has no key (or property) firstName.

person.dog.determineContext() 
// -> false 
//because this takes the value of dog, not person. 
```