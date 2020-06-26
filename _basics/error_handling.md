# Error handling in Javascript
Table of contents
- [Error handling in Javascript](#error-handling-in-javascript)
	- [Try...catch block](#trycatch-block)
	- [The error object](#the-error-object)
		- [Throw custom errors](#throw-custom-errors)
			- [Example](#example)

## Try...catch block
Invalid JS is catched during compilation and produces PARSE TIME ERRORS that are unrecoverable and cannot be handled. 

Errors that occur during run-time can be catched and handled with a TRY...CATCH block.

The try...catch is SYNCHRONOUS and does not have access to async tasks that are executed at a later stage via the task queue. Thus setTimeout callback errors, for example, are not catched because JS has already exited the try...catch code blocks before the setTimeout callback has been executed.

Exceptions are promise-based async tasks that do pass on errors.
```js
try {
	...//code
} catch (error){
	//handle the error object
};
```
The finally method can be added to have some code type of execution that gets executed either way, independent of the result.
```js
try {
	...//do smth
}
catch(err){
	...//handle error
}
finally{
	//do smth wathever the outcome
}
```

## The error object
When an error occurs, JavaScript generates an object containing the details about the error. The built-in errors have at least two properties: `.name` and `.message`.

Sometimes also the current callstack `.stack` is available. A string with information about the sequence of nested calls that led to the error.

### Throw custom errors
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
}
catch(err) {
	console.log(err.name, err.message);
}
//-> SyntaxError Unexpected token b in JSON at position 2
//-> SyntaxError Incomplete data: no name
```