/*
###########################
OBJECT ORIENTED PROGRAMMING
############################
I.      CONSTRUCTOR FUNCTION
II.     APPLY
III.    CALL
IV.     CONSTRUCTOR FUNCTIONS WITH SIMILAR PROPERTIES
############################

########################
I.  CONSTRUCTOR FUNCTION
########################

Create a constructor function for a Person, each person should have a firstName, 
lastName, favoriteColor and favoriteNumber. Your function MUST be named Person. 

Write a method called multiplyFavoriteNumber that takes in a number and returns 
the product of the number and the object created from the Person functions' 
favorite number.*/

function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.favoriteColor  = favoriteColor;
    this.favoriteNumber = favoriteNumber;
}
let person1 = new Person("Joris", "Raymaekers", "yellow", 27)
let person2 = new Person("Jordi", "Catalan", "red", 10)

Person.prototype.multiplyFavoriteNumber = function(number){
    return number * this.favoriteNumber;
}

person1.multiplyFavoriteNumber(2); //54
person1.multiplyFavoriteNumber(3); //30
/* NOTE: the method does not have to be created as separate declaration on the
prototype of the constructor function, although this is considered the most
efficient if you want the method to be shared by multiply objects, you only 
put the methods and properties inside the constructor function if you want 
them to be unique to each object that is created:*/

function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.favoriteColor  = favoriteColor;
    this.favoriteNumber = favoriteNumber;
    this.multiplyFavoriteNumber = function(number){
        return number * this.favoriteNumber;
}

/*
#########
II. APPLY
#########

Given the following code - refactor the Child function to remove all the 
duplication from the Parent function. You should be able to remove 4 lines of 
code in the Child function and replace it with 1 single line.*/

function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.favoriteColor  = favoriteColor;
    this.favoriteFood   = favoriteFood;
}
let parent1 = new Parent("Joris", "Raymaekers", "yellow", "steak");

function Child(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.favoriteColor  = favoriteColor;
    this.favoriteFood   = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    Parent.apply(this, arguments);
} 
let child1 = new Child("", "", "", "")
/*
NOTE: we refactor by using the Parent constructor function inside the 
the second constructor function but we explicitly change the execution 
context through the keyword this and the the apply method.

KEYWORD arguments
Why apply, not call? Call can be used as the function would be called
immediately as well, but by using apply you don't have to manually pass
again all of the arguments since apply accepts an array. 

Thus we have two options: pass the arguments in an array []. Or us the keyword
arguments.

This takes the arguments from Parent constructor function and puts them into
an array-like collection. NOTE: Technically it is NOT an array. 

So you can even omit the arguments in the Child constructor function:*/
function Child(){
    Parent.apply(this, arguments);
} 
let child2 = new Child("", "", "", "")


/*
############
III.    CALL
############

Create a function that returns the total number of arguments passed to it. 
Don't use any loops.
*/

let x = function(){
    return [].slice.call(arguments).length;
}
x(1,2,3,4)  //-> 4

/*
Selecting all the div elements in the DOM, and filter for specific div elements
*/
document.getElementsByTagName("div") 
var divs = document.getElementsByTagName("div");
var divArray = [].slice.call(divs)

/* 
This will result in an array-like object that can be stored in a binding:

To convert this into a REAL workable array follow the steps:
- declare a empty array: var divArray = [];
- on that empty array copy its content by using [].slice()
- But, use call and set the keyword this explicitly to the array-like object
- we now have a real array and the content will be all the div elements
- use the filter method and define a function to filter for the specific
elements we want.*/
divArray.filter(function(element){
    return element.innerText === "hello";
})
//-> an array with only the div elements that contain the text string hello 

/*
2.  Define getter with inheritance in the following example:
*/

const a = function(x){
    this.x = x;
}

const b = function(x,y){
    this.y = y;
}

const newA = new a('x');    //-> newA.x = 'x'
const newB = new b('x','y') //-> newB.y = 'y'

/*
Define methods newB.getX(); and newB.getY() that return the value 'x' and 'y'
respectively. 
*/

const a = function(x){
    this.x = x;
    this.getX = function(){return this.x}
}

/* a.prototype = {
    getX(){
        return this.x;
    }
}
 */

const b = function(x,y){
    this.y = y;
    a.call(this, x);
    this.getY = function(){return this.y}
}

newB.getX()     //-> 'x'
newB.getY()     //-> 'y'


/*
#################################################
IV. CONSTRUCTOR FUNCTIONS WITH SIMILAR PROPERTIES
#################################################

Car and Motorcycle: make, model, year, but numWheels is a preset value
that is different for each execution context(newCar/newMoto) but fixed
for each object created by those respective function. It is a shared 
property.

If you want properties or methods that are NOT shared by constructor
function that borrow from each other, then you have to use the PROTOTYPE
PROPERTY of those constructor functions. */

function NewCar(make, model, year){
    this.make       = make;
    this.model      = model;
    this.year       = year;
    this.numWheels  = 4; // preset value
}
car1 = new NewCar("Opel", "Astra", 2012);
car2 = new NewCar("BMW", "5-series", 2015);

NewCar.prototype.doors = function(doors){
    this.doors = doors;
}

car1.doors(5);
car1.doors //-> 5
car2.doors(3);
car2.doors //-> 3

function NewMoto(make, model, year){
    NewCar.call(this, make, model, year)
    this.numWheels = 2; // preset value
}
moto1 = new NewMoto("BMW", "moto", 2018);

NewMoto.prototype.storageCase = function(storageBolean){
    this.caseForHelmet = storageBolean;
}

moto1.storageCase(true);
moto1.caseForHelmet //-> true
moto1.doors()       //-> type error because does not exist
moto1.doors         //-> undefined