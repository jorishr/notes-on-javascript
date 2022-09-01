/*
##################################
HIGHER ORDER ARRAY METHODS: FILTER
######################################################
I.    MANUAL FILTER METHOD
II.   FILTER BASED ON CHARACTERS 
III.  FILTER NUMBERS DIVISIBLE BY 3
IV.   FILTER OBJECTS THAT CONTAIN A CERTAIN PROPERTY
V.    SEARCH FOR VALUE IN ARRAY
VI.   FILTER WITH OBJECT PROPERTY IN ARRAY OF OBJECTS
VII.  REMOVE CHARACTERS FROM A STRING
VIII. DOUBLE THE ODDS NUMBER IN AN ARRAY


IX.   EJS CHAPTER V: FILTER AND REDUCE
X.    EJS CHAPTER V: FILTER AND MAP
XI.   EJS CHAPTER V: FILTER DATASET
######################################################


########################
I.  MANUAL FILTER METHOD
########################*/

function myFilter(arr, callBackFn){
	newArr = [];
	for(let i = 0; i < arr.length; i++){
		if(callBackFn(arr[i], i, arr)){
			newArr.push(arr[i])
		}
	}
	return newArr;
}
/*
NOTE: thus only if the callBackFn returns true, the if statement is executed.
If false, next iteration in the for loop.


##############################
II. FILTER BASED ON CHARACTERS 
############################## 

Filter out the first name property values that have more than 4 characters 
from an array of objects.*/

function filterLongFirstNames(arr){
  return arr.filter(function(value, index, array){
    return value.firstName.length > 4;
  })
}
filterLongFirstNames([{firstName: "Joris"}, {firstName: "Jan"}, {firstName: "Eric"}]);
// -> [{name: "Joris"}]

/*
###################################
III.  FILTER NUMBERS DIVISIBLE BY 3
###################################

Find and return all numbers from an array that are divisible by 3.*/
function divisibleByThree(arr){
  return arr.filter(function(value){
    return value % 3 === 0;
  });
}
divisibleByThree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// -> [3, 6, 9]


/*
##################################################
IV. FILTER OBJECTS THAT CONTAIN A CERTAIN PROPERTY
##################################################

Write a function called filterByValue which accepts an array of objects and 
a key and returns a new array with all the objects that contain that key.*/

function filterByValue(arr, key){
  return arr.filter(function(valueObject){
    return (key in valueObject)
  });
}
// OR if a property is present in an object this means it is NOT undefined

function filterByValue(arr, key){
  return arr.filter(function(valueObject){
    return valueObject[key] !== undefined;
  });
}

filterByValue([{first: 'Elie', last:"Schoppik"}, 
  {first: 'Tim', last:"Garcia", isCatOwner: true}, 
    {first: 'Matt', last:"Lane"}, 
      {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') 
/*
//-> [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]


/*
#############################
V.  SEARCH FOR VALUE IN ARRAY
#############################

Write a function called find which accepts an array and a value and 
returns (only) the first element in the array that has the same value as the second
parameter or undefined if the value is not found in the array.*/

function find(arr, Searchparameter){
  return arr.filter(function(value, index, array){
    return value === Searchparameter;
  });
}
find([1,2,3,4,5], 3) // -> [3]
/*
The above works but returns an empty [] when there is no searchParameter 
found. AND it if there is more than one value that equals the parameter
than this will be included into the new array:*/

find([1,2,3,4,5,3,3], 3) // -> [3, 3, 3]
/*
the fix: arr.filter(callBackFn)[0], we only return the first index position
that results from the filter method.*/

function find(arr, Searchparameter){
  return arr.filter(function(value, index, array){
    return value === Searchparameter;
  })[0];
}
find([1,2,3,4,5], 10) // undefined


/*
###################################################
VI. FILTER WITH OBJECT PROPERTY IN ARRAY OF OBJECTS
###################################################

Write a function called findInObj which accepts an array of objects, a key, 
and some value to search for and returns the first found value in the array.*/

function find(arr, key, searchValue){
  return arr.filter(function(valueObject){
    return valueObject[key] === searchValue;
  })[0];
}

findInObj([{first: 'Elie', last:"Schoppik"}, 
  {first: 'Tim', last:"Garcia", isCatOwner: true}, 
    {first: 'Matt', last:"Lane"}, 
      {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) 

//-> {first: 'Tim', last:"Garcia", isCatOwner: true}

/*

#####################################
VII.  REMOVE CHARACTERS FROM A STRING
##################################### 

Write a function called removeVowels which accepts a string and returns a 
new string with all of the vowels (both uppercase and lowercase) removed. 
Every character in the new string should be lowercased.*/

function removeVowels(string){
  var stringArray = string.toLowerCase().split("");
  var vowels = "aeoui"
  return stringArray.filter(function(value){
    return vowels.indexOf(value) === -1;  
  }).join("");
}
/* only withhold those values that are not vowels, thus for those that 
indexOf = -1
The above returns an array, not a string. Thus you have to add .join("") method
*/
removeVowels("Hello World, Merry Christmass")
// -> "hll wrld, mrry chrstmss"

// OR refactor with one step less:
function removeVowels(string){
  var vowels = "aeoui";
  return string.toLowerCase().split("").filter(function(value){
    return vowels.indexOf(value) === -1;
  }).join("");
} 


/*
########################################
VIII. DOUBLE THE ODDS NUMBER IN AN ARRAY
########################################

Write a function called doubleOddNumbers which accepts an array and returns 
a new array with all of the odd numbers doubled (HINT - you can use map and
filter to double and then filter the odd numbers).*/

function doubleOddNumbers(arr){
  return arr.filter(function(value){
    return value % 2 !== 0;
  }).map(function(value){
    return value * 2;
  })
}
doubleOddNumbers([1,2,3,4,5]) // [2,6,10]
doubleOddNumbers([4,4,4,4,4]) // []
/*
Steps: - filter for the odd numbers, modulo 2 not 0.
       - map the resulting array and multiply the numbers

BONUS 
Write a function that doubles the values of an existing array but only 
returns the doubled values that are divisible by 3.*/

function doubleFilter(arr){
  return arr.map(function(value){
    return value * 2;
  }).filter(function(value){
    return value % 3 === 0;
  })
}
doubleFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// -> [6, 12, 18]

//REFACTOR PART ONE
function doubleFilter(arr){
  return arr.map(value => value * 2).filter(val => val % 3 === 0);
}
//REFACTOR PART TWO
var doubleFilter = arr => arr.map(value => value * 2).filter(val => val % 3 === 0);



/*
####################################
IX. EJS CHAPTER V: FILTER AND REDUCE
####################################

Write a function that computes the dominant writing direction in a string of text. 
Remember that each script object has a direction property that can be "ltr" 
(left to right), "rtl" (right to left), or "ttb" (top to bottom).

CRUCIAL:
The dominant direction is the direction of a majority of the characters that have 
a script associated with them. 
NOTE: Thus you have to count characters that have an associated script and compare:
if all scripts are ltr, it is easy, if writing direction is different you have to
compare for which script has the most characters.

The characterScript and countBy functions defined 
earlier in the chapter are probably useful here.
*/

function dominantDirection(text) {
  // Your code here.
}
/*
You again have to count characters by a criterion based on characterScript and 
then filter out the part of the result that refers to uninteresting (script-less) 
characters.

Finding the direction with the highest character count can be done with reduce.
*/

function dominantDirection(text) {
    let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none"; //this line the only difference
    }).filter(({name}) => name != "none");
  
    if (counted.length == 0) return "ltr"; 
  
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}
/*
the objects in the array counted have two properties: 
.name and .count 
.name refers to the direction property from the original array objects
and can be "ltr", "rtl" or "ttb"
a.count and b.count refer to the object property count and hold the number of
characters that belong to each script that was found in the text string by the
countBy function
*/
console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl


/*
######################################
X.  ELOQUENT CHAPTER V: FILTER AND MAP
######################################

Filtering the right to left scripts and store them in a binding with .filter
method*/

scripts.filter(script => script.direction == "rtl");
rtlScripts = scripts.filter(script => script.direction == "rtl");
  
map(rtlScripts, x => x.name) // OR rltScripts.map(function(valueObject){return valueObject.name})
// -> ["Adlam", "Arabic", "Imperial Aramaic", …]
	
//NOTE: the manual version would look like this:
function map(array, transform){
  let mapped = [];
  for(let element of array){
    mapped.push(transform(element));
  }
  return mapped;
}
/*
You basically push into the new array a performance of the transform function 
on each element of the array. That transform function becomes clear once you 
call the map function: map(array, x => x.name)  


#########################################
XI. ELOQUENT JS CHAPTER V: FILTER DATASET
#########################################

Dataset with info about scripts in use is stored as an array of objects:
[{
 name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
 link: https://en.wikipedia.org/wiki/Coptic_alphabet"
},
{},{},...]

Now filter out only the living scripts:*/

scripts.filter(x => x.living) 
// OR
scripts.filter(function(value){return value.living}) 

/*
This statement is not an evaluation because this property hold a bolean value 

NOTE: the x argument in the anon callback function takes on the script array 
objects inside, looks up the living property and if true this object is added 
to the array being build by the filter function.

Similar: filter out only the scripts that read "top to bottom" (ttb)*/

scripts.filter(x => x.direction == "ttb");

// A manual version for the above would be:
function filter(array, testFn){
  let living = [];
  for(let element of array){  
    if(testFn(element)){
      living.push(element);
    }
  }
  return living;
}
// Call the function:
filter(scripts, x => x.living)
// OR
scripts.filter(function(value){
  return value.living;
}); 
// -> [{},{},{}]	