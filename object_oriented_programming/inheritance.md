# Inheritance
Table of contents
- [Inheritance](#inheritance)
	- [Prototype inheritance](#prototype-inheritance)
		- [The wrong way](#the-wrong-way)
		- [Object.create()](#objectcreate)
	- [Class inheritance](#class-inheritance)
		- [Overriding inherited methods](#overriding-inherited-methods)
		- [Overriding the constructor function](#overriding-the-constructor-function)

## Prototype inheritance
Inheritance: passing methods from one CONSTRUCTOR FUNCTION (or class) to another CONSTRUCTOR FUNCTION (or class). A good reason to use inheritance is to have objects that are lighter since the inhertited method can be looked up in a parent object.

Since JS does not have normal classes, what we do is passing the prototype property from one constructor function to another constructor function. 
### The wrong way
Set the destination constructor function prototype property TO BE that one of the origin constructor.
```js
Student.prototype = Person.prototype;
const student = new Student('John', 'Doe');
student.sayHi(); 
//-> 'Hello John Doe'
```
This works, the method inside the Person constructor is available on the Student constructor. However, this is not fully correct because all additional method that are being created on the destination constructor (Student) will now also be available on the original constructor function (Person). This is because we created a new reference to the same value.
### Object.create()
By using the `Object.create()` method we create an object with a different identity, not a reference to an existing value. There is one additional step, however. We have to reset the value of the destination prototype constructor as it will have changed as well when creating the new object.
```js
Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;
```
## Class inheritance
Class inheritance is a way for one class to extend another class,
so we can create new functionality on top of the existing.
```js
class Origin {
	constructor(){}
	instanceMethod(){}
}
class Destination extends Origin {
	constructor(){}
	instanceMethod(){
		//tweak the original method
	}
	childInstanceMethod(){}
};
console.log(Destination.prototype.constructor === Destination); 	
//->true

console.log(Destination.prototype);
/*
childInstanceMethod: ƒ childInstanceMethod()
constructor: class Destination
instanceMethod: ƒ instanceMethod()
__proto__:
	constructor: class Origin
	instanceMethod: ƒ instanceMethod()
	__proto__: Object
```
The constructor function in the Destination class is optional. The methods defined in Origin class are available through the `__proto__` object and the newly added method is a regular instance method.

### Overriding inherited methods
When you redefine a method in the child class, the functionality will change for the instances created with the child class. 

To make this usefull you can use the keyword SUPER in a new function whereby the original functionality is called from the parent class while adding new features.
```js
class Parent {
	constructor(){}
	log(){console.log(this)}
}
class Child extends Parent {
	log(){
		super.log()
		console.log('hello')}	
		//-> log method is overridden
}
const parentInstance = new Parent();
const childInstance  = new Child();
parentInstance.log();
//-> Parent {}
childInstance.log();
//-> Child {}
//-> hello
```
### Overriding the constructor function
If a child class extends a parent class and the child class has no constructor function defined, then the following empty constructor is generated automatically:
```js
constructor(...args) {
    super(...args);
}
```
This basically calls in the constructor function of the parent class with its arguments through the keyword super. Note that you have to call the super keyword with the corresponding parameters in the parent class.
Example:
```js
class Animal{
	constructor(name){
		this.name = name;
	}
	move(){console.log('I can move')}
}

class Dog extends Animal{
	constructor(name, breed){
		super(name);
		this.breed = breed;
	}
	move(){
		super.move();
		console.log('I can run');
	}
	bark(){console.log('Bark!')}
}
const dog1 = new Dog('Brego', 'Border collie');
dog1
//-> Dog {name: "Brego", breed: "Border collie"}
dog1.move()
//-> I can move
//-> I can run

//instanceof
dog1 instanceof Animal //-> true
dog1 instanceof Dog //-> true
```