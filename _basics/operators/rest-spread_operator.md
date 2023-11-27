# Rest and spread operator

Table of contents

- [Rest and spread operator](#rest-and-spread-operator)
  - [Rest operator on function arguments](#rest-operator-on-function-arguments)
    - [Collect arguments](#collect-arguments)
      - [Sum of all arguments](#sum-of-all-arguments)
  - [Spread operator for arrays](#spread-operator-for-arrays)
    - [Spread out array into function arguments](#spread-out-array-into-function-arguments)
      - ['Math.max' example](#mathmax-example)
  - [Spread operator on objects](#spread-operator-on-objects)
    - [Spread and overwrite](#spread-and-overwrite)

## Rest operator on function arguments

The rest operator collects the remaining arguments of a function and returns them into an array.

```js
function printArguments(a, b, ...c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
printArguments(1, 2, 3, 4, 5);
// -> 1, 2, [3, 4, 5]
```

Thus when we call the function with more than two parameters, the remaining ones will be collected into and array.

### Collect arguments

When you have to access the arguments and manipulate them, you cannot use methods such as map or filter because the keyword arguments is not an array, it is an array-like object.

There are three possible solutions:

1. the long version with a for loop
2. convert the arguments into an array and then apply methods to that array
3. use the rest operator to collect the arguments into an array and use methods and arrow functions to write a concise solution.

#### Sum of all arguments

Write a function sumArguments that returns the sum of all the arguments that are passed through the function. The number of arguments is not specified.

```js
//solution 1: loop
function sumArguments() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
sumArguments(1, 2, 3, 4, 5); // -> 15

//Solution 2: create an array that stores the arguments first. Then use reduce to compute the sum.
function sumArguments() {
  let arrArg = [].slice.call(arguments);
  return arrArg.reduce(function (value, next) {
    return value + next;
  });
}
sumArguments(1, 2, 3, 4, 5); // -> 15
//Solution 3: rest operator
const sumArguments = (...arg) => arg.reduce((value, next) => value + next);
sumArguments(1, 2, 3, 4, 5); // -> 15
```

## Spread operator for arrays

When used outside the function parameter declaration `...` is called the spread operator. It spreads out an array as comma separated values into another array.

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [7, 8, 9];

var combine = [...arr1, ...arr2, ...arr3];
// -> [1, 2, 3, 4, 5, 6, 7, 8. 9]

//Before you would have to use the concat method:

var combine = arr1.concat(arr2).concat(arr3);
```

### Spread out array into function arguments

Spread an array into a function that only accepts individual arguments.

```js
var num = [1, 2, 3];
function addNumbers(a, b, c) {
  return a + b + c;
}
addNumbers(num);
// -> "1, 2, 3undefinedundefined" because we are missing two parameter b and c.

addNumbers(...num);
// -> 6, all array values are passed through individually and a sum is returned.

addNumbers.apply(this, num);
// -> 6
```

#### 'Math.max' example

```js
var arr = [5, 3, 7, 4, 3, 1, 2];
Math.max(arr);
// -> NaN, because this method can only deal with numbers not arrays.

//solution with spread operator
Math.max(...arr);
// -> 7

//apply
Math.max.apply(this, arr);
// -> 7
```

## Spread operator on objects

If you want to create a new object from existing properties and values in an object you can use object destructuring. The rest operator collects all remaining key-value pairs an puts them into a new object. Can be used to _copy_ an object (shallow copy).

```js
var instructor = {
  first: "colt",
  last: "r",
  classRoom: "1",
  course: "2",
};

var { ...data } = instructor;
data;
// -> {first: "colt", last: "r", classRoom: "1", course: "2"}
```

### Spread and overwrite

This is similar to how `Object.assign` works. Create a default object and modify only certain properties when needed.

```js
var instructor1 = {
	first: "colt",
	last: "r",
	classRoom: "1"
}
var instructor2 = {
	...instructor,
	first: "Joris"
};
instructor2;
// -> {first: "Joris", last: "r", classRoom: "1"}

var default = {'a': 1, 'b': 2, 'c': 3};
var first = {...default, 'a': "1st"}
var second = {...default, 'b': "2nd"}
```
