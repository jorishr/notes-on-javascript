/*
###########################################
HIGHER ORDER ARRAY METHODS: FOREACH AND MAP
#########################################################
I.    MANUAL MAP
II.   HALF/DOUBLE THE VALUES OF AN ARRAY
III.  FILTER SPECIFIC ARRAY
IV.   SHOW INDEX POSITION VALUE
V.    ADD PROPERTIES TO OBJECTS INSIDE ARRAY
VI.   VOWEL COUNT !!!
VII.  RETURN OBJECT PROPERTY FROM AN ARRAY OF OBJECTS^
VIII. VALUE MULTIPLIED BY ITS ARRAY INDEX POSITION NUMBER
#########################################################

##############
I.  MANUAL MAP
##############

Manual version of .map:
*/
function myMap(arr, callBackFn){
	var newArr = [];
	for(let i = 0; i < arr.length; i++){
		newArr.push(callBackFn(arr[i], i, arr))
	}
	return newArr
}
/* 
Inside the for loop you for each element of the array you push to the newArr, 
the result of the callBackFn that you called on each respective element of the 
original array. To get that result you invoke that function with the 
parameters: value(arr[i]), index(i) and array(arr), just as with the manual 
.forEach.

If you need a new array of the same length, better use .map over .forEach.*/


/* 
######################################
II. HALF/DOUBLE THE VALUES OF AN ARRAY
######################################

Write a function that takes an array and return a new array with values of the 
original array divided by two / doubled.*/

function halveValues(array){
  var newArray = []
  array.forEach(function(value){
      newArray.push(value / 2);
  })
  return newArray
} 
halveValues([2, 3, 4, 6, 0, 22]);

//using .map method
arr.map((val) => val / 2);
arr.map((val) => val * 2);


/*
###########################
III.  FILTER SPECIFIC ARRAY
###########################

Write a function called onlyEvenValues which accepts an array and returns a 
new array with only the even values in the array passed to the function.

Examples:

onlyEvenValues([1,2,3])       //-> [2]
onlyEvenValues([5,1,2,3,10])  //-> [2,10]
*/

function onlyEvenValues(arr){
  var evenArr = [];
  arr.forEach(function(value){
    if(value % 2 === 0){
      evenArr.push(value);
    }
  });
  return evenArr;
}
onlyEvenValues([2, 10, 33, 11, 1]);

//WITH FILTER METHOD
arr.filter(val => val % 2 === 0); 

/*
#############################
IV. SHOW INDEX POSITION VALUE
#############################

Write a function called showFirstAndLast which accepts an array of strings 
and returns a new array with only the first and last character of each string.

Examples:
showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']*/

function showFirstAndLast(arr){
  var newArr = [];
  arr.forEach(function(value){
    newArr.push(value[0] + value[value.length -1])
  })
  return newArr;
}
showFirstAndLast(["Joris", "Sara"]) // ["Js", "Sa"]

/*
##########################################
V.  ADD PROPERTIES TO OBJECTS INSIDE ARRAY
##########################################

Write a function called addKeyAndValue which accepts an array of objects, a key, 
and a value and returns the array passed to the function with the new key and 
value added for each object.

Examples: addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, 
                          {name: 'Colt'}], 'title', 'instructor') 
[{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, 
  {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]
*/
function addKeyAndValue(arr, key, value){
  arr.forEach(function(valueObject){
    valueObject[key] = value;
  })
  return arr;
}
addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
/*NOTE: you could use valueObject.key but than you add a property called key. 
By using [key] the parameter key is evaluated.



###################
VI. VOWEL COUNT !!!
###################

Write a function called vowelCount which accepts a string and returns an 
object with the keys as the vowel and the values as the number of times 
the vowel appears in the string. This function should be case insensitive 
so a lowercase letter and uppercase letter should count
Examples:
vowelCount('Elie')  //-> {e:2,i:1};
vowelCount('Tim')   //-> {i:1};
vowelCount('Matt')  //-> {a:1})
vowelCount('hmmm')  //-> {};
vowelCount('I Am awesome and so are you') //-> {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(string){
  var splitString = string.split("");
  var obj = {};
  var vowels = "aeoui";
  
  splitString.forEach(function(val){ // value of the array, thus characters of the original string
    if(vowels.indexOf(val.lowercase()) !== -1){
      if(val in obj){ // you have to check first if the property(a particular vowel is already present in the object)
        obj[val] = obj[val] + 1 // or shorter: obj[value]++
      } else {
        obj[val] = 1; // create a new property and set the value to 1
      }
    }
  })
}
/*
NOTES:
- STRING TO ARRAY: make an array using the .split string method. This creates 
an array that holds all the characters of the string: string.split("");
- now you can use .forEach to loop over those characters one by one and 
evaluate them
- you need a control variable: the vowels. vowels = "aeoui"
- to evaluate if a character is present in an array or string you can use
 indexOf() === -1 (not present) OR !== -1 (present)
- to check for uppercase/lowecase, you have to convert all characters into
lowercase
- you need to construct an object  
Note: again note that we use obj[val] to have JS evaluate the value parameter


#####################################################
VII.  RETURN OBJECT PROPERTY FROM AN ARRAY OF OBJECTS
#####################################################
*/
function onlyFirstName(arr){
  return arr.map(function(value){
    return value.firstName;
  })
}
onlyFirstName([{firstName: "Joris"}, {firstName: "Eddy"}, {firstName: "Eric"}]) 
// ["Joris", "Eddy", "Eric"]


/*
#########################################################
VIII. VALUE MULTIPLIED BY ITS ARRAY INDEX POSITION NUMBER
#########################################################

Write a function called valTimesIndex which accepts an array and returns a new 
array with each value multiplied by the index it is currently at in the array.

Examples:
   valTimesIndex([1,2,3])     //-> [0,2,6]
   valTimesIndex([1,-2,-3])   //-> [0,-2,-6]
*/
function valTimesIndex(arr){
  return arr.map(function(value, index){
    return value * index; 
  })
}
valTimesIndex([1, 2, 3, 4]);

/*
################################################
IX. EXTRACT PROPERTY VALUE FROM ARRAY OF OBJECTS
################################################ 

Write a function called extractKey which accepts an array of objects and some 
key and returns a new array with the value of that key in each object.
*/
function extractKey(arr, key){
  return arr.map(function(valueObject){
    return valueObject[key];
  });
}
extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') 
// "name" is the key parameter
// -> ['Elie', 'Tim', 'Matt', 'Colt']


/*

#########################################################################
X.  EXTRACT TWO OBJECT PROPERTIES (FROM ARRAY OF OBJECTS) AND CONCATENATE
#########################################################################

Write a function called extractFullName which accepts an array of objects 
and returns a new array with the value of the key with a name of "first" 
and the value of a key with the name of "last" in each object, concatenated
together with a space.

IMPORTANT NOTE: The difference with the exercise above is that we DO NOT have
to evaluate a key/property. That property name is given and thus the function
is simpler.*/

function extractFullName(arr){
  return arr.map(function(valueObject){
    return valueObject.first + " " + valueObject.last
  });
}
extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, 
  {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) 
// -> ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']

// Using string interpellation:
function extractFullName(arr){
  return arr.map(function(valueObject){
    return `${valueObject.first} ${valueObject.last}`
  });
}