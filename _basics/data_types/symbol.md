# Symbols
A symbol represents a unique identifier. Symbols are guaranteed to be unique. Even if we create many symbols with the same description (label), they are different values.
```js
let id = Symbol();
let idWithLabel = Symbol('label');

let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 == id2); 	//-> false

id1;			//-> 	Symbol(id)
id1.toString	//->	"Symbol(id)"
```
## Use case
Object keys can be strings or Symbols. When hidden object properties are needed that cannot be overwritten or used by accident, use a Symbol. They will not show up in a `for...in` loop.