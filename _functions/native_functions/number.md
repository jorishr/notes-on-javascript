# Number functions in Javascript
Table of contents
- [Number functions in Javascript](#number-functions-in-javascript)
  - [Number constructor](#number-constructor)
  - [isNaN](#isnan)
  - [isFinite](#isfinite)
  - [isInteger](#isinteger)
  - [Number to string, string to number](#number-to-string-string-to-number)
  - [Lowest/highest possible numbers](#lowesthighest-possible-numbers)
  - [Length of a number](#length-of-a-number)

## Number constructor
The number constructor function turns the argument given to it into a number, if possible
```js
Number('5');    //	-> 5;
Number('');	    //	-> 0;
Number('aaa');	//	-> NaN;
Number(true);	//	-> 1;
Number(false);	//	-> 0;
Number(undefined);	//	-> NaN;
Number(null);	//	-> 0;
```

## isNaN
Function that returns true only if the argument given to it not a number, thus from a different data type.
```js
isNaN("x")		//-> true  
isNaN(2); 		//-> false
isNaN(a); 		//-> true
isNaN(NaN); 	//-> true
```

## isFinite
Function that checks if a number is finite and returns a boolean.
```js
isFinite(3); 	// -> true
isFinite(-Infinity);	// -> false 
isFinite(NaN);	// -> false
```

## isInteger
Function that checks if the number is an integer.
```js
isInteger(2); 	    // -> true
isInteger(2.4); 	// -> false
```

## Number to string, string to number
The `toString();` method attempt to convert other datatypes into strings.

The `parseInt()` attempts to transform other datatypes into an integer.
```js
const num = 6;
const numStr = num.toString();
//-> '6'

const str = '6';
const strInt = parseInt(str);
//-> 6
```

## Lowest/highest possible numbers
The lowest possible number in JS is considered to be almost zero, thus math operation will produce a similar result as zero except:
```js
Number.MIN_VALUE;

const i = Number.MIN_VALUE;	
//-> 5e-324 or 0.0000000000001
	
i * i //-> 0		
//-> 0.000000000001 * 0.0000000000001
i + 1 //-> 1
i - 1 //-> -1

i / i //-> 1	
//because is like 0.00001 / 0.00001 and not 0/0 -> Infinite

//Number.MAX_VALUE
const i = Number.MAX_VALUE	
//-> 1.7976931348623157e+308

i * i 	//-> Infinity
i + 1	//-> 1.7976931348623157e+308
i - 1	//-> 1.7976931348623157e+308
i / i	//-> 1
```

## Length of a number
```js
const x = 1023;
const numLength = x.toString().length
```
The max length of an integer in JS is 16. After that we lose precision. 