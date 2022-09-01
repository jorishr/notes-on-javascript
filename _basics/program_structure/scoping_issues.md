# Scoping issues
## Hoisting example
```js
var num = 4;
function outer(){
	console.log(num);
	var num = 2;
	function inner(){
		console.log(num);
		num++
		console.log(num);
		var num = 3;
		console.log(num);
	}
	inner();
}
outer()
//	-> undefined 
//	-> undefined 
//	-> NaN
//	-> 3
```
In the outer function scope the num variable gets hoisted and initialized as undefined, its value is assigned after the console.log is called.

In the first inner log the same thing happens, the variable `num = 3` gets hoisted and initialized as undefined

The second inner log is NaN because the variable is still initialized as undefined and undefined + 1 = NaN

Only in the final inner log do we have a number value assigned.

### Closure example
Considere the output, how can closures help?
```js
for (var i = 0; i < 5; i++) {
	setTimeout(function() { 
		console.log(i); 
	}, i * 1000 );
}
```
The code sample shown will not display the values 0, 1, 2, 3, and 4 as you might expect; rather, it will display 5, 5, 5, 5, and 5.

The reason for this is that each function executed within the loop will be executed after the entire loop has completed and all will therefore reference the last value stored in i, which was 5.

Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each unique value of the variable within its scope, as follows:
```js
for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() {
			console.log(i);
		}, x * 1000 );
    })(i);
}

//or use LET
for (let i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(i); 
	}, i * 1000 );
}
```