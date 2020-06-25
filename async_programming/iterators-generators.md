# Iterators and generators
Table of contents
- [Iterators and generators](#iterators-and-generators)
	- [Iterators](#iterators)
		- [For...of loop](#forof-loop)
	- [Extract the iterator](#extract-the-iterator)
	- [Generator functions](#generator-functions)
		- [Combine generators](#combine-generators)
		- [Use case: dependant async http request](#use-case-dependant-async-http-request)
		- [Loop generator function values](#loop-generator-function-values)
## Iterators
Arrays are easily iterable because of their ordered structured with an index based positioning. Objects however are more difficult to iterate over because the key-value pairs don't come in a specific order.

How to find if a datastructure is iterable? Modern JS has introduced the Symbol iterator object which is present in datastructures that are iterable only.
```js
let arr = [1,2,3];
let obj = {`a`: 1, `b`: 2, `c`: 3};
console.dir(arr)	
//-> _proto_ -> Symbol(Symbol.iterator)
console.dir(obj)	
//-> 	No Symbol object
```
Iterable datastrures
- strings,
- arrays,
- sets and weak sets,
- maps and weak maps

### For...of loop
The symbol iterator allows us to use a new sort of loop on iterable datastructures.
```js
let mySet = new Set[1,2,3,4,4,4,5];
mySet	
//-> [1,2,3,4,5] duplicate item are ignored

for(let val of mySet){
	console.log(val)
}	
//-> 1,2,3,4,5
```

## Extract the iterator
You can store a CALL to the ITERATOR function in a variable.
```js
let arr = [1,2,3];
let iterator = arr[Symbol.iterator]();
iterator	
//-> Array Iterator	
//-> __proto__ -> f next()

iterator.next()	//-> {value:1, done: false}
iterator.next()	//-> {value:2, done: false}
iterator.next()	//-> {value:3, done: false}
iterator.next()	//-> {value:undefined, done: true}
```
The ITERATOR has a NEXT function that will allow you to obtain the next value in the iterating process.If you call that method, you get an object with two key-value pairs: the next value in the datastructure and a boolean that indicates whether or not the iteration has ended.

## Generator functions
A generator function builds on top of the Symbol.iterator implementation. 
```js
function* myGenerator(){
	yield 1;
	yield 2; 
}
myGenerator()	
//-> {<suspended>}

myGenerator.next(); 
//-> {value: 1, done: false};

let generator = myGenerator();
generator.next() 	//-> {value: 1, done: false};
generator.next() 	//-> {value: 2, done: false};
generator.next() 	//-> {value: undefined, done: true};
```
Upon each call, it pauses and yields a value. Only upon the next call it goes on to yield the next value. Thus even an infinite generator with a while loop will not overflow the stack.
```js
function* infinite(){
	let i = 0;
	while(true){
		yield(i);
		i++
	}
}
infinite()		
//->	{<suspended>}

let iterator = infinite();
iterator.next()	//-> {value:1, done: false}
iterator.next()	//-> {value:2, done: false}
iterator.next()	//-> {value:3, done: false}
iterator.next()	//-> {value:4, done: false}
...
//the value for done will never become true.
```

### Combine generators
```js
function* generator(){
	yield 1;
	yield* anotherGenerator();
	yield 3;
}

function* anotherGenerator(){
	yield 2;
};

let generate = generator();

generate.next()	//-> {value:1, done: false}
generate.next()	//-> {value:2, done: false}
generate.next()	//-> {value:3, done: false}
generate.next()	//-> {value:undefined, done: true}
```

### Use case: dependant async http request
If you have multiple http requests that depend on the data that is retrieved by a previous ajax call, generators are very useful because that pauses the execution untill the data is returned.
```js
function* generator(){
	yield request('url1');
	yield request('url2');
}

function request(url){
	return new Promise(function(resolve, reject){
		ajaxCall(url, function(err, data){
			if(err) reject(err);
			else resolve(data);
		})
	})
}
```
### Loop generator function values
Generators implement a Symbol.iterator property that we can use to iterate over the various value properties (yields) that are generated by the respective yield objects.
```js
for(val of myGenerator()){
	console.log(val)
} 
//whereby val takes on the valueE property value of the generated object {value: <x>, done: <boolean>}
```
With this step you don't have to manually invoke .next() all the time to access the VALUE property. If you do want the entire object, you obviously would have to call .next()