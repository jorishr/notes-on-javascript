/* SWITCH/CASE 
https://love2dev.com/blog/javascript-switch-statement/

Take the two examples: the date example + css example.
*/


// Swap two variable contents without using a temp variable. 
// It’s the standard a=a+b, b=a-b, a=a-b problem.

const i = 5
switch(i){
    case 1:
        console.log('The number is 1');
        break;
    case 2:
        console.log('The number is 2');
        break;
    default:
        console.log('The number is other');
        break;
}

const myDay = new Date();

switch (myDay.getDate()){
    case 0: 
        console.log('It is Sunday');
        break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5: 
        console.log('It is a weekday');
        break;
    case 6:
        console.log('It is Saturday');
        break;
    default:
        console.log("value is not equal to any given days");
        break;
}