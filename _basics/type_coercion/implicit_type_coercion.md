# Type coercion
Table of contents
- [Type coercion](#type-coercion)
	- [Implicit type coercion](#implicit-type-coercion)
		- [The equality operator](#the-equality-operator)
		- [The + operator](#the--operator)
		- [The other math operators](#the-other-math-operators)
		- [Logical operators](#logical-operators)
Reference Guide
[Eloquent JS: Values, Types, and Operators](https://eloquentjavascript.net/01_values.html)

## Implicit type coercion
The implict type coercion occurs when operators encounters values of different data-types. An attempt will be made to convert one or both of the values to another data-type so that the operator can perform its operation. A set of rules is defined within javascript to determine how this process works.

### The equality operator
```javascript
'true' == true		
//-> different type -> coercion into number NaN == 1 -> false

false == 'false'
//-> different type -> coercion into number 0 == NaN -> false

null == ''	//-> false, null only equals to itself and undefined, no type coercion
undefined == null	//-> true
undefined == 0 		//-> false 

NaN == NaN	//-> false, as NaN does not equal to anything else

const a = 10 
const b = '10'; 
a == b	//-> true, number conversion 10 == 10 
a === b //-> false because different data type, no type coercion

!!"false" == !!"true"    // -> true
/*
! converts the strings into booleans. !!true -> !false -> true
true == true whereby == checks if both booleans are equal.
*/
```
### The + operator
This is a math operator so the default options is to try numeric conversion for non-number datatypes. When one of the value is a string, string concatenation is attempted.
```javascript
true + false 
//-> 1, non-number datatypes triggers numeric conversion into 1 + 0 = 1

"5" + 1		//-> 51 
2 + '2' 	//-> 22	

//Convert a number to a string with + ""
const age = 30 + "";
console.log(typeof(age));	//-> string

new Date(0) + 0  //-> 'Thu Jan 01 1970 02:00:00(EET)0'
//The date is a UTC string, so string concatenation is used 'Thu Jan 01 1970 02:00:00 GMT+0200 (EET)' + 0

"foo" + + "bar"	// -> "fooNaN"
/*
Here you have combination of the binary operator + and the unary operator +. Unary + operator has higher precedence over binary + operator. The unary + operator trigger a numeric conversion attempt for "bar" which results into NaN. 
"foo" is string that triggers string concatenation leading to "fooNaN".
*/
```
### The other math operators
Operators like `-`, `*` or `/` are always number operators. Thus type coercion will attempt numeric conversion as default options.
```javascript
"5" - 1	//-> 4, converts string "5" into number
2 - '2'	//-> 0, converts string '2' into number
6 * null	//-> 0, converts null into number
new Date(0) - 0	//-> 0
//triggers numeric conversion for Date. Date.valueOf() returns number of milliseconds since Unix epoch, thus 0 - 0 = 0
```
### Logical operators
When `||` and `&&` encounter values of a non-boolean data type they will convert the value on the left-side to a boolean value (truthy or falsy). 
In a boolean context values of any datetype count as true (thruthy) except for `0`, `NaN` and `""` (empty string), `undefined` and `null`.

The OR operator will start off its evaluation on the left value. If a non-bolean is encountered type coercion is attempted and if true, the left value is returned. The right value is not even evaluated.
```javascript
"Agnes" || "user"	//-> Agnes

10 || 0 			//-> 10

0 || "user"; 		//-> user

undefined || "user";//-> user
```
The AND operator will also type coerce the left-side of the equation. BUT returns only the left-hand side value if that can be converted to FALSY. If both can be converted to truthy, then the right-hand side value is returned.  
```javascript
0 && "user"); // -> 0 because 0 is falsy
undefined && "user"); // -> undefined

5 && "user"; // -> user

0 || "0" && {}	// -> {}
/*
(0 || "0") && {}
left side (false || true) -> returns "0"
"0" && {} -> true && true, returns {}
*/
```