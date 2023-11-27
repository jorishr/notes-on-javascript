# JavaScript operators

Table of contents

- [JavaScript operators](#javascript-operators)
  - [Binary, unary and ternary operators](#binary-unary-and-ternary-operators)
    - [The + operator](#the--operator)
    - [The - operator](#the---operator)
    - [The typeof operator](#the-typeof-operator)
    - [The ternary operator](#the-ternary-operator)
  - [Boolean operators](#boolean-operators)
    - [The \< and \> operators](#the--and--operators)
    - [The == and != operators](#the--and--operators-1)
  - [Logical operators](#logical-operators)
    - [The AND operator](#the-and-operator)
    - [The OR operator](#the-or-operator)
    - [The NOT operator](#the-not-operator)
  - [Operator precedence](#operator-precedence)
    - [Example](#example)

Reference Guide
[Eloquent JS: Values, Types, and Operators](https://eloquentjavascript.net/01_values.html)

## Binary, unary and ternary operators

Binary operators like `+/%` operate on two values: `4 + 3` or `8 % 3`.

Unary operators operate on just one value. Example are `typeof`, `!` or `-` as in `console.log(-(10 + 2))`.

### The + operator

The `+` operator performs polymorphism, as it can adapt to the situation it encounters:

- with 2 numbers it performs a calculation
- when it encounters a string on the left or right side, it tries to convert the other value into a string to perform string concatenation. Strings always take precedence over numbers.

### The - operator

As a binary operator it performs a subtraction.
As a unary operator it converts a positive integer into a negative integer: `console.log(- (10 + 2))` returns -12.

### The typeof operator

Return the data type of the value it operates on.

```javascript
console.log(typeof "x"); //-> string
console.log(typeof {}); //-> object
console.log(typeof []); //-> object
console.log(typeof 10); //-> number
console.log(typeof true); //-> boolean
```

### The ternary operator

The _ternary_ or conditional operator operates on three values: It has a conditional statement and based on the outcomes returns the first or the second value. The conditional operator can be a useful replacement for and if/else statement.

```javascript
console.log(true ? 1 : 2); //-> 1
console.log(false ? 1 : 2); //-> 2
```

If the first value is true, the middle value is picked.
if the first value is false, the last value after the : is picked.

## Boolean operators

Boolean operators are binary operators applied to two values and the outcome of the operation has only two possible values: true or false.

Example `console.log(3 < 2);` returns `false`.

### The < and > operators

- Less than `<` , greater than `>`
- Less than or equal `<=`, greater than or equal `>=`

```javascript
console.log(5 < 6 < 7); //-> true < 7 -> 1 < 7 -> true
console.log(7 > 6 > 5); //-> true > 5 -> 1 > 5 -> false
```

When comparing strings like `"abc" < "Abc"` JavaScript compares the unicode code values one by one from left to right whereby uppercase is less than lowercase.

### The == and != operators

The base equality operators check the whether two values are equal. If those values are not of the same data type, the type conversion algorithm kicks in to try and convert the values into data types that can be compared. This can lead to unexpected outcomes. It is therefor recommended to use the strict equality operators `===` and `!==` that do not perform type coercion.

```javascript
"apple" != "orange"; //-> true
"apple" == "orange"; //-> false
true == 1; // -> true, you get type coercion whereby true is converted to 1
true === 1; //-> false, you compare two different data types

NaN == NaN; //-> false because the outcome of nonsensical operation is not equal to any other nonsensical operation.
```

## Logical operators

The logical operators `&&`, `||` and `!` create boolean context. See type coercion for what happens if the values are not of the boolean type.

### The AND operator

The `&&` is a binary operator. The result of this operation is true only when _both_ values given to it are true:

```javascript
console.log(true && false); //-> false
console.log(false && false); //-> false
console.log(true && true); //-> true
```

### The OR operator

The `||` is binary operator. The result of this operation is true when one of the values given to it are true:

```javascript
console.log(true || false); //-> true
```

### The NOT operator

The `!` operator is a unary operator that only operates on one value. It flips the boolean value given to it.

```javascript
console.log(!true); //-> false
console.log(!!true); //-> !!true -> !false -> true
console.log(!!"false"); //-> !!true -> !false -> true
```

## Operator precedence

In mathematics 'BODMAS' is used:

- B: Brackets first
- O: Orders (i.e. Powers and Square Roots, etc.)
- DM: Division and Multiplication (left-to-right)
- AS: Addition and Subtraction (left-to-right)

### Example

```javascript
!+[] + [] + ![]; // 'truefalse'
```

`(!+[]) + [] + (![])`

The first empty array is converted to numeric value, 0. And `!(+0)` is `!0`. 0 is converted into a boolean by the ! operator: false becomes true.

`true + [] + false`

The numeric conversion of the empty array is not a primitive so we fall back to the toString method: `true + "" + false`

Then `true + ''` results in a string the final computation is `'true' + false` resulting in string concatenation as well to arrive at the string: `truefalse`

```
(!+[]) + [] + (![])
	-> (!0) + [] + (false)
		-> true + [] + false
			-> true + "" + false
				-> "truefalse"
```
