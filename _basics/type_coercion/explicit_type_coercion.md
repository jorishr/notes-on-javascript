# Explicit type coercion
Table of contents
- [Explicit type coercion](#explicit-type-coercion)
  - [Numbers](#numbers)
    - [String conversion](#string-conversion)
    - [Boolean conversion](#boolean-conversion)
## Numbers
```javascript
Number("hello");	// -> NaN
Number("123"); 		// -> 123
Number("123 hello");// -> NaN

Number(true); 		// -> 1
Number(false); 		// -> 0

Number({})			//-> NaN
Number([])			//-> 0
Number([0])			//-> 0
Number([1])			//-> 1
Number([1,2])		//-> NaN

Number(""); 		// -> 0; 
Number("\n"); 		// -> 0; 
//because white space, tabs and newlines are trimmed first. What is left is an empty string.

Number(undefined); 	// -> NaN
Number(null); 		// -> 0  

//is a number NaN?
function compare(value){
	if(value != value){
		return "We are dealing with a NaN"
	}
};
```
### String conversion 
All primitive values are easily converted to strings: numbers, boleans and empty values.
```javascript
String(undefined);	// -> "undefined"
String(true); 		// -> "true"
String(222); 		// -> "222"

String(Symbol('my symbol')); 	// -> "Symbol(my symbol)"
```

### Boolean conversion
Any value that is not in the FALSY list is converted to true, including objects, function, Arrays, Dates, numbers, strings, symbols, empty objects and empty arrays,...:
```javascript
//the 'black' list
Boolean(""): 		//-> false
Boolean(undefined)	//-> false
Boolean(null)		//-> false
Boolean(0)			//-> false
Boolean(NaN)		//-> false
//all others
Boolean(2); 		// -> true
Boolean("hello"); 	// -> true
Boolean(true); 		// -> true
Boolean({}); 		// -> true
```