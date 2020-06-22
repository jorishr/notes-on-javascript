/*
#####################
MATH RELATED PROBLEMS
##################################################
I.	    GENERATE A RANDOM POSITIVE INTEGER NUMBER
II.     FIND MAX NUM IN ARR
III.	REPLICATE Math.min
IV.     FIND HIGHEST/LOWEST NUMBER VALUES WITH ...
V.      COUNT THE NUMBER OF MAX/MIN VALUES IN ARR
VI.     LOGARITMIC FUNCTION
##################################################


#############################################
I.	GENERATE A RANDOM POSITIVE INTEGER NUMBER
#############################################
*/
let randomNum = Math.round(Math.random());	
//-> always rounded to either 0 or 1.

var numm = Math.round(10*Math.random());
//-> rounded to a positive integer number between 0 and 10 

/*
Note: if you don't multiply by 10 .floor will always be 0 and .ceil will 
always be 1. 

Thus what you get is 			
	0       	* 10 = 0;
	0,222343... * 10 = 2; 
	0,366443... * 10 = 4; 
	0,982343... * 10 = 10;
	
Math.random kan 0 zijn maar niet 1. Met Math.round() kan je wel 10 krijgen als
wanneer 0,9501 wordt afgerond naar BOVEN.

Gebruik je Math.floor() hou er dan rekening mee dat dit naar ONDER afrond. Dus 
als je een nummer wil tussen 0 en 10 dan moet + 1 toevoegen!
*/
Math.floor(Math.Random() * 10 + 1);	


/*
#######################
II. FIND MAX NUM IN ARR
#######################
*/
let arr = [1,2,3,5,5]

var max = Math.max(...arr);

MATH.max(...arr)  	//-> 5
MATH.min(...arr)  	//-> 1
//or 

function getMaxOfArray(arr) {
  return Math.max.apply(null, arr);
}

//or

var arr = [1,2,3];
var max = arr.reduce(function(a, b) {
    return Math.max(a, b);
});


/*
##########################
III.	REPLICATE Math.min
##########################

Write a function that takes two arguments and returns the lowest value.
*/
function min(a, b){
    if (a < b){
        return a;
    } else {
        return b;
    }
}
min (0, 10);	//-> 0
min (0, -10);	//-> -10

/*
##############################################
IV. FIND HIGHEST/LOWEST NUMBER VALUES WITH ...
##############################################
*/
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
max(4, 1, 9, -2);	//-> 9
/*
NOTES: 
- when calling the function the arguments (4, 1, 9, -2) are converted into an
array because of the ... rest parameter. 
- the for loop goes over the array
- the result starts at -Infinity as it is the lowest possible number 
- the number tracking binding tracks the numbers[i], thus numbers[0] = 4; 
numbers[1] = 1, etc...
- the if statement compares the tracking binding value to the result binding
and updates if true. If false the value of the result binding remains unchanged.
- return the result.

LOWEST
*/
function min(...numbers){
	let result = Infinity;
	for(let tracker of numbers){
		if(tracker < result){
			result = tracker;
		}
	}
	return result;
}
min(4, 1, 9, -2);	//-> -2

/*
#############################################
V.  COUNT THE NUMBER OF MAX/MIN VALUES IN ARR
#############################################
*/
function countMax(arr){
	let count = 0;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === Math.max(...arr)){
			count++;
		}
	}
	return count;
}

/*
#######################
VI. LOGARITMIC FUNCTION
#######################
*/
function integerLength(num){
  return Math.floor(Math.log10(num))+1
}
