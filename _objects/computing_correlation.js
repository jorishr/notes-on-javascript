/* 
    COMPUTING CORRELATION

    Phi coeficient: n11xn00-n10xn01 divided by square root of n1.xn0.xn.1xn.0 
    taken from a frequency table. 
    n11 * n00 - n10 * n01 / n1• * n0• * n•1 * n•0

    The frequency table can be an array or an object with property names like 
    this, which represents a two by two table:

    76(00)	9(01)
	 4(10)	1(11)
*/

let table = [76, 9, 4, 1];
let tableObject = {11: 1, 00: 76, 01: 9, 10: 4};

/* 
    Important for the computation in JS in the way to interpret the indices: 
    1-0 is a two-bit binary number whereby the left digit refers to the squirel
    (true) and the right digit to the other variable/event (e.g. pizza: false).
    
    Since the binary 10 represent the decimal number two(2) we store 10 at
    position 2 in the array.

    NOTE: 
    0	0	0	0	0	0	0
    64 	32	16	8	4	2	1

    Thus the array is a follows:
	    [n00, n01, n10, n11] 
	        position 0 for binary 0 0 0 0 0 0
	        position 1 for binary 0 0 0 0 0 1
            position 2 for binary 0 0 0 0 1 0
            position 3 for binary 0 0 0 0 1 1
	
    The function then is this:
*/

function phi(table){
	return ((table[3] * table[0]) - (table[1] * table[2])) / Math.sqrt(  
                (table[2] + table[3]) *(table[0] + table[1])
				*(table[1] + table[3])*(table[0] + table[2])
                );
};

//  destructured
let table =	[n00, n01, n10, n11];

function phi([n00, n01, n10, n11]){
    return (n11 * n00 - n10 * n01) /
    ((n10 + n11)*(n00 + n01)*(n01 + n11)*(n00 + n10));
};

console.log(phi(table));

/* 
    NOTE that we have to make the sum of two fields from the table to get 
    fields like n1• or n0· because the sums of rows or columns are not stored 
    directly in our data structure.
*/

/* 
    DESTRUCTURING FREQUENCY TABLE

*/

/* Here we point to positions in the table array but it is easier to read the
 function if we could point directly to the elements of the array: let n00 = table[0]; 
 or the first position in the array[0].
This can be done by passing the array as the parameter:
 */		

/* 
    CONVERTING DATASET INTO FREQUENCY TABLE ARRAY

    For each variable or "event" in the journal we are going to build a 
    frequency table to check to correlation between the event and the 
    true/false conversion into a squirrel.
    
    The dataset will an array of objects.
*/
var JOURNAL = [
  {"events":["carrot","exercise","weekend"],"squirrel":false},
  {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
  {"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
  {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
  {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false}
];

/* 
    FUNCTION TO AUTOMATE BUILDING A FREQUENCY TABLE FOR EACH EVENT
    
    LOGIC
    
    The function parameters will be a string <event> and the dataset journal, 
    an array of objects stored in the binding <journal>.
    Loop over the journal array to check for how many times	an event occurs in
    relation to true/false
    
    Create a variable that temporarily stores the journal position entry
    See dataset: that binding has two properties: <events> and <squirrel>
    
    Every array has an <includes> method that checks whether a given value 
    exists in the array: arr.<property>.includes(value)

    A similar check can be performed for the <squirrel> property which has a  
    boolean value.

    To record and track the result of the if statements, another tracking 
    variable <index> is used

    This <index> binding corresponds to the index of the table array we are 
    trying to build. Thus we update the table positions according to the result
    of the if statements:
        - index binding remains 0: event not detected and squirrel false
		- index binding is 1: event detected but squirrel false
		- index binding is 2: event not detected and squirrel is true 
		- index binding is 3: event detected and squirrel is true
*/		
function tableForOldJs(event, journal){
    let table = [0, 0, 0, 0];
	for(let i = 0; i < journal.length; i++){
		let entry = journal[i];
		let index = 0;
		if(entry.events.includes(event)){
			index += 1};
		if(entry.squirrel){
			index += 2};
			table[index] +=1;
	}
	return table;
};		

/* 
    MODERN JS REFACTOR 

    KEYWORD "of" after a newly defined binding in a for loop will loop over the
    elements in the value defined thereafter which is the array JOURNAL. 
    (But could be a string or object).

    for (let entry of JOURNAL)
*/ 

function tableFor(event, journal){
    let table = [0, 0, 0, 0];
	for(let entry of journal){
		let index = 0;
		if(entry.events.includes(event)){
			index += 1};
		if(entry.squirrel){
			index += 2};
			table[index] +=1;
	}
	return table;
};		

tableFor("pizza", JOURNAL);      // -> [76, 9, 4, 1]
tableFor("potatoes", JOURNAL);
tableFor("cycling", JOURNAL);
tableFor("weekend", JOURNAL);


/* 
    FIND EVERY TYPE OF EVENT IN THE JOURNAL
    
    LOGIC
    
    Loop over the journal array and built a new array of events 
    	for(let i=0; i<journal.length; i++){let entry = journal[i]} 

    Add an inner loop that runs over the events property of every entry
    	for(let x = 0; x < entry.events; x++){let event = entry.events[x]}

        If the event is not yet recorded in the new events binding, it will be. 
    If it already is, nothing will happen.	
*/

function journalEvents(journal){
	let events = [];
	for(let entry of journal){
		for(let event of entry.events){
			if(!events.includes(event)){
				events.push(event);
			};
        }; 
    };
	return events;
};

journalEvents(journal)  //  -> [array of x events]

/* 
    CALCULATE ALL CORRELATIONS

    Loop over the array of events created by the journalEvents function
 
    for(i = 0; i < journalEvents(JOURNAL).length; i++){
	    let event = journalEvents(JOURNAL)[i];
	    console.log(event + ":", phi(tableFor(event, JOURNAL)));
    }
*/	
for (let event of journalEvents(journal)) {
  	console.log(`${event}: `, phi(tableFor(event, journal)));	
;}	

/* 
    RESULTS:
    exercise: 0.0685994341
    weekend:  0.1371988681
    bread:   -0.0757554019
    pudding: -0.0648203724
*/

/* 
    FILTERING RESULTS
    Repeat the above function but store the results into a new binding 
    correlation add use an if statement with filter
*/
for (let event of journalEvents(journal)) {
	let correlation = phi(tableFor(event, journal));	
	if(correlation > 0.1 || correlation < - 0.1){
		console.log(`${event}: `, correlation);
	};
};	

/* 
    The results show a strong positive correlation with one event and a strong 
    negative one with another event.

    You could create a new event and correlation calculation for whereby the 
    positively correlated one is present and the negatively correlated absent.
*/

for(let entry of JOURNAL){
	if(entry.events.includes(peanuts) 
		&& !entry.events.includes(teeth)){
			entry.events.push("peanuts teeth")
	};
};

console.log(phi(tableFor("peanuts teeth", journal)));   //  -> 1

/*
DESTRUCTURING
The definition 
? =	
n11 * n00 ? n10 * n01 /
? n1• * n0• * n•1 * n•0

Frequency table as an array: 
	[n00, n01, n10, n11]
	We pass this array through our function:
*/
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
/*
Here we point to positions in the table array but it is easier to read the function if we could point directly to the elements of the array: let n00 = table[0]; or the first position in the array[0].
This can be done by passing the array as the parameter:
*/
function phi([n00, n01, n10, n11]){
    return (n11 * n00 - n10 * n01) /
    ((n10 + n11)*(n00 + n01)*(n01 + n11)*(n00 + n10))
}

/*DESTRUCTURING OBJECTS:*/
let name = {name: "JR", age: 35};
console.log(name) // -> {name: "JR", age: 35}
console.log(name.name) // -> "JR"

let {name} = {name: "JR", age: 35};
console.log(name) // -> "JR" You look directly into the value of the property name, not the object.
console.log(name.name) // -> undefined