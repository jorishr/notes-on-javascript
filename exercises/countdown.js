/* 
#################
III.    COUNTDOWN
#################

Implement a function called countDown that accepts a time in seconds. 
The function will print the time remain to the console every second. 
Instead of printing 0, the function should print "Ring Ring Ring!!!".

LOGIC 
- function that takes one parameter: a number 
- print every second: call a function every second with SetInterval
- each time the function is called you subtract one unit from the 
parameter number
- as long as remaining time > 0 print the remaining time
- else: print "Ring Ring Ring"
- clear the interval once 0 is reach, thus inside the else statement!
*/
function countDown(time){
    var intervalId = setInterval(function(){
    //  time = time - 1; Thus you modify the parameter
    time--;        
    if(time > 0){
        console.log(time);
    } else{
        console.log("Ring Ring Ring")
        clearInterval(intervalId);
    }
    } , 1000);
};
countDown(5) // -> 4, 3, 2, 1, Ring Ring Ring

/* 
NOTE: important difference with the previous exercise is that here
you modify the parameter, not a tracking variable!

Thus time on the first call starts at 5 and is modified to 4

Second call starts at 4 and is modified to 3, etc...

Remember that parameters are binding as well, thus they can be modified. 
*/