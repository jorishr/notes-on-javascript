# Javascript basics
Table of contents
- [Javascript basics](#javascript-basics)
	- [Primitive data-types](#primitive-data-types)
		- [Boolean values](#boolean-values)
		- [Empty values](#empty-values)
		- [Numbers](#numbers)
			- [Calculations](#calculations)
			- [Special number values](#special-number-values)
			- [Floating numbers problem](#floating-numbers-problem)
		- [String values](#string-values)
			- [Concatenation](#concatenation)
			- [String methods](#string-methods)
			- [Escape characters](#escape-characters)
			- [Template literals](#template-literals)

Reference Guide
[Eloquent JS: Values, Types, and Operators](https://eloquentjavascript.net/01_values.html)

## Primitive data-types
Every program language can differentiate between categories of data or value types. Javascript has numbers, strings, booleans and empty values (null and undefined). ES6 has added the +Symbol.

More complex datatype are functions and objects. 

### Boolean values
A bolean value is easy to understand: true(1) or false(0).

### Empty values
Both `null` and `undefined` are values that note the *absence of a meaningful value*, they carry no information. Some operations have to yield some kind of value and in absence of something meaningful they will produce undefined. 

The meaning of null is: explicitly nothing. However, note that the `typeof null` is an object. The `typeof undefined` is undefined.

A variable can be declared without a value. A meaningful value is assigned to it later on in the program.
```javascript
var newVar;
//the variable was initialized but not given any value.
console.log(newVar)	// -> undefined
newVar = 10;
console.log(newVar)	// -> 10
console.log(nonExistingVar)	
//-> Reference Error: nonExistingVar is not defined
//-> not defined means that the var was not initialized
console.log(typeof nonExistingVar)
//-> undefined
```
*Remember*: 
- The data type of NaN is number
- The data type of an array is object
- The data type of a date is object
- `console.log(typeof typeof 1); //	-> string`
- `typeof(typeof 1)` -> typeof 1 = Number -> typeof(Number) = String

### Numbers
Values of the numbers type: numeric values. If you type the number 11, what happens is that the bit pattern for the number 11 comes into existence inside the computers memory: 
```bash
0	0	0	1	0	1	1
64  32	16	8	4	2	1
```
The weight of each digit increases by factor 2 until 64 bits. Thus the max number that can be created is 2^64. 

There are whole numbers (integers), negative numbers and decimal numbers (fractional or floating): 2, 2.5, -10, 2.998e8. The point `.`, the `-` sign and the `e=10x` represent one bit. 

In practice the maximum number you can write without losing precision is about 16 digits long. The exact maximum number in JS is stored in `Number.MAX_SAFE_INTEGER`. Numbers above the max safe integer get rounded off and get zeros after that.
```javascript
console.log(555555555555555555)	
//-> 555555555555555600
```
#### Calculations
Calculations with fractional numbers are not always precise, they should be treated as approximations, see pi.

Arithmetic with operators: `+-*/` between number values produce new number values. Use parenthesis for determining the order in which the operators have to be applied. If not operator precedence kicks in: `*` or `/` before `+` and `-` and operators with the same precedence level from left to right.
```javascript
(100 + 3) * 10 
//-> 1030

1 + 3 - 2 		
//-> 4 - 2 = 2 

//Modulo % is the remainder of a division 
10 % 3 = 1 

// modulo % 2 = 0 we talk about even numbers. Modulo != 0 odd. 
```
#### Special number values
NaN is a value that represents the outcome of a numeric	operation without a meaningful result: `0 / 0` or `Infinity + -Infinity`. 

#### Floating numbers problem 
Since computer memory is limited, you cannot store numbers with infinite precision. At some point you have to cut or round off. JS can only accurately represent numbers up to 18 digits. After that numbers get rounded off. These rounding errors at last digits can produce inaccurate results like:
```javascript
console.log(0.1 + 0.2)	
//-> 0.30000000000000004
console.log(0.1 + 0.4)	
//-> 0.5 because this can can be represented as floating point number
//-> for some other calculations the rounding errors may also cancel each other out
```
For strategies to work around this see [Floating-point-Guide](https://floating-point-gui.de/).

### String values
Strings are used to represent text or a group of characters. Everything between quotes will be turned into a string value by JS. They are modeled into a series of bits using the UNICODE standard. This standard assigns a number to each character and thus a string is basically a sequence of numbers.

Strings can contain special characters and numbers.

#### Concatenation
The `+` operator can be used to tie different strings together: `"hello " + "world"` becomes `"hello world"`. When one of the values in an operation with the `+` is a string, string concatenation is attempted. 

#### String methods
String values have a number of associated functions, methods, that can be applied to them:
```javascript
"hello world".length 
//counts the number of characters inside the string

"hello world"[0] 
//returns position 0: h
```
See [String methods](../_strings-arrays-objects/string_methods/string_methods.md) for full list.

#### Escape characters
```javascript
\ 	//-> escape next character
\n 	//-> newline in string
\t	//-> next tab in string

"This is the first line.\nAnd this is the second line."
/*
This is the first line.
And this is the second line.
*/
"A newline character is written like \"\\n\"."
//-> A newline character is written like "\n". 
```
#### Template literals
template literals have `backtick quotes` and can span multiple lines. They also can embed other values that are the result of a COMPUTATION inside the string. 
```javascript
`half of 100 is ${100 / 2}` 
//-> half of 100 is 50
```
When you write something inside in a template literal `${}`, its result will be computed, converted to a string and included at that position.