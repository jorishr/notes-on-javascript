# Loops
Table of contents
- [Loops](#loops)
	- [While and Do loops](#while-and-do-loops)
	- [For loops](#for-loops)
	- [Loop with an unknown endpoint](#loop-with-an-unknown-endpoint)

## While and Do loops  
A loop is a form of control flow that let's you run a piece of code multiple times. You can go back to some point in the program and repeat it with the current or updated state of the program.

A WHILE loop is comparable to an IF statement BUT instead of running the code block once, it keeps repeating the code as long as the condition is true: `while (condition){code block};`

A DO loop is similar to a while loop but they always execute the `{code block}` AT LEAST ONE TIME and TEST for the CONDITION only AFTER THE FIRST RUN, not at the beginning. 
```
do {code block}
while (condition);
```
## For loops
The for-loop is usually shorter than the while or do loop because the statements and expressions for creating the binding, checking the condition and updating the binding are grouped together: `for(init; condition; step){}`.

The loop pattern is always the same: 
- Create a counter binding that tracks the progress of the loop. This binding has a local scope, so is it has no meaning outside the loop.
- Test expression that checks whether the loop should continue or not. For a string that would be `str.length`, for example.
- The counter binding is updated at the end of each loop: a normal loop increases the step by one unit (`i++`), but you can use other numbers and math operations: `i + 2;`  or `i * 2;`. 

A backward loop over a string starts at `str.length - 1;` and runs as long as `i > 0;` with `i--` after each loop.

If you omit the checking condition of the loop, you run the risk of an infinite loop that never ends. 

## Loop with an unknown endpoint
The special keyword `break`, can be applied if you don't want to or cannot specify a specific endpoint for the loop. You omit the condition and insert a break point:
```js
for(init; step){
	if(condition){
		code;
		break;
	}
};
```