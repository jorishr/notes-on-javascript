# JavaScript program structure

Table of contents

- [JavaScript program structure](#javascript-program-structure)
	- [Expressions and statements](#expressions-and-statements)
	- [JavaScript environment](#javascript-environment)
	- [Control flow](#control-flow)
		- [Conditional execution](#conditional-execution)
		- [Switch case](#switch-case)
	- [Strict mode](#strict-mode)
		- [Strict mode properties](#strict-mode-properties)

## Expressions and statements

An expression is a fragment of code that produces a value (thus, a chunk of grouped digits). Think of a sub-sentence. A JS statement is full sentence, that ends with a `;`. A program is a list of statements.

Type `1` into the JS console and this expression only produces the value 1. But it disappears. A statement stands on it own. It can affect the statements that come after it (side effects).

## JavaScript environment

The environment is the collection of bindings and their respective values that exist at a given time. Some are part of the language standard. Others are specific to the environment and provide ways to interact with the surrounding system. For example, in the browser you can interact with the Document Object Model but those methods are not available when running the code in NodeJs.

## Control flow

JavaScript by default follows a straight-line flow, executing line by line from top to bottom.

### Conditional execution

Conditional execution with the `if` keyword, only if a certain condition holds true, some code is executed: `if (condition){code to be executed}`. Only if the boolean return value of the condition is true the code block will run, if false the code block will be ignored: `if (1 + 1 == 2){console.log("correct");}`.

The alternative execution path is indicated with the `else` keyword. Thus when the if condition returns false, its code block will be ignored and JS will go to the else code block for an alternative execution path. Chain of multiple if/else statements:

```js
let num = Number(prompt("Give me a number"));
if (num < 10) {
  console.log("small");
} else if (num < 100) {
  console.log("medium");
} else {
  console.log("large");
}
```

Some if/else statements can be simplified with the ternary operator:

```js
const age = 30;
age > 30 ? console.log("30+") : console.log("-30");

//combinations:
age > 30
  ? age > 50
    ? console.log("50+")
    : console.log("30-50")
  : console.log("-30");
```

### Switch case

A switch statement is used as an alternate to multiple if/else statements. The switch expression is evaluated once and compared with the values of each defined _case_.

The switch statement uses the equality operator `===` for comparisons, thus values must be of the same data type to match. A `default` or catch all case can be defined when the expression does not match a case.

```js
switch (expression) {
  case value:
    expression;
    break;
  case value:
    expression;
    break;
  default:
    expression;
    break;
}
```

A switch statement can best be used when you have specifically defined cases or possibilities. Example:

```js
switch (prompt("what is the weather like?")) {
  default:
    console.log("Unknown weather type: sunny, rainy, foggy, cloudy?");
    break;
  case "rainy":
    console.log("bring an umbrella");
    break;
  case "sunny":
    console.log("sunglasses are needed today");
    break;
}
```

The program will start at the label (case) that corresponds to the value that was given or at the default expression when no matching value is entered. The break statements are necessary to stop the switch conditional.

## Strict mode

Strict mode can be invoked at the level of the script: `'use strict';` on top of the file. In ES Modules strict is applied automatically. Inside functions use:

```js
function strict() {
  "use strict";
  //do smth
}
```

### Strict mode properties

Strict mode enforces stricter parsing and error handling by changes in both syntax and runtime behavior:

- debugging becomes easier by converting minor mistakes and ambiguities into errors.
  In general JS some mistakes are simply ignored but in strict mode they generate an explicit error. For example, function parameter names must be unique. Thus `function sum(a, a, b){'use strict'; return a + a + b}` will return an error while in a normal context you get `sum(1,2,3) //->7` as `a` takes on the value of last parameter definition. Another example: global variables cannot be defined by accident. Thus writing `undeclaredVar = 10;` will create a global variable despite having the keyword missing. In strict mode this will produce an error.
- deleting a variable is not allowed
- defining a property value more than once in an object is not allowed
- writing to read-only or get-only properties is not allowed.
- in a browser environment the keyword `this` will no longer reference the window object inside a function.
