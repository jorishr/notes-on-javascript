# Promises in Javascript
Table of contents
- [Promises in Javascript](#promises-in-javascript)
  - [About promises](#about-promises)
  - [Creating promises](#creating-promises)
  - [Consuming promises](#consuming-promises)
      - [Thenables](#thenables)
      - [Asynchronicity](#asynchronicity)
      - [Promise based timeout](#promise-based-timeout)
  - [Promise API](#promise-api)
    - [Promise all](#promise-all)
      - [Example: mapping urls into requests](#example-mapping-urls-into-requests)
      - [Multiple AJAX API requests to a database (jQuery)](#multiple-ajax-api-requests-to-a-database-jquery)
    - [Promise.allSettled](#promiseallsettled)
    - ['Promise.race'](#promiserace)

## About promises
A promise is an OBJECT that represents the completion or failure of an asynchronous task and its resulting value (error or data).

In other words a ONE TIME guaranteed return of some future value. It is a placeholder, since we do not know when it will be returned by the async operation nor what the exact value will be. 

When the promise returns its value the promise is either RESOLVED(fulfilled) with the expected result, or REJECTED.

Conceptually think of the ordering process in a fastfood joint: your order placement results in a promise to deliver food, while you wait other people can order as well. At some point in the future you will get your order, but until that is fulfilled you only hold a placeholder ticket. Ones the food arrives, it either is as expected or there is an error.

Callback functions can be performed multiple times, for example with a setInterval, every x seconds. Promises however can only be resolved/rejected ONCE. If you want do it all again you have to create a new promise.

Promises simplify reading and debugging of your code and avoids callback hell.

## Creating promises
Use the new keyword and the Promise constructor function. Promises takes a callback function that contains TWO parameters: resolve and reject. 

These parameters are bindings to functions to be called if the promise is either resolved or rejected.

Examining a promise that gets resolved / rejected:
``` 
Promise {<pending>}
  __proto__: Promise

  [[PromiseStatus]]: "resolved"
  [[PromiseValue]]: <return value>

Promise {<pending>}
  __proto__: Promise
 
  [[PromiseStatus]]: "rejected"
  [[PromiseValue]]: <return value>
```
The STATE (resolved/rejected) and the RESULT (return value or error) are internal to the promise and CANNOT be directly accessed. You need a CONSUMER method to access those values.

The promise is an object with methods that can be found in the `__proto__`.

## Consuming promises
- The `finally()` method is executed when the promise is settled, it does not consume the promise but passes it on to the `then` or `catch` methods you chain to it. This method is useful for writing a function that stops a loader on the screen. 
- The then method is to be executed when the promise is fulfilled
- The catch method is to be executed when the promise is rejected. 

Both methods then and catch accept two callbacks. The parameters for those callbacks are the PromiseValue and an error.

If you define two function in the then method only one of them gets executed: the result handling callback with the promise value as argument or the error handling callback with the error object as argument.
```js
.then((val) => console.log(val))
.catch((err) => console.log(err))

//catch is the equivalent for .then(null, errHandler(err))

promise.then(f1).catch(f2); 
//unhandled error
promise.then(f1, f2);
```
#### Thenables
Each then method is expected to return another promise, a so-called thenable object. It will be treated the same way as a promise. This allows for chaining together various promises and pass values from one promise to another. 

#### Asynchronicity
The promise handlers then, catch and finally are always asynchronous and thus pass through the TASK QUEUE before being called into the call stack by the event loop. 

Consider the example:
```js
let promise = new Promise.resolve();
promise.then(() => alert("promise done!"));
alert("code finished"); 
//-> code finished
//-> promise done!

//the handlers are called after the current code is finished. 
```
#### Promise based timeout
```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('runs after 3 seconds'));
```

## Promise API
### Promise all
Let's say we want many promises to execute in parallel and wait until all of them are ready. The `promise.all()` is a method on the Promise constructor function that takes in an array of promises and resolves them all at once. It returns a promise as well.

Or, once one of them gets rejected you have a fast fail or rejection instead of rejecting one by one.

If all promises are fulfilled their values will be returned in an array with those values in the SAME ORDER, even though the process of resolving those promises is not sequential. 
```js
let promise = Promise.all([/*arr of promises>*/]);

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), 
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), 
  new Promise(resolve => setTimeout(() => resolve(3), 1000))])
.then(console.log) 	//-> (3) [1,2,3] 
.catch(alert); 		  //-> Error
```
When promises are ready: each promise contributes an array member. The setTimeout means that internally the results 1, 2 and 3 come in reverse order but the returning result of Promise.all is always in the same order as the promises were called. In case of error in one of the promises the result is an error and the resolved promises are ignored.

#### Example: mapping urls into requests
A common trick is to map an array of task data into an array of promises, and then wrap that into Promise.all.
```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```
#### Multiple AJAX API requests to a database (jQuery)
Retrieve movie title objects from a database with a function that returns a promise, and once resolved prints one or multiple properties of the movie objects.

Store the promise for various AJAX calls into variables. The values stored here are objects with pending promises that are not 
resolved yet.
```js
function getMovie(title){
    return $.getJSON(`https://omdbapi.com?t=${title}&apikey=thewdb`) 
}; 
let titanicPromise = getMovie("titanic"); 
let shrekPromise = getMovie("shrek");
let braveheartPromise = getMovie("braveheart");

Promise.all([titanicPromise, shrekPromise, braveheartPromise])
.then(function(movies){
    return movies.forEach(function(value){
      	  console.log(value.Year);
		});   
});
//-> 1997, 2001, 1995
```
Thus instead of running the then method on each promise binding we can use `Promise.all`. This will return an array of resolved promises with movie objects as values. That array (movies) is passed as an argument to the callback in the then method and the callback returns the values that are a result of looping over the array and logs the year property value.

### Promise.allSettled
For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others. So for each promise we get its status and value/error that we have access to.
```js
[
  {status: 'fulfilled', value: <response>},
  {status: 'fulfilled', value: <response>},
  {status: 'rejected', reason: <error object>}
]
```
### 'Promise.race'
Like promise.all() but it only return the value for the promise that resolves first, all others are ignored.