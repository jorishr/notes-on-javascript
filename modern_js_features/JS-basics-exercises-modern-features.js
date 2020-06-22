/* 
#############################
EXERCISES: MODERN JS FEATURES
##########################################
I.      REFACTOR WITH ARROW FUNCTIONS
II.     MANUALLY CREATE DEFAULT PARAMETERS
III.    RETURN SMALLEST PARAMETER(...SPREAD)
IV      SUM OF ARGUMENTS, FILTERED
##########################################


#################################
I.  REFACTOR WITH ARROW FUNCTIONS
#################################
*/
function mapFilterAndReduce(arr){
    return arr.map(function(val){
        return val.firstName
    }).filter(function(val){
        return val.length < 5;
    }).reduce(function(acc,next){
        acc[next] = next.length
        return acc;
    }, {})
}

//
let mapFilterAndReduce = 
    arr => arr.map(val => val.firstName).filter(val => val.length < 5)
        .reduce((acc, next) => {
            acc[next] = next.length
            return acc;
        }, {})

/*
######################################
II. MANUALLY CREATE DEFAULT PARAMETERS
######################################
*/
function add(a, b){
    if(a === undefined){
        a = 1;
    }
    if(b === undefined){
        b = 2;
    }
    return a + b;
}
add() // -> 3
add(4) // -> 6 (4 + 2)


/*
#################################
III.    RETURN SMALLEST PARAMETER
#################################

Write a function called smallestValue which accepts a variable number of 
parameters and returns the smallest parameters passed to the function.
*/
let smallestValue = (...arg) => Math.min(...arg);

smallestValue(4,1,12,0) // 0
smallestValue(5,4,1,121) // 1
smallestValue(4,2) // 2
smallestValue(99,12321,12.2) // 2 

/* ...arg put the arguments into an array, that array then is spread out into
the Math.min method.

##############################
IV. SUM OF ARGUMENTS, FILTERED
##############################

Write a function called sumEvenArgs which takes all of the parameters passed
to a function and returns the sum of the even ones.
*/
let sumEvenArgs = (...arg) => arg.filter(val => (val % 2 === 0)).reduce((acc, next) => acc + next);

sumEvenArgs(1,2,3,4) // 6
sumEvenArgs(1,2,6) // 8
sumEvenArgs(1,2) // 2

/* 
you first filter the array of arguments for even ones. The resulting array
is reduced to a single value, the sum of its values, starting the acc at
the first value of the array.

OR use the tercery operator
*/
let sumEvenArgs = (...arg) => arg.reduce((acc, next) => next % 2 === 0 ? acc += next : acc, 0);

/* 
the array of arguments is reduced: start the acc at 0. If the next value in
the array is even, it is added to the acc, if odd, the acc is returned.
*/