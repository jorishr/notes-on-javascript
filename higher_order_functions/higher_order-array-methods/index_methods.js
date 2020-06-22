/*
#############
INDEX METHODS
##########################################
I.      INDEXOF / LAST INDEXOF
II.     FIND NUMBER AT A POSITION IN AN ARRAY
III.    FIND() AND FINDINDEX()
##########################################


###############################
I.  INDEXOF() AND LASTINDEXOF()
###############################

.indexOf() and .lastIndexOf() search a string or array and return the position
at which the value can be found

If there are identical items, .indexOf returns only the position of the FIRST
item it finds in the array. LastindexOf returns the last position at which it
is found.

If the item is not present inside the array the RETURN value is: -1
*/
let array = [2, 3, 5, 7, 9, 7];
array.indexOf(7)        // -> 3
array.indexOf(7, 1)     // -> 3, starts search at position 1 instead of 0 (default)

array.lastIndexOf(7);   // -> 5

/*
#########################################
II. FIND NUMBER AT A POSITION IN AN ARRAY
#########################################
"What's the number after F in hexadecimal?"

Thus find the index position of F and log or return the next index position
*/
function logFplusOne(str){
    return str[(str.indexOf("F") + 1)];
};

logFplusOne("#233F2");  //-> 2

//with extra step
function logFplusOne(string){
    iPos = string.indexOf("F");
    return string[(iPos + 1)];
}

/*
##############################
III.    FIND() AND FINDINDEX()
##############################

Find() returns the value for which a condition is true.
Find() returns undefined if no match is found.

arr.find(fn(val){condition});

FindIndex is similar to find() but instead of returning the first value for 
which the condition is true, it returns its index position. 

findIndex(arr, callbackFn) 
arr.findIndex(callbackFn)

FindIndex returns -1 when no matching value is found.

*/
[1, 2, 3].findIndex(function(val){return val === 3;});  // -> 2
findIndex([1,2,3], function(val){return val === 3;})    // -> 2

// - Find the index position of the first number in an array that is even/odd
arr.findIndex(function(val, i, arr){return val % 2 === 0}) // -> 1, arr[1] = 2
arr.findIndex(function(val, i, arr){return val % 2 !== 0}) // -> 0, arr[0] = 1

// - Find the index position of a string inside an array
var arrLang = ["Python", "C++", "PHP"];
arrLang.findIndex(function(val){return val === "Javascript"}) // -> -1
/* 
NOTE: When using findIndex, it does need a return statement on the 
callbackFn. If the callbackFn does not return anything, it is undefined,
thus findIndex will not find any value that returns truthy, thus will it
will always be -1 in that case.
*/

//  Manual version of findIndex

function myFindIndex(arr, callbackFn){
    for(let i = 0; i < arr.length; i++){
        if(callbackFn(arr[i], i, arr)){
            return i;
        };
    };
    return -1; // IMPORTANT: only return -1 outside of the for loop
               // Thus, only if none of the values in the array return true
};
myFindIndex([1, 2, 3], function(val){return val % 2 === 0}); // -> 1