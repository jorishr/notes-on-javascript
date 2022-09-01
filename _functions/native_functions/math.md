# The Math object
Table of contents
- [The Math object](#the-math-object)
  - [Ceil, floor, round, random](#ceil-floor-round-random)
    - [Generating pseudo random numbers](#generating-pseudo-random-numbers)
  - [Max, min, abs](#max-min-abs)
  - [PI](#pi)
  - [Square-root](#square-root)
 
## Ceil, floor, round, random
The Math object is used as a container to group a bunch of related functionality. It provides a namespace so that all these functions and values do not have to be global bindings. Since JavaScript's built-in max function is tucked safely inside the Math object as property `Math.max`, we don't have to worry about overwriting it by creating a new global binding `let max = [];`
```js
Math.ceil()     //rounds UP to the nearest whole number
Math.floor() 	//rounds DOWN to the nearest whole number.
Math.round() 	//rounds to the nearest whole number
```
### Generating pseudo random numbers
`Math.random` kan 0 zijn maar niet 1. Met Math.round() kan je wel 10 krijgen als bijvoorbeeld 0,9501 wordt afgerond naar BOVEN.
```js
let randomNum = Math.round(Math.random());	
//-> always rounded to either 0 or 1.

var numm = Math.round(Math.random() * 10);
//-> rounded to a positive integer number between 0 (included) and 10 (excluded) 
Math.floor(Math.Random() * 10 + 1);	
//-> rounded to a positive integer number between 0 (included) and 11 (excluded)

Math.floor(Math.random() * 2)
//-> produces either 0 or 1 
```
Note that if you don't multiply by 10 `.floor` will always be 0 and `.ceil` will always be 1. By multiplying you get: 
```			
0       	  * 10 = 0;
0,222343... * 10 = 2; 
0,366443... * 10 = 4; 
0,982343... * 10 = 10;
```
## Max, min, abs
```js
Math.max()	//-> -Infinity
/*
-Infinity is the initial comparant because almost every other value is bigger, that's why when no arguments are given, -Infinity is returned.
*/

Math.max([1,2,3])	//-> NaN
Math.max(1,2,3)		//-> 3

Math.min()		//-> Infinity
Math.min(1,2,3)	//-> 1

Math.abs(-21); 	// -> 21, absolute value
```
## PI
```js
Math.Pi;	
const nummPi = Math.Pi;		
// -> 3,1451....
	
const omtrek = (2 * Math.Pi * r);
//-> 2 * pi * straal
const oppervlakte = (Math.Pi * r * r)//-> pi r kwadraat
```

## Square-root
```js
Math.sqrt(16)	// -> 4
const vierkantswortel = Math.sqrt(64);	
// -> 8