# JSON
Properties of objects only grasp onto their values, they do not contain them. An array is thus only stored in the computers memory as a sequence of bits that hold only the addresses of its content. 

To copy this to another computer you would have to copy the entire memory and this is not practical. The solution is to serialize the data: convert it into a flat description. JSON or *Javascript Object Notation* is a storage and communication format that converts data into a flat description. Other formats would be yaml or xml.

In short: JSON is a lightweight data interchange *format*, used to send data back and forth to a server as text or ASCII format.
- rules: no comments, no computation and "" for object property names
- JSON.stringify() convert JS value into a JSON-encoded string
```js
let object = {name: "JR", age: 35};
JSON.stringify(object) 
// -> "{"name":"JR","age":35}"
```
- JSON.parse() takes a JSON-encoded string and converts it into the JS value it encodes.
```js
let jsString = JSON.stringify(object);
JSON.parse(jsString).age 
// -> 35
```
Note that data types can be null, numbers, strings, arrays, objects or booleans. 

## Dictionaries and lists
The basic format in {} notation represents a dictionary. To work with ordered lists use [].
```json
[
	"red",
	"blue",
	"green"
]

//Dictionary with nested list:
{
	"name": "rainbow",
	"colors": [
		"red",
		"blue",
		"green"
	]
}
```