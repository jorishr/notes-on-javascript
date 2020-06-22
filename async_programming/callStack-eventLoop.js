//  CALL STACK + EVENT LOOP RUNTHROUGH

function square(n){
    return n * n;
};

setTimeout(function(){
    console.log("Hello");
}, 0);

console.log(square(2));

/*  CALLSTACK 
    How the computer operates.

    1. main: function
    2. setTimeout --push
    3. function(){console.log()} into to the queue
    4. setTimout --pop
    5. last line: square(2) --push
    6. return n*n --push 
    7. return n*n --pop
    8. square(2) --pop
    9. console.log --push CONSOLE: // -> 4
    10. console.log --pop
    11. main: function --pop CALL STACK EMPTY
    12. EVENT LOOP checks the queue and finds CB FN with console.log("Hello") in first place
    13. CBFn + console.log --push to stack CONSOLE: // "Hello" 14. console.log --pop, CBFn --pop
    PROGRAM DONE.


II- STACK OVERFLOW
The following example may cause a stack overflow if the number of items is very large. 
Rewrite the code to prevent that.
*/
(function(){
var list = new Array(10000000).fill(true)

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item and call the next one
		console.log(item);
		nextListItem()
    }
};
nextListItem()
})()
//becomes
(function(){
var list = new Array(10000000).fill(true)

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item and call the next one
		console.log(item);
		setTimeout(nextListItem, 0)
    }
};
nextListItem()
})()
/*
The stack overflow is now eliminated because the EVENT LOOP gets to handle the
recursion, not the call stack. The nexListItem function inside the setTimeout
is pushed to the EVENT QUEUE while the function exists so that the stack can 
clear.
*/