# Objects and type coercion

Table of contents

- [Objects and type coercion](#objects-and-type-coercion)
  - [Object equality](#object-equality)
  - [Object concatenation](#object-concatenation)
  - [Object to boolean](#object-to-boolean)

## Object equality

```javascript
//no coercion is needed because both operands have SAME TYPE.
[1, 2, 3] == [1, 2, 3]; //-> false
const myObj = [1, 2, 3];
myObj == myObj; //-> true
```

However, the equality operator checks for _object identity_. Not for object value equality. The two arrays are two different object instances.

Example with type coercion:

```javascript
//different data types: object and string
["x"] ==
  "x" /* //-> true
There are two options: numeric conversion and string conversion. 
- numeric conversion of the array: [].valueOf() returns the array itself, NaN. [].toString converts to 'x' and "x" == "x" 
*/[1] >
    null; // true
//triggers numeric conversion: first "1" > 0, then 1 > 0
```

## Object concatenation

```javascript
[1] + [2,3]; // -> "12,3"
//numeric conversion of the arrays leads to 1 + NaN and is ignored in favor of the string conversion: '1' + '2,3' = '12,3'

[] + []		 //-> ''
{} + {}		 //-> NaN

[] + null + 1	//-> 'null1'
/*
The numeric conversion of the array is not useful, thus we get string conversion into an empty string. "" + null + 1 -> concatenation: "null" + 1 -> "null1"
*/

0 + {}	//-> '0[object Object]'
//numeric conversion of the {}.valueOf() results in [object Object] or an object of the constructor Object. Then string conversion and string concatenation.

{}+[]+{}+[1]	//-> '0[object Object]1'
/*
All operands are non-primitive values of the object type so + starts with the leftmost triggering numeric conversion but the value of those objects are the objects themselves and not useful. Thus we get string conversion.

The trick here is that first {} is not considered as an object literal, but rather as a block declaration statement, so it's ignored.

Evaluation starts with next +[] expression, which is converted to an empty string via toString() method: +[]. The + operator now is a unary math operator triggering numeric conversion: +[] -> 0.

Then we get a numeric conversion as 0 + {}, see above.
{} + 0 + [object Object] + "1"
	-> 0 + '[object Object]' + [1]
		-> '0[object Object]' + '1'
*/

```

## Object to boolean

Objects to boolean conversion is always true.
