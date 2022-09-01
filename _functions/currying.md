# Currying functions
Currying is a function adaptation that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

- Example 1: rewrite a function so that it returns a function with a specific parameter set: `multiply(x, y)` is equivalent to `curriedMultiply(x)(y)`
```js
//base function
function multiply(x, y){
	return x * y 
}

function curriedMultiply(x){
	return (y) => x * y; 
}
```
- Example 2: Write a function such that: `add(1,2) //->3` and `add(1)(2)//->3`.
```js
function add(x, y){
	if(x && y) return x + y;
	return (y) => x + y; 
}
```
## Use cases in NodeJs
FS Module readFile:
```js
//fs.readFile(path, encoding, cb)
fs.readFile('hello.txt', 'utf8', 
	(err, data) => console.log(data)
)

//becomes:
fs.curriedReadFile('hello.txt', 'utf8')((err,dat) => console.log(data))
```
By currying, we have separated the initiation of the asynchronous operation from the retrieval of the result. Thus we while the reading of 'hello.txt' is in progress. You could then initiate several operations in a close sequence, let them do their I/O in parallel, and retrieve their results afterwards.
```js
let reader1 = curriedReadFile(path1, "utf8");
let reader2 = curriedReadFile(path2, "utf8");
// I/O is parallelized and we can do other things while it runs

// further down the line:
reader1((err, data1) => {
  reader2((err, data2) => {
	console.log(data1)
	console.log(data2)
  });
});
```
## Futures
Futures is a powerful programming abstraction that does more or less what we did with the currying example: it encapsulates an asynchronous operation and allows you to obtain the result later.

It's also similar to Promises.

(further reading required)