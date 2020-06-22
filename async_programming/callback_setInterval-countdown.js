/*
######################
I.      SET INTERVAL
II.     CLEAR INTERVAL
III.    COUNTDOWN
######################


################
I.  SET INTERVAL
################

Write a function that logs a number every second. 1,2,3,4,...*/
let num = 0;
function logNum(){
    num = num + 1;
    console.log(num); 
}
setInterval(logNum, 1000);

// OR Shorter as anonymous function:
let num = 0;
setInterval(function(){
    num++;
    console.log(num);
}, 1000);

/* 
NOTE the importance of scope: 
If you declare the num var inside the setInterval anonymous function that
binding is only visible inside that block and thus starts from zero on 
each new call. 

If you declare it as a global binding, the function updates it on each 
call. And each new call has its own scope and accesses the global binding.   
 

WHAT IS THE OUTPUT OF THE FOLLOWING CODE:*/
let arr = [5, 120, 15, 20];

for(let i = 0; i < arr.length; i++){
    setTimeout(() => console.log(`Index: ${i} , element: ${arr[i]}`), arr[i])
}
/*-> In each loop a setTimeout is set with different delays. Thus the log are 
put out in a different order:

0_5
2_15
3_20
1_120

/*
#################
II. CLEARINTERVAL 
#################

Without a clearInterval the cbFn will be called every second ad infinitum. 
You can make it stop, after x ms or when a condition is met.
*/

let num = 0;
var intervalId = setInterval(function(){
    num++;
    console.log(num);
    if(num === 10){clearInterval(intervalId)}
}, 1000);


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
- each time the function is called you substract one unit from the 
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


let time = '08:03AM'

function convert(str){
    //convert the hours
    let hours = parseInt(str.split(':')[0]) + 12;    //-> 20
    //construct string
    let minutesArr = str.split(':').slice(1);
    minutesArr.unshift(hours);
    console.log(minutesArr)
    let newTime = minutesArr.toString().replace(/,/, ':');
    return newTime;
}

convert(time)   //-> '20:03AM'