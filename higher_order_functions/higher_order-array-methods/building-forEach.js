/*
#####################
I.  RECREATE FOR EACH
#####################
*/
function myForEach(array, callBackFn){
	for(let i = 0; i < array.length; i++){
		callBackFn(array[i], i, array);
	}
	return undefined
}
/*
Invoke or call the callBackFn with parameters: 
- array[i] is the value for each element in the array
- i is the index position in of that value in the array
- and array stands for the array.

The return undefined is not necessary since all functions that do not have a 
return statement will automatically return undefined.


/*
############
II. FOR EACH
############

Write a function that takes another function as an argument and executes that 
function inside of it.
*/
arr.forEach(function(val){
  console.log(val)
})

var colors = ["yellow","green", "red", "black" ];

colors.forEach(function(clr){
  document.write(clr);
})

//CUSTOM FOREACH
function myForEach(arr, fn){
  for(var i = 0; i < arr.length; i++){
    fn(arr[i]);
  }
}
myForEach(colors, alert);   
//-> calls the alert fn on each value in the colors array

/* ADD TO ARRAY.PROTOTYPE 
for this to work we have to add a method to the Array.prototype, the list of
methods that can be applied to EVERY array, using keyword this
we use the same function we wrote before but slightly adapt it by replacing
the arbitrary chosen name of the first argument (arr) to keyword this
NOTE: this will refer to the array before the dot*/

Array.prototype.myForEach = function(func){
  for(var i = 0; i < this.length; i++){
    func(this[i]);
  }
}
colors.myForEach(function(print){
  document.write(print +"<br />");
})

var presidents = ["Trump", "Jackson", "Reagan", "Monroe"];
presidents.myForEach(function(list){
  document.write(list +"<br />");
})


//  FOREACH

/*  
    Write a function that loops over an array and logs each value 
    with each value doubled, WITHOUT using forEach.
*/

function doubleValues(arr){
  for(let i = 0; i < arr.length; i++){
      console.log(arr[i] * 2);
  };
};
doubleValues([1, 2, 3]); // -> 2, 4, 6

// WITH FOREACH

function doubleValues(arr){
  arr.forEach(function(currentValue, currentIndex, arr){
      console.log(currentValue * 2);
  });
}
doubleValues([1, 2, 3]); // -> 2, 4, 6

// MANUALLY DEFINE A FOREACH
function myForEach(arr, callbackFn){
  for(let i = 0; i < arr.length; i++){
      callbackFn(arr[i], i, arr); //currenValue, index, array
  };
};