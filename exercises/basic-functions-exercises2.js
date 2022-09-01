/*
#####
INDEX
##################
1.  IS EVEN
2.  FACTORIAL
3.  UPDATE STRING
4.  NUMBER PADDING
5.  CURRYING
##################

###########
1.  IS EVEN
###########

Write a function which take a single numeric argument and returns true if the
number is even, and false otherwise.
*/
function isEven(x) {
  if(x % 2 === 0){return true;}
  else {return false;}
}
isEven(11);   //-> false     
isEven(10);   //-> true
/*
NOTE: there is a shortcut here. the bolean statement (x % 2 === 0) already 
results into a boolean value. Thus you can use just: return x % 2 === 0
*/
function isEven(x) {
  return x % 2 === 0;
}

/*
#############
2.  FACTORIAL
#############

Write a function which takes a single numeric argument and returns the
factorial of that number:

factorial(4) = 4 x 3 x 2 x 1 OR 1 x 2 x 3 x 4
*/
function factorial(x) {
  if(x === 0){return 1};
  var result = 1; 
  for(var i = 1; i <= x; i++){
    result = result * i;
  }
  return result;
}
factorial(7);   
/*  
NOTE: 0! = 1
LOOP:
result = 1 x 1  -> this is redundant, you can start with i = 2 
result = 1 x 2
result = 2 x 3
result = 6 x 4
result = 24 x 5
result = 120 x 6
result = 720 x 7
result = 5040

REVERSE LOOP
*/
function factorialReverse(x){
  if(x === 0){return 1};
  let result = 1;
  for(let i = x; i > 0; i--){
    result = result * i;
  };
  return result;
}
/*
LOOP
result: 1 x 7 -> redundant, you can set result = x to start with and let i = x-1
result: 7 x 6
result: 42 x 5
result: 210 x 4
result: 840 x 3
result: 2520 x 2
result: 5040 x 1
result: 5040  -> redundant, you can stop at i > 1
*/

/*
######################
3.  INGREDIENT UPDATES
######################
The unit is updated to plural if the amount is more than one, 
thus spoon becomes spoons. 
*/
const ingredient = function(amount, unit, name){
    if (amount > 1){
        unit += "s";
    }
    console.log(`${amount} ${unit} of ${name}`);
}
ingredient(5, "tablespoon", "olive oil")
//-> "5 tablespoons of olive oil"


/*
##################
4.  NUMBER PADDING
##################
Add 0 padding to numbers so they always appear in the same 000 STRING FORMAT.
You cannot convert it back to a Number() because that would strip the 00 values.
*/
function zeroPad(number, width){ 
	let string = String(number);
	while(string.length < width){
			string = "0" + string;
	} 
	return string;
}

zeroPad(12, 3);   //-> "012"
zeroPad(2, 3);    //-> "002"

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)}`);
  console.log(`${zeroPad(chickens, 3)}`);
  console.log(`${zeroPad(pigs, 3)}`);
}
printFarmInventory(7, 16, 3); 

//->  007, 016, 003

/*
The number parameter is the number you want to re-write in the given format, 
width indicates the format. When you call the function with the numbers, 
the parameters cows, chickens and pigs become bindings that hold the number 
value you called the function with (7, 16, 3).


############
5.  CURRYING
############

Given:
fn(1)(2)(3)   //-> 9
fn(2)(2)(1)   //-> 4
fn(2,2,1)     //-> 4
fn()          //-> 0

Write a function that can produce the above outcomes.
*/
function sumMultiply(a, b, c){
  if(a && b && c){
    return (a+b) * c;
  } else if(a && b){
    return (val) => (a + b) * val;
  } else if(a){
    return (val1) => (val2) => (a + val1) * val2
  } else if(!a && !b && !c){
    return 0;
  }
}

sumMultiply(1)(2)(3)    //-> 9
sumMultiply(2)(2)(1)    //-> 4
sumMultiply(2,2,1)      //-> 4
sumMultiply();          //-> 0