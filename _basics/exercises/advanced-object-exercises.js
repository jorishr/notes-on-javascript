/*
################
OBJECT EXERCISES
##############################
I.  LIST OF OBJECTS
    BUILD A LIST FROM AN ARRAY
    OBJECT LIST INTO ARRAY
    HELPER FUNCTION PREPEND
II. DEEP OBJECT COMPARISON
##############################


###################
I.  LIST OF OBJECTS
###################

A list is a nested set of objects, with the first object holding a reference 
to the second, the second to the third, and so on.*/

let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};
/*
BUILD A LIST FROM AN ARRAY
Build a list from an array so that [10, 20] becomes:
    {value: 10, rest: {value: 20, rest: null}}

Run over the loop the backwards and update the object value with the array 
value. The rest value is updated with list binding: first iteration null,
second iteration: list = {value: 20, rest: null}, becomes:
{value: 10, rest: {value: 20, rest: null}}, etc...

A nice thing about lists is that they can share parts of their structure, while
remain independent lists*/

function arrayToList(array){
    let list = null;
    for(let i = array.length -1; i >= 0; i--){
        list = {value: array[i], rest: list}; //remains independent from the previous ones but share the structure
    }
    return list;
}
//THUS:
arrayToList([10, 20]) // -> {value: 10, rest: {value: 20, rest: null}}


//OBJECT LIST INTO ARRAY
const objectList = {value: 10, rest: {value: 20, rest: null}}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
      array.push(node.value); //value at first property gets pushed to the array (10)
    }
    return array;
  }
//THUS:
listToArray(arrayToList([10, 20, 30])) // -> [10, 20, 30]

/*
The for loop condition: node starts at first sublist value:10, rest:{}, here 
the body of the function can read the node.value property and push the value to
the array.

Next, the node condition goes on as long as node = true. Thus it will continue
untill it encounters a null(which returns false) and then the loop ends.

Thus in the second iteration node = node.rest thus node = {value: 20, rest: null},
here again it can read the property value and push it to the array AND node will
be updated to: node.rest, thus at the end of the second iteration node = null and
the loop will stop.

HELPER FUNCTION PREPEND
Add a helper function prepend, which takes an element and a list and creates a 
new list that adds the element to the front of the input list.

{value: x, rest: {value: y, rest: null}} becomes: 
{element, value: x, rest: {value: y, rest: null}}*/

function prepend(element, list){
    return {element, rest: list};
    //OR let newList = {element, rest: list}
    //   return newList
}


/*
NTH FUNCTION
Add a function nth, which takes a list and a number and returns the element 
at the given position in the list (with zero referring to the first element) 
or undefined when there is no such element.

{value: x, rest: {value: y, rest: null}} 
//value: x = position 0, thus if n = 0
// return list.value
// if number is position 50, not existent -> return undefined*/
function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
  }


/*
##########################
II. DEEP OBJECT COMPARISON
##########################

The == operator compares objects by identity. But sometimes you’d prefer to 
compare the values of their actual properties.

Write a function deepEqual that takes two values and returns true only:
- if they are the same value OR are objects with the same properties, 
where the values of the properties are equal when compared with a recursive call 
to deepEqual.*/

function deepEqual(a,b){
    if(a === b){ //same value
        return true;
    }
    if(typeof a != "object" || typeof b != "object"){
        return false;
    }
    let keysA = Object.keys(a), keysB = Object.keys(b);
    if(keysA.length != keysB.length) return false;
    for(property of keysA){
        if(keysB.includes(property)) return true;
    }
    return true;
}
/*
Objects with same properties: test if they are objects first, later we'll check
if the properties. If one them is not an object, return false and stop the 
function.

JS historical bug: typeof null = object. To account for this:
if(typeof a != "object" || typeof b != "object" || a == null || b == null){return false;}

we now know we are working with objects, thus test the properties with the
Object.keys() function. This produces a string with the list of properties
stores that string for comparison:

Before comparing the names and value of the properties, check if both objects
have the same number of properties, if not return false.

Now we know they have the same number of properties, now check whether the 
properties of objectA are included in objectB. To do this we loop over the 
keysA

All properties in one also exist in the other, they have the same set of 
property names.

Add the recursive call:
for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
}
*/