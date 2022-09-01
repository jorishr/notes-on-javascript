# Hoisting
Table of contents
- [Hoisting](#hoisting)
  - [What is hoisting](#what-is-hoisting)
  - [The lexical environment](#the-lexical-environment)
  - [What is hoisted and what not](#what-is-hoisted-and-what-not)
    - [Variables](#variables)
    - [Functions](#functions)
    - [Classes](#classes)

## What is hoisting
During compile phase, just microseconds before your code is executed, the JS code is scanned for function and variable declarations.

All the functions and variable declarations are added to the memory inside a data structure called the *lexical environment*.

Because those functions and declaration are present inside the memory before they are executed, they could be accessed and used before the actual declaration in the source code.

## The lexical environment
A lexical environment is a place in memory where variables and functions live during the program execution.
```
LexicalEnvironment = {
  Identifier:  <value>,
  Identifier:  <function object>
}
```
Thus function declarations get hoisted
```js
helloWorld();

function helloWorld(){
  console.log('Hello World!');
}

//-> prints 'Hello World!' to the console because the function object is added to the lexical environment during the compilation phase and thus available as a reference in the memory as:

lexicalEnvironment = {
  helloWorld: < func >
}
```

## What is hoisted and what not
JavaScript hoists all *declarations* (functions, var, let, const and class). Variables declared with `var` also get *initialized* with *undefined*. 

### Variables
- the `var` keyword
```js
console.log(a);
var a = 3;
//-> undefined

lexicalEnvironment = {
  a: undefined
}
```
Only assigns a value when the engine reaches the line (during execution) where the actual assignment is done.
```js
var a = 3;
console.log(a);	//-> 3
```

- LET AND CONST

Let and const are hoisted but not initialized. 
```js
console.log(a);	
let a = 3;
//-> ReferenceError: a is not defined 

lexicalEnvironment = {
  a: <uninitialized>
}
```
This is called the 'Temporal Dead Zone', a time span between variable creation and its initialization where they can't be accessed.
```js
let a = 3;
console.log(a);	//-> 3
```
- A tricky example: You can reference let or const in a function before they are declared, as long as the execution of that function happens after the variable declaration:
```js
function foo () {console.log(a);}
let a = 20;
foo();  
//-> This is perfectly valid

function foo () {console.log(a);}
foo();  
let a = 20;
//-> This is invalid
```
### Functions
Function expressions are NOT hoisted. Because the variable that declares the function is hoisted but initialized with undefined. 

If the function is declared with let or const, the hoisting happens without initialization, thus you get a reference Error. 
```js
sum(1,2);
var sum = function(a, b){
	return a + b;
}
//-> 'sum is not a function' because the variable sum gets hoisted as it is initialized but without a value assigned to it. 

lexicalEnvironment = {
  sum: undefined
}
```
Function declarations are hoisted. 
```js
sum(1,2);
function sum(a,b){return a + b;};
//-> 3;

lexicalEnvironment = {
  sum: < func >
}
```

### Classes
Just as let and const declarations, classes in JavaScript are also hoisted, and just as let or const declarations, they remain uninitialized until evaluation. So they are also affected by the Temporal Dead Zone.
```js
let peter = new Person('Peter', 25); 
console.log(peter);
//-> ReferenceError: Person is not defined;
/*
lexicalEnvironment = {
  Person: <uninitialized>
}
*/
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

lexicalEnvironment = {
  Person: <Person object>
}
```
Thus to access the classes, you have to declare them first.