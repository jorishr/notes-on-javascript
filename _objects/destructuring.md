# Object destructuring
The idea is to extract values from properties stored in objects or arrays and store them in bindings. Destructuring allows us to unpack property values from an object into a new distinct or separate bindings through a smooth syntax.

In the example below we create three new variables, that are UNPACKED FROM the instructor OBJECT:  
```javascript
const instructor = {'firstname': 'john', 'lastname': 'Doe', sayHello(name){return `Hello ${name}`} }
// Instead of the long version
// var firstName = instructor.firstName;
// var lastName = instructor.lastName;
// var sayHelloFn = instructor.sayHello;
// we do:
let {firstName, lastName, sayHello} = instructor;
console.log(firstName); // ->"john"
console.log(lastName);  // -> "doe"
console.log(sayHello);  // -> function(){}
/*
IMPORTANT is that the names of the new variables we create are the same as the property names in the object we are working with.

If you want to change the variable name you need to use different syntax:
*/
var {firstName: newName1, lastName: newName2, sayHello: newName3} = instructor;
var {firstName: first, lastName: last, sayHello: helloFn} = instructor;
```
## Destructuring arrays
Variable names are assigned in order of index.

Example: destructure the numbers array into three new bindings with the variable names a, b and c:
```js
var numbers = [1, 2, 3];
var [a, b, c] = numbers;
//  var a = numbers[0]; console.log(a); // 1
//  var b = numbers[1]; console.log(b); // 2
//  var c = numbers[2]; console.log(c); // 3
```