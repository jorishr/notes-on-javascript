# Callback functions
Table of contents
- [Callback functions](#callback-functions)
	- [Callback functions](#callback-functions-1)
	- [Error handling in callback function](#error-handling-in-callback-function)
## Callback functions
The first approach to asynchronous programming is to make functions that perform a slow action take an extra argument, a callback function. The action is started, and when it finishes, the callback function is called with the result.

A callback function is a function that is passed as a parameter to another function AND then invoked/called by that function. The parent function is a higher order function:
```js
function higherOrder(callbackFn){
	callbackFn();
}
//a callback can be anything, for example:
function higherOrder(a, b, cb){
	return cb(a, b);
}
function sum(x, y){return x + y};
higherOrder(2, 3, sum)
//-> 5
```
use case for callback functions:
- advanced array methods (map, filter, reduce, some, every)
- handling browsers events: click, submit, dom content loaded, all accept callbacks that are called when the event takes place.
- AJAX requests
- React development

## Error handling in callback function
A widely used convention is that the first argument to the callback is used to indicate that the action failed, and the second contains the value produced by the action when it was successful. NodeJS has implemented `err` as the first argument of a cb function. If no err is present the value of err is null.
```js	
fs.readFile('/file.json', (err, data) => {
	if (err !== null) {
		return console.log('Error', err);
	console.log('success', data);
```
Such a callback function must always check whether it received an exception and make sure that any problems they cause, including exceptions thrown by functions they call, are caught and given to the right function. The problem with this approach is that it may lead to a lot of nested code with lots of callbacks and if/else statements for handling errors and events.

Alternatives are PROMISES and ASYNC/AWAIT.