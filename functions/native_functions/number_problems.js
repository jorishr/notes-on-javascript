/*
#######################
NUMBER RELATED PROBLEMS
##############################
A.	COMMON DIVIDER
B.	FIND A SUM OF NUMBER PAIRS
C.	PRIME NUMBER
D.	IS A GIVEN VALUE A NUMBER?
##############################

##################
A.	COMMON DIVIDER
##################

Find greatest common divider of two numbers.
*/
function findDivider(num1, num2){
    let maxDiv;
    num1 > num2 ? maxDiv = num2 : maxDiv = num1;
    let divider = [];
    for(let i = 1; i <= maxDiv; i++){
        if(num1%i === 0 && num2%i === 0){
            divider.push(i);
        }
    }
    return Math.max(...divider);
}

/*
##############################
B.	FIND A SUM OF NUMBER PAIRS
##############################

Find a list of number pairs of which the sum does not exceed 10.
*/
function generateNums(){
    let pairs = []
    for(let i = 0; i <= 10; i++){
        for(let j = 0; j <=10; j++){
            if(i + j <= 10){
                let pair = [i, j];
                pairs.push(pair)
            }
        }
    }
    let randomNum = Math.round(pairs.length * Math.random());
    return pairs[randomNum];
}


/*
##############################
D.	IS A GIVEN VALUE A NUMBER?
##############################

Function that checks if a value is a number: either it is finite or type of is a number.
*/
function isNum(val){
	if(isFinite(val)){
		return "It is a number!";
	};
};

//OR 

function isNum(val){
	if(typeof val === "number" && !isNaN(val)){
		return "it is a number";
	}
}
/*
Thus check the typeof of the parameter, if it is "number" that is great but 
typeof(NaN); // -> "number"

Thus eliminate that particular case by !isNaN(val)
*/