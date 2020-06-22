/* 
#####
INDEX
##########################
1.  EVEN NUMBERS
2.  POWER
3.  < VERSUS <=
4.  DO LOOP
5.  BREAK A LOOP MANUALLY
6.  PRINT TRIANGLE
7.  FIZZBUZZZ
8.  CHESSBOAR
9.  FIND LAST RECEIVER OF DISTRIBUTION OF VALUES
##########################


################
1.  EVEN NUMBERS
################
Log all the even number from 0 to 1000. 
*/
function printEven(){
    let number = 0;
    while (number < 1000){
        console.log(number);
        number = number + 2;
    }
}
/* NOTE: Usually you combine a loop with a binding that counts or tracks the
progress.

Same exercise with a for loop:
*/
function printEven(){
    for(let i=0; i <= 1000; i++){
        if(i % 2 === 0){
            console.log(i);
        }
    };
};

/*
#########
2.  POWER
#########
NOTE: A WHILE LOOP is like a FOR LOOP without the built-in TRACKER VARIABLE.
You need a tracking variable that has to be updated with each iteration, 
something that is already included by default in the for loop.

It works just fine in a WHILE LOOP or CUSTOM FOR LOOP as long as you define 
the tracker binding manually. 
*/
function power(x, n){
    let result = 1;
    let count = 0
    for(; count < n;){
        result *= x;
        count += 1;
    }
    return result;
};
power(2, 10);

//with a while loop
function power(x, n){
    let result = 1;
    let count = 0; 
    while (count < n){
        result *= x;
        count += 1;
    }
    return result;
};
power(2, 10);

//with a normal for loop
function myPw(x, n){
    let result = 1;
    for(let i = 0; i < n; i++){
        result *= x;
    }
    return result;
}
myPw(2, 4);     // -> 16
power(2, 10);   // -> 1024

/* NOTE: We need 10 iterations, starting at 0 this means the conditions has to
be < 10. If you start i at 1, you can use <= 10.   

/*  
###############
3.  < VERSUS <=
###############
Write a function that take two arguments: a string and a number
It should print out the string, the number of times 
*/
function echo(str, num){
    for(var i = 0; i < num; i++){ 
        console.log(str);
    };
};
echo("Echo!!!", 3);     //-> Echo Echo Echo
/*
NOTE THE LOGIC: 
If num = 3. and i = 0; i < 3, the following happens:
0 -> log loop 1
1 -> log loop 2
2 -> log loop 3
3 -> i = num (3) thus loop is stopped. 

If num = 3. and i = 1; i <=3, the following happens:
1 -> log loop 1 
2 -> log loop 2
3 -> log loop 3
4 -> i > num (3) thus loop is stopped.

/* 
###########
4.  DO LOOP
###########
Prompt the user for input as long as he does not enter a valid answer:
a string. Thus an empty answer is not accepted.
*/

let userInput = ""; //empty string = false  
do {
    userInput = prompt("Enter your name"); // prompt will return a string
} 
while (!userInput)
// while userInput is NOT a valid string (str = true, empty str = false)


/*
#########################
5.  BREAK A LOOP MANUALLY
#########################
FIND FIRST NUMBER THAT...is equal or greater than 20 and divisible by 17. 
*/
for (let i = 20; ; i++){
	if (i % 17 == 0){
	console.log(i);
	break;
    }
} 
/* //-> 34
NOTE: there is no condition between ; ; but we manually break the loop
when the bolean value of the if condition becomes true.

NOTE: The continue keyword is similar to break, but instead	of terminating the 
loop it jumps to the next iteration of the loop.   
*/

/* 

##################
6.  PRINT TRIANGLE
##################
Write a loop that makes seven calls to console.log to output the following 
triangle:

#
##
###
####
#####
######
#######
    
LOGIC
- use a binding that will be log a STRING in the console
- continue to add # to the string untill its length reaches 7, 
thus while it is less or = than, keep going
*/

let triangle = "#";
while (triangle.length <= 7){
    console.log(triangle);
    triangle = triangle + "#";
};

//with a for loop
let triangle = "#";
for (let x = 0; x < 7; x++){
    console.log(triangle);
    triangle = triangle + "#";
}

/*

#############
7.  FIZZBUZZZ
#############
Write a program that uses console.log to print all the numbers from 1 to 100, 
with two exceptions. Divisible by 3 -> fizz, divisible by 5 but not 3-> buzz

LOGIC
- loop through numbers 1 to 100
- three options: log fizz , log buzz or log num 
NOTE: %3 not 5, %5 not 3
part two: %3 not 5, %5 not 3, %5 and %3
*/

for (let x = 1; x <= 100; x++){
    if(x % 3 == 0 && x % 5 != 0){
        console.log("Fizz");
    } else if (x % 5 == 0 && x % 3 != 0){
        console.log("Buzz");
    } else if (x % 5 == 0 && x % 3 == 0){
        console.log("FizzBuzz");
    } else {
        console.log(x);
    }
}

/* 
NOTE: this is a complex solution with lots of if statements
There is a cleverer design solution: BUILD UP A STRING.
Either log the present number (tracking var i in the loop) or log the string.

Start with empty string
If %3 add "fizz" to string
If %5 add "buzz" to string
The concatenation will result that numbers with %3 and %5 get
the "fizzbuzz".

console.log: use || :if string is empty this returns false and 
you log the number, if it is true, the first part is logged 
*/
for (let x = 1; x <= 100; x++){
    let output = "";
    if(x % 3 == 0){output += "Fizz"}
    if(x % 5 == 0){output += "Buzz"}
    console.log(output || x);
}

/*
##############
8.  CHESSBOARD
##############
Write a program that creates a string that represents an 8×8 grid, using 
newline characters to separate lines. At each position of the grid there 
is either a space or a "#" character. The characters should form a 
chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #
*/
let board = "";
let size = 20;
for (let y = 0; y < size; y++){
    for (let x = 0; x < size; x++){
        if((x + y) % 2 == 0){
            board += " ";
        } else {
            board += "#";
        }
    };
    board += "\n";
};
console.log(board);
/*
LOGIC  
- build a string where you add either a blank space or a #
- when put a blank space or #?
- use odd or even for constructing a line

- to create new lines you have to add "\n"
- to repeat this process: put the line constructor loop inside another loop
that adds the \n to the string after each line is constructed.

- problem: by just using x%2 you get lines that with the same pattern
the solutions: add the line counter to the conditional:
line 0 position 2: even, thus add " "
line 0 position 3: odd, thus add # 
line 1 position 2: odd, thus add #
line 1 position 3: even, thus add " "

- to make sure it works for any size, add binding and change 8 in the 
for loops


/*
################################################
9. FIND LAST RECEIVER OF DISTRIBUTION OF VALUES
################################################

n = kids
t = toys
i = position

There are two scenario's: 
- more kids than toys n > t. The last kid to receive a toy is i + t -1

5 kids, 4 toys, start at 1 -> 1-1 2-2 3-3 4-4 5-0   //-> 4 (1 + 4 -1)
5 kids, 2 toys, start at 1 -> 1-1 2-2 3-0 4-0 5-0   //-> 2 (1 + 2 -1)
5 kids, 2 toys, start at 2 -> 1-0 2-1 3-2 4-0 5-0   //-> 3 (2 + 2 -1)

- more toys than kids n < t. The last kid that gets a toy is the remainder or 
modulo of i + (t % n) -1
NOTE: only works when i = 1 or i = 2

5 kids, 9 toys, start at 1
-> 1-1 2-2 3-3 4-4 5-5 
-> 1-6 2-7 3-8 4-9 5-0  //-> 4 (1 + (9%5) -1)

5 kids, 9 toys, start at 4
-> 1-0 2-1 3-2 4-3 5-4 
-> 1-5 2-6 3-7 4-8 5-9  //-> 5 (2 + (9%5) -1)
*/
function findLast(n, t, i){
    let lastChild;
    n < t 
    ? lastChild = i + (t%n) -1 
    : lastChild = i + t -1;
    return lastChild;
}