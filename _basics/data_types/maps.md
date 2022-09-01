# Maps and weak maps
Table of contents
- [Maps and weak maps](#maps-and-weak-maps)
	- [Maps](#maps)
		- [Map methods](#map-methods)
	- [Weak maps](#weak-maps)

## Maps
A map or HASH MAP is an iterable data structures. A maps is similar to objects, but the KEYS can of any data type, thus not only strings as in normal objects. The advantage over a normal object is:
- the keys can be of any type 
- iterable (index-based)
- finding the size -or number of key-values pairs- is easy. 
- the object.prototype cannot be overwritten as maps don't have one. 

When to use: 
- when you need other key types than strings. 
- when you need to look up keys that are not hardcoded strings and that need to be looked up dynamically.
- when you need to add/remove key-value pairs frequently.

### Map methods
```js
const myMap = new Map();

//set(key,value): add key-value pair
//get(key): get value at key
//delete(key)
//size(): number of keys in the map

myMap.set(true, 'string' );
myMap.set(false, 2 );

//you can chain the commands
myMap.set(true, 'str').set(false, 2);

myMap.delete(false); 	
//-> returns true when successful

myMap.size			//-> 1


//keys can be arrays and objects
let arrKey = [];
myMap.set(arrKey, [1, 2, 3]);

let objKey = {};
myMap.set(objKey, {'name': 'John', 'age': 22});

myMap.get(true)
//-> 'string'
myMap.get(arrKey)
//-> [1, 2, 3]
myMap.get(objKey) 
//-> {'name': 'John', 'age': 22}

//loop over key-value pairs
myMap.forEach(val => console.log(val));

/*
For...of loop. Maps have a Symbol.iterator implementation which lets us use a for...of via the ENTRIES method.
*/
for(let [key, value] of myMap.entries()){
	console.log(key, value);
}

myMap.values()		
//-> mapIterator {'string', 2}
myMap.keys()		
//-> mapIterator {true, false}

//convert a map into a two-dimensional array

let arr = [...myMap];
arr 	
//-> [[], []];
```

## Weak maps
The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced. *Regular maps* prevent the keys from being garbage collected (free-up memory occupied by objects that are no longer used) if there is no other reference to the object.

The keys must be objects and the values can be arbitrary values.

Cannot be iterated over because of the weak reference.

Example of garbage collection prevention in maps:
```js
{
	let x = {a:1, b:2};
	var map = new Map();
	map.set(x, 'str');
}
console.log(map);
//-> Map(1) {{…} => "str"}
```
Let x has a block scope and is not available outside the block. After running the block the x object can no longer be referenced. *But*, it does persist in memory because the map data structure will prevent the garbage collection process to free up that memory so the MAP itself can store that reference.

If a *weak map* is used, the reference to the key is considered to be weak, in other words, garbage collections is not prevented and the reference to the key completely disappears from the memory system.
```js
{
	let x = {a:1, b:2};
	var weakMap = new WeakMap();
	weakMap.set(x, 'str');
}
console.log(weakMap);
//	-> WeakMap {{…} => "str"}
//	No properties
```