/*
#####################
MATH RELATED PROBLEMS
##################################################
I.	    GENERATE A RANDOM POSITIVE INTEGER NUMBER
II.     FIND MAX NUM IN ARR
IV.     FIND HIGHEST/LOWEST NUMBER VALUES WITH ...
V.      COUNT THE NUMBER OF MAX/MIN VALUES IN ARR
VI.     LOGARITHMIC FUNCTION
##################################################



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
VI. LOGARITHMIC FUNCTION
#######################
*/
function integerLength(num){
  return Math.floor(Math.log10(num))+1
}
