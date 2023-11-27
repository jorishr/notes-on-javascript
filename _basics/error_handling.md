# Error handling in JavaScript

Table of contents

- [Error handling in JavaScript](#error-handling-in-javascript)
  - [Try...catch block](#trycatch-block)
  - [The error object](#the-error-object)
    - [Throw custom errors and rethrow unexpected errors](#throw-custom-errors-and-rethrow-unexpected-errors)
      - [Example](#example)
  - [Extending the error class](#extending-the-error-class)

## Try...catch block

Invalid JS that is caught during compilation and produces _parse time errors_, is unrecoverable and cannot be handled.

Errors that occur during _run-time_ can be caught and handled with a `try...catch` block.

The `try...catch` is _synchronous_ and does not have access to async tasks that are executed at a later stage via the task queue. Thus setTimeout callback errors, for example, are not caught because JS has already exited the `try...catch` code blocks before the setTimeout callback has been executed.

Exceptions are promise-based async tasks that do pass on errors.

```js
try {
	...//code
} catch (error){
	//handle the error object
};
```

The _finally_ method can be added to have some code type of execution that gets executed either way, independent of the result.

```js
try {
	...//do smth
}
catch(err){
	...//handle error
}
finally{
	//do smth whatever the outcome, incl. if try has return statement
}
```

## The error object

When an error occurs, JavaScript generates an object containing the details about the error. The built-in errors have at least two properties: `.name` and `.message`.

Sometimes also the current call stack `.stack` is available. A string with information about the sequence of nested calls that led to the error.

### Throw custom errors and rethrow unexpected errors

Technically, we can use anything as an error object. That may be even a primitive, like a number or a string, but it's better to use objects, preferably with name and message properties.

The standard errors are: Error, SyntaxError, ReferenceError, TypeError

```js
throw <error object>('message');

try {
	let dosmth = () => {
		1 + 2; eeerrr;
	};
	dosmth();
}
catch (err){
	console.log(err.name, err.message, err.stack)
}
//-> 	ReferenceError eeeerrrr is not defined
```

#### Example

Example with bad or incomplete JSON:

```js
let badJson = "{ bad json }";
let incompleteJson = '{"age": 30}';

try {
	//let user = JSON.parse(badJson);
	let user = JSON.parse(incompleteJson);
	if (!user.name) {
    	throw new SyntaxError("Incomplete data: no name");
	}
	console.log(user.name)
	unexpectederrorhere()
}
catch(err) {
	if (err instanceOf SyntaxError){
		console.log(err.name, err.message);
	} else {
		throw err;
	}
}
//-> SyntaxError Unexpected token b in JSON at position 2
//-> SyntaxError Incomplete data: no name

/* Rethrow errors
Inside the catch statement we may add an additional if/else statement to handle unexpected errors unrelated to the JSON parsing.
*/
```

## Extending the error class

For errors in network operations we may need HttpError, for database operations DbError, for searching operations NotFoundError and so on. Our errors should support basic error properties like message, name and, preferably, stack. But they also may have other properties of their own, e.g. HttpError objects may have a statusCode property with a value like 404 or 403 or 500.

For example, create class for Validation Errors when parsing JSON. The JSON may be syntactically correct but some data is missing. The ValidationError class should inherit from the Error class.

For more examples see: [custom errors](https://javascript.info/custom-errors). Note that it is possible to wrap the errors below into a higher level ReadError class with parameters name and cause (error).

```js
class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}
// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert("Invalid data: " + err.message); // Invalid data: No field: name
  } else if (err instanceof SyntaxError) {
    // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}

// Wrap errors
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}
```
