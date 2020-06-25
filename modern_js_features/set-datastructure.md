# Sets
A set is a datastructure in which all values are unique. No duplicates are allowed but the value can be of any data type.
```js	
let arr = [1, 2, 3, 4];
let obj = {'a':1, 'b': 2} 
let firstSet = new Set([arr, obj, true]);
```
You can easily add values with the `.add()` method and when you add duplicate values, those are ignored by the set.
```js	
firstSet.size	//-> 3;
firstSet.add(true);
firstSet.size	//-> 3;

//Delete values with the .delete() method.
```
To check if a value is present in the set, use the .has() method:
```js	
firstSet.has(arr)	//-> true
firstSet.has(false)	//-> false
```
Symbol Iterator is present, thus we can use a for...of loop to get all the values.

## Weakset
In a weakSet all values must be unique OBJECTS.