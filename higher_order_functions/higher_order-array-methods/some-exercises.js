/* 
################################
HIGHER ORDER ARRAY METHODS: SOME
################################################
I.    MANUAL SOME FUNCTION
II.   AT LEAST ONE EVEN/ODD NUMBER IN ARRAY?
III.  DOES THE STRING HOLD A SPECIFIC CHARACTER?
IV.   DOES THE NUMBER HAS A ZERO IN IT?
################################################

########################
I.  MANUAL SOME FUNCTION
########################*/
function mySome(arr, callBackFn){
	for(let i = 0; i < arr.length; i++){
		if(callBackFn(arr[i], i, arr)){
			return true;
		}
	}
	return false;
}			
/* 
Thus if the for loops finds a value for which the callbackfn is true, the loop
stops and returns true. If the loops goes through the entire array without 
finding a value for which the callbackfn is true, we return false.


##########################################
II. AT LEAST ONE EVEN/ODD NUMBER IN ARRAY?
##########################################*/

function hasEvenNumber(arr){
  return arr.some(function(value){
    return value % 2 === 0;
  });
}
hasEvenNumber([2, 3, 5]) // -> true
hasEvenNumber([1, 3, 5]) // -> false

function hasOddNumber(arr){
  return arr.some(function(value){
    return value % 2 !== 0;
  });
}
hasOddNumber([1,2,2,2,2,2,4]) // true
hasOddNumber([2,2,2,2,2,4]) // false


/*
################################################
III.  DOES THE STRING HOLD A SPECIFIC CHARACTER?
################################################*/
function hasComma(string){
  return string.split("").some(function(value){
    return value === ",";
  });
}
hasComma("Hello, World!") // -> true
hasComma("Hello World!") // -> false


/*
#####################################
IV. DOES THE NUMBER HAS A ZERO IN IT?
#####################################

Write a function called hasAZero which accepts a number and returns true if 
that number contains at least one zero. 

Otherwise, the function should return false.*/
function hasZero(number){
  return number.toString().split("").some(function(value){
    return value === "0";
  })
}
hasZero(1002); // -> true
hasZero(1112); // -> false
/* 
Numbers cannot be converted directly to an array but:
- step one: convert number to string -> .toString()
- two: split("") into ARRAY OF STRINGS.
- when comparing the value USE STRING "0", NOT 0.
*/ 