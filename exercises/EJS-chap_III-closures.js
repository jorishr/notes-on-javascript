/* 
############
1.  BASE SUM
############

Write a function that allows you to do the following:

var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27
*/
const createBase = (a) => {
    return (b) => a + b;
};


/*
###########
2. MULTIPLY
###########

Write a function called specialMultiply which accepts two parameters. If the 
function is passed both parameters, it should return the product of the two.

If the function is only passed one parameter - it should return a function which 
can later be passed another parameter to return the product. You will have to use 
closure and arguments to solve this.

Examples: 
specialMultiply(3,4);   // 12
specialMultiply(3)(4);  // 12
specialMultiply(3);     // function(){}....
*/

function specialMultiply(a, b){
	if(arguments.length === 1){
		return function(b){
			return a * b;	//this too is closure because the inner function uses 
							//parameter a from the outer function that has returned		
		}
	} 
	return a * b;
}
specialMultiply(2, 4)   // 8
specialMultiply(2)      // ƒ (b){return a * b;}
let double = specialMultiply(2)
double                  // ƒ (b){return a * b;}
double(4)               // 8
double(10)              // 20 	

/*
#########################
3. GUESSING GAME-ADVANCED
#########################

Write a function called guessingGame which takes in one parameter amount. 

The function should return another function that takes in a parameter 
called guess. 

In the outer function, you should create a variable called answer which is 
the result of a random number between 0 and 10 as well as a variable called 
guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number 
(defined in the outer function) - you should return the string "You got it!". 

If the guess is too high return "Your guess is too high!" and if it is too low, 
return "Your guess is too low!". 

You should stop the user from guessing if the amount of guesses they have 
made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

var game = guessingGame(5)
game(1) // "You're too low!"
game(8) // "You're too high!"
game(5) // "You're too low!"
game(7) // "You got it!"
game(1) // "You are all done playing!"

var game2 = guessingGame(3)
game2(5) // "You're too low!"
game2(3) // "You're too low!"
game2(1) // "No more guesses the answer was 0"
game2(1) // "You are all done playing!"
*/
function guessingGame(amount){
    var answer = Math.floor(Math.random()*11);
    var guesses = 0;
    var completed = false;
    return function(guess){
        if(!completed){
            guesses++
            if(guess === answer) {
                completed = true;
                return "You got it!"
            }
            else if(guesses === amount) {
                completed = true;
                return "No more guesses the answer was " + answer;
            }
            else if(guess > answer) return "Your guess is too high!"
            else if(guess < answer) return "Your guess is too low!"
        }
        return "You are all done playing!"
    }
}
let game3 = guessingGame(3);

// NOTE: if(completed) reads as if completed binding hold value true. 
// if(!completed) reads as if completed binding holds not true or false.