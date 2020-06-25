// 1 - Implement your own version of Array.prototype.map. The function should accept a callback and return a new array with the result of the callback for each value in the array. 

Array.prototype.map = function(cb){
  // the array we map over is the keyword this
  let newArr = [];
  for(let i=0; i <newArr.length; i++){
    newArr.push(cb(this[i], i, this)) //result of cb: value, index and arr
  }
  return newArr;
};


/* 2 - Implement a function called reverse that reverses a string and place it on the String.prototype

Examples:
    "test".reverse() // "tset"
    "tacocat".reverse() // "tacocat"
*/
//you use split reverse and join or the idea below:

String.prototype.reverse = function () {
  let newStr = '';
  //reverse loop over the string, in descending order and add that to the newStr
  for(let i = this.length -1; i>=0; i--){
    newStr = this[i];
  }
  return newStr;
}

//PROTOTYPE INHERITANCE

// 1 - Create a constructor function for a Vehicle. Each vehicle should have a make, model and year property.

// 2 - Add a function to the Vehicle prototype called start which returns the string "VROOM!"

// 3 - Add a function to the Vehicle prototype called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property

/* Examples 
    var vehicle = new Vehicle("Tractor", "John Deere", 1999)
    vehicle.toString() // 'The make, model, and year are Tractor John Deere 1999'
*/

// 4 - Create a constructor function for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype

// 5 - Create a constructor function for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

function Vehicle(make, model, year){
  this.make   = make;
  this.model  = model;
  this.year   = year;
};

Vehicle.prototype.start = function(){
  return 'VROOM!';
};

Vehicle.prototype.toString = function(){
  return 'The make, model and year are ' + this.make + ' ' + this.model + ' ' + this.year;
};

//apply
function Car(make, model, year){
  Vehicle.apply(this, arguments);
  this.numWheels = 4;
}

//inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(make, model, year){
  Vehicle.apply(this, arguments);
  this.numWheels = 2;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;




/*
What is the result of:
Beyond the JS constructor object there is nothing
*/
console.log('string'.__proto__.__proto__.proto);    //-> null
console.log('string'.__proto__);                    //-> String constructor
console.log('string'.__proto__.__proto__);          //-> JS constructor object
/*
Create a constructor function for a Person. Each person should have 
a firstName, lastName, favoriteColor, favoriteNumber)
*/
function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNumber = favoriteNumber;
}

/* Add a function on the Person.prototype called fullName that returns 
the firstName and lastName property of an object created by the Person 
constructor concatenated together.*/

Person.prototype.fullName = function(){
    return this.firstName + " " +  this.lastName;
}

var person1 = new Person("Elie", "Schoppik", "purple", 34)
var person2 = new Person("Joris", "Raymaekers", "yellow", 27)
person1.fullName() // "Elie Schoppik"
person2.fullName() // "Joris Raymaekers"

/*
3 - Add a property on the object created from the Person function called 
family which is an empty array. This will involve you going back and adding 
an additional line of code to your Person constructor you previously created 
in exercise 1.*/

function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.favoriteColor  = favoriteColor;
    this.favoriteNumber = favoriteNumber;
    this.family = [];
}

/*  4 - Add a function on the Person.prototype called addToFamily which adds an 
object constructed from the Person constructor to the family array. 

IMPORTANT: Make sure that the object you are adding (the familymember object),
is an object constructed from the Person constructor 
(HINT - take a look at the instanceof keyword).

-> NOTE: check of the parameter passed (familymember) is an instanceof the 
constructor function Person

CHECK DUPLICATES: Make sure that your family array does not include duplicates! 
-> Check for duplicates by checking if the index of the element is -1, 
which means it is not present in the array

This method should return the length of the family array.
*/
Person.prototype.addToFamily = function(familyMember){  
    if(this.family.indexOf(familyMember) === -1 && familyMember instanceof Person){
        this.family.push(familyMember);
    }
    return this.family.length;
}
var person1 = new Person("Elie", "Schoppik", "purple", 34)
var person2 = new Person("J", "R", "red", 33)

person1.addToFamily(person2);   //-> 1
person1.family.length           //-> 1
person1.addToFamily(person2);   //-> 1 DUPLICATE
person1.family.length           //-> 1 NO EFFECT
/*
If you pass arguments that are not objects created by the Person function,
such as strings, other objects, or boleans, this will have no effect on the
the this.family array.*/
person1.addToFamily("test");    //-> 1
person1.addToFamily({});        //-> 1
person1.addToFamily([]);        //-> 1
person1.addToFamily(false);     //-> 1
person1.family.length           //-> 1

/*
CUSTOM ARRAY OR STRING METHODS
Add to the Array class prototype:
*/
Array.prototype.newFunction = function(){};
String.prototype.newFunction = function(){};

/*
ADD A FUNCTION TO A PARTICULAR STRING
const x = 'string';
How can you get the output //-> '1' from console.log(x['x'](01));
*/
const x = new String('string');
x.x = (val) => String(val);
/*
By using the String constructor function you get a string Object to which
you can attach properties. Add a function that converts everything given to it
into a string.
*/