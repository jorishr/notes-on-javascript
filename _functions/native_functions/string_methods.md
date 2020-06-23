# String methods in Javascript
Table of contents
- [String methods in Javascript](#string-methods-in-javascript)
	- [charAt and charCodeAt](#charat-and-charcodeat)
	- [indexof](#indexof)
	- [includes](#includes)
	- [start/endsWith](#startendswith)
	- [replace](#replace)
	- [slice, split and join](#slice-split-and-join)
	- [trim and padding](#trim-and-padding)
	- [repeat](#repeat)
	- [raw](#raw)

## charAt and charCodeAt
The `str.charAt(i)` method returns the value stored at index position i. For example, to select and capitalize the first letter of a string you write: `str.charAt(0).toUpperCase()`.  

UTF-16 code unit at the given index.
```js
let str = 'x'
str.charCodeAt(0)  //-> 121
```

## indexof
Returns the position at which a character is found. If NOT FOUND the return value is -1. The `str.indexOf()` method can look for a characterstring and returns the starting position of that string. Thus: `"a big three".indexOf("ee") // -> 9`

## includes
The `.includes()` method returns a bolean if a value is found inside a string. 
```js
"hello".includes("e") // -> true
"hello".includes("a") // -> false
```
This method can also find substrings: `"hello".includes("ello") // -> true`.	 

You could use the indexOf method to get the position and convert the resulting value in a boolean with a boolean operator: 
```js
"hello".indexOf("a")	// -> -1;
"hello".indexOf("e"); 	// -> 1; 

"hello".indexOf("e") > -1;	// -> true  
"hello".indexOf("a") > -1; // -> false
```
## start/endsWith
```js
'hello'.startWith('hell');	//-> true
'hello'.endsWith('llo');	//-> true
```

## replace
The replace method `str.replace(regEx, '_')` uses a regular expression to select characters in a string and replace them with an alternative value.
```js
const str = 'hello-world';
const newStr = str.replace(/-/g , "_");
//-> 'hello_world'
```
## slice, split and join
The `str.slice` work just as it does on an array. Copies items between index positions (start at, inclusive and end position NOT inclusive).

`str.slice(0, 2)` will return a new string with characters at position 0 and 1. Specifying only one value will return the string untill the end after starting at that index position.

No values specified returns a copy of the entire string.
```js
"hello".slice(0,2) //-> "he"
"hello".slice(1) //-> "ello"
"hello".slice() //-> "hello"
```
The split method splits strings into parts using a seperation character and returns an array. Example, `str.split` a sentence string into seperate words using space as a seperator:
```js
"hello world, it's me!".split(" ") 
// -> ["hello", "world", "it's", "me"]

str.split('')		
//-> [array of characters in string]
'hello'.split('')	//-> [h,e,l,l,o]
```
This method is usefull if you need to perform actions on all characters of a string.

The join method join the values of an array into a string whereby the join(val) val seperates the values.

Example, `.join` and `.split` a sentence:
```js
let sentence = "hello world it's me";
let words = sentence.split(" ");

words.join(" ")
words.join("-") 
//-> "hello-world-it's-me"
```

## trim and padding

The `str.trim` method removes white spaces, tabs and newlines at the end and beginning of a string.
```js
"   \n hello world    ".trim() 
// -> "hello world"
```
The `padStart` method can be used to obtain a specific format, for example zeropadding:
```js
str.padStart(length, paddingChar)

"5".padStart(4, 0); 
// --> "0005"
"5".padStart(4, "a"); 
// --> "aaa5"
```

## repeat
The `.repeat` method glues together copies of the same string: `"6".repeat(3) // -> "666"`

## raw
Write a string as is, without escaping characters.
```js
const rawStr = String.raw`hello \n World`	
//-> 'hello \n world'