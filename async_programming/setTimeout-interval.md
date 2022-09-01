# setTimeout and setInterval
## SetTimeout
The setTimeout function calls a callback function after a delay of x milliseconds.
```js
//setTimeout(cb, delay);

var delay = 1000;
function sayHello(){
    console.log("hello");
};

setTimeout(sayHello, 1000);

//as anonymous function:
setTimeout(function(){
    console.log("hello");
    }, 1000)
);
```
Consider the output of the following example:
```js
let arr = [5, 120, 15, 20];
for(let i = 0; i < arr.length; i++){
    setTimeout(() => console.log(`Index: ${i} , element: ${arr[i]}`), arr[i])
}
/*
-> In each loop a setTimeout is set with different delays. Thus the log are 
put out in a different order:

0_5
2_15
3_20
1_120
*/
```
## SetInterval
Continuously calls a function at every x ms.
```js
//setTimeinterval(cb, interval) 

var num = 0;
function logNum(){
    num = num + 1; 
    console.log(num);
}

setInterval(logNum, 1000);
```
Note the importance of scope: If you declare the num var inside the setInterval anonymous function that binding is only visible inside that block and thus starts from zero on each new call. If you declare it as a global binding, the function updates it on each call. And each new call has its own scope and accesses the global binding.   

### Clear timeout/interval
Before returning the result of the function, you also get a timerID in the console, a number that can be used to clear the timeout if needed. In order to successfully clear intervals and timeouts, you actually need to assign the timeout or interval to a variable (that is the timerId). You can then use that variable as a parameter to clearInterval and clearTimeout. 
```js
var timerId = setTimeout(cb, delay);
var timerId = setTimeInterval(cb, interval);

clearTimeout(timerID);

//This is not very practical for setTimeout, but possible. If you set a clearTimeout the original timeout delay will not apply.
```