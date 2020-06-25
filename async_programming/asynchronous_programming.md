# Asynchronous programming
Table of contents
- [Asynchronous programming](#asynchronous-programming)
	- [About asynchronicity](#about-asynchronicity)
		- [Synchronous code](#synchronous-code)
		- [Asynchronous code](#asynchronous-code)
			- [The challenges](#the-challenges)
	- [The call stack and the heap](#the-call-stack-and-the-heap)
		- [Stack](#stack)
		- [The heap](#the-heap)
	- [The queue and the event loop](#the-queue-and-the-event-loop)
		- [The event loop](#the-event-loop)
		- [The queue](#the-queue)
		- [Never blocking](#never-blocking)

## About asynchronicity 
### Synchronous code
When code is synchronous, the program cannot continue untill the function that was called has returned its result. For example, a second network request can only be made once the first request has returned a result. This means that while you wait for a network request to yield a result, the processor is sitting idle, slowing down your program.

In a synchronous environment the solution would be to open another processing thread of control (mulit-threaded processing). A second thread could start the second request, and then both threads wait for their results to come back, after which they resynchronize to combine their results.

### Asynchronous code
In the asynchronous model, starting a network action conceptually causes a split in the timeline. The program that initiated the action continues running, and the network action happens alongside it, notifying the program when it is finished.

Asynchronous code allows thus for multiple actions to run at the same time. Both of the two important JavaScript programming platforms, browsers and NodeJs- make operations that might take a while asynchronous rather than relying on extra threads (JS is single threaded and synchronous by default).

Thus when a result is returned, the program is informed and gets access to the result. This asychronicity is great for the browser: while you wait for network request to return something -load an image, for example-, the Javascript code can continue and run an event listener to catch click events. 

#### The challenges
Asynchronicity cuts both ways: it makes it easier to express programs that do not follow the straight line model of control, but it also makes it more problematic to write programs that do explicitely require a straight line model of execution.

When working with database operations, for example, you want certain tasks to be completed before you go on to run the next task. This poses a challenge when writing your code because both the browser and NodeJs will treat the action that takes a while as asynchronous, and we want to treat them as synchronous actions in our code.

In other words, under the asychronous model we have to make waiting for an action to complete EXPLICIT. While in a synchronous environment the waiting for tasks to complete is implied by default.

The solutions JS offers for this problem are: callback functions (with the potential for 'callback hell' or multiple nested callbacks) and in modern JS: promises and async/await.

## The call stack and the heap
### Stack
The stack or call stack is an ordered datastructure that is part of the JS runtime and that keeps track of the function calls that are made in a program. Thus each time a point in the code is reached where a function is called the info and position of that function is pushed to the top of the call stack. Once the function has returned it is popped off the call stack and the program knows where to resume the program. A stack is LIFO: last in first out.
```
push(a)
push(b)
push(c)

pop()	-> c
pop()	-> b
pop()	-> a

//example: 
LINE 1 	function multiply(a, b){
LINE 2 	return a * b
LINE 3 	}
LINE 4 	multiply(2, 4);
```
The stack is as follows:
- the program finds on line 4 that multiply has to be invoked, thus the info of this function is pushed to the top of the stack as a STACK FRAME. Each stack frame contains essential info: the function that was called, its parameters and the current line number.
- to actually run the multiply function the program has to go back to line 2 to know what to do. Thus line 2 is now pushed on top of the call stack as well in a new stack frame
- next: the result of line 2 returns, and line 2 is popped off the stack
- the main program returns to line 4, returns the result of the invoked function and pops off multiply(2, 4) from the stack. 

### The heap
The HEAP is an area in the computers memory where our JS data is stored. For example, when we create a binding the actual object (the key-value pairs) is created in the HEAP and the name 'obj' is a reference to the object inside the heap. 
```js 
var obj = {
	property: value, 
	key: value
}
```
You can have multiple references to the same object/array or info in the heap. This does not create copies of the actual data in the heap, it merely creates copies of the reference to that data: 
```js
var referenceCopy = obj;
var objTwo = obj;
```

## The queue and the event loop
### The event loop
Moving events from the task queue to 
the call stack done by the the event loop. The event loop is a JS runtime functionality that checks the QUEUE when the stack is empty. When the call stack is empty, the function in the front of the queue is passed on top of the empty call stack.

Thus, when a setTimeout/interval is set at 0 seconds it DOES NOT happen immediately. It is pushed to the queue and only passes to the call stack once the call stack is empty.

Thus `setTimeout(function(){}, 1000)` takes the callback function and puts into the queue, while setTimeout() itself is on top of the call stack. Once the cbFn is placed in the queue, the setTimout is popped of the call stack and the call stack is empty. Only then will the EVENT LOOP check the queue and transfer the first function to the call stack.

JS is single threaded language, which means that code execution is linear and thus cannot be interrupted by something else that may be going on in the program.

### The queue 
A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function which gets called in order to handle the message. At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use.

The processing of functions continues until the stack is once again empty. Then, the event loop will process the next message in the queue (if there is one). The queue is FIFO: first in, first out:
```
enqueu(a)
enqueu(b)
enqueu(c)

dequeu()	-> a
dequeu()	-> b
dequeu()	-> c
```

### Never blocking
A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or an XHR request to return, it can still process other things like user input.