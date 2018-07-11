//**********************************************************************
//KEWORD 'THIS' AND USING IT WITH APPLY, CALL AND BIND
//**********************************************************************


var janekObj = {
	firstName: "Janek", 
	sayHi: function(time){
		setTimeout(function(){
			console.log( "Hi " + this.firstName)
		}.bind(this),time)
	}, 
	addNumbers: function(a,b,c,d){
		console.log(this.firstName + " just calculated " + (a+b+c+d));
	}
}

var anetaObj = {
	firstName: "Aneta"
}

//JUST CALLING FUNCTION FROM AN OBJECT PROPERTY. THIS KEYWORD IS CORRECTLY ASSIGNED TO THE OBJECT
janekObj.addNumbers(1,2,3,4);
//Janek, 10

//NEED TO BIND 'THIS' KEYWORD IN AN ASYNCRONOUS FUNCTION TO ASSIGN CORRECT OBJECT TO IT AS IT WILL BE EXECUTED LATER
//AND WITHOUT BINDING KEYWORD 'THIS' WOULD REFFER TO 'WINDOW' OBJECT
janekObj.sayHi(2000);
//Janek Hi after 2s

//USING CALL METHOD TO ASSIGN 'THIS' KEYWORD TO DIFFRENT OBJECT
janekObj.sayHi.call(anetaObj, 3000);
//Aneta Hi after 3s

//SAME
janekObj.addNumbers.call(anetaObj,1,2,3,4);
//Aneta, 10

//SAME BUT USING APPLY (TAKES AN ARRAY OF ARGUNETS)
janekObj.addNumbers.apply(anetaObj,[1,2,3,4]);
//Aneta, 10

//BIND IS NOT CALLING FUNCTION IMMIEADITLY, ALSO PARAMETERS CAN BE SPECIFIED WHILE CALLING THE FUNCTION
var anetaCalc = janekObj.addNumbers.bind(anetaObj,1,2);
anetaCalc(3,4);
//Aneta, 10


//**********************************************************************
//'NEW' KEYWORD WITH 'THIS' KEYWORD USED IN CONSTRUCTOR FUNCTION (MIMIC CLASS IN JS)
//**********************************************************************


//CONSTRUCTOR FUNCTION
function Dog(name, age){
	this.name	=name;
	this.age	=age;
	this.bark 	=function(){
		console.log(this.name + " just barked");
	}
}

//'NEW' KEYWORD (MUST BE USED WITH A FUNCTION)
//1.CREATES A DOG OBJECT
//2.ASSINGS 'THIS' KEYWORD IN THE FUNCTION TO BE THIS (DOG) OBJECT
//3.ADDS 'RETURN THIS' AT THE END OF THE FUNCTION
//4.ADDS __PROTO__ OBJECT

var rusty 	= new Dog ('Rusty', 3);
var maniek 	= new Dog ('Maniek', 10);

//CALLING FUNCIONS

maniek.bark();
//maniek barked

rusty.bark();
//rusty barked


//**********************************************************************
//MORE ON CONSTRUCTOR FUNCTIONS
//**********************************************************************


//CAR CONSTRUCTOR FUNCTION
function Car(make, model, year){
	this.make=make;
	this.model=model;
	this.year=year;
	this.wheels=4;
}

//ANOTHER CONSTRUCTOR FUNCTION WICH CAN SHARE CODE (PROPERTIES) WITH THE HELP OF ASSINGING 'THIS' KEYWORD TO OBJECT
//CREATED BY THE FUNCTION USING CALL METHOD
function Motorcycle(make, model, year){
	Car.call(this, make, model, year);
	wheels = 2;
}

//OR APPLY METHOD
function Motorcycle(make, model, year){
	Car.apply(this, [make, model, year]);
	wheels = 2;
}

//WHEN USING APPLY, I CAN USE 'ARGUMENTS' ARRAY TO CALL ALL ARGUMENTS
function Motorcycle(make, model, year){
	Car.apply(this, arguments);
	wheels = 2;
}

//CREATING OBJECTS USING 'NEW' KEYWORD

var car1 = new Car('Toyota', 'Yaris', 2010);
var moto1 = new Motorcycle('Yamaha', 'Transalp', 2013)

//CONSOLE LOGGING OBJECT ENTRIES

console.log(Object.entries(car1));
console.log(Object.entries(moto1));


//**********************************************************************
//PROTOTYPE CHAINS, __PROTO__, PROTOTYPE AND CONSTRUCTOR OBJECT PROPERTIES
//CREATINF TWO OBJECTS BY CALLING A CONSTRUCTOR FUNCTION
//**********************************************************************


function Person(name){
	this.name=name;
}
var bob = new Person('Bob');
var red = new Person('Red');

//ADDING A PROPERTY TO THE CONTRUCTOR PROTOTYPE VIA __PROTO__
Person.prototype.isVeteran = true;

//NOW THE OBJECTS HAVE THIS PROPERTY
console.log(red.isVeteran);
//true
console.log(bob.isVeteran);
//true

//
console.dir(bob);

Person.prototype === bob.__proto_
//true


//**********************************************************************
//REFACTORING WITH USE OF PROTOTYPE CHAINING
//INSTEAD OF CALLING A FINCTION EACH TIME WHEN CREATNG AN OBJECT IT IS MORE EFFICIENT TO MAKE ACCESSIBLE OBJECT PROPERTIES
//AND CALL THEM WHEN NEEDED
//**********************************************************************


//INEFFICIENT WAY

//PROTOTYPE WITH FUNCTION IN IT
function BadPerson(name){
	this.name=name;
	this.sayHi=function(){
		console.log("Hi "+this.name)
	}
}

//CREATING OBJECT REDEFINES FUNCTION EACH TIME CONTRUCTOR IS CALLED
var max = new BadPerson('Max');
var zed = new BadPerson('Zed');
var ala = new BadPerson('Ala');

max.sayHi();
zed.sayHi();
ala.sayHi();

//EFFICIENT WAY


function GoodPerson(name){
	this.name=name;
}

//
GoodPerson.prototype.sayHi=function(){
	console.log('Hi '+this.name);
}

var uta = new GoodPerson('Uta');
var ula = new GoodPerson('Ula');

uta.sayHi();
ula.sayHi();


//**********************************************************************
//ANOTHER EXAMPLE (EXCERCISE)
//**********************************************************************


function Vehicle(make, model, year){
	this.make=make;
	this.model=model;
	this.year=year;
	this.isRunning=false;
}

Vehicle.prototype.turnOn=function(){
	this.isRunning=true;
	console.log(this.model + " engine on");
}

Vehicle.prototype.turnOff=function(){
	this.isRunning=false;
	console.log(this.model + " engine off");
}

Vehicle.prototype.honk=function(){
	if (this.isRunning){
		console.log('BEEP! BEEP!');
	}else{
		console.log(this.model + " is not running");
	}
}

var corsa = new Vehicle('Opel', 'Corsa', 1993);
var civic = new Vehicle('Honda', 'Civic', 1998);


civic.honk();
//not running
corsa.honk();
//not running

corsa.turnOn();
corsa.honk();
//beep

corsa.turnOff();
corsa.honk();
//not running


//**********************************************************************
//CLOUSURES EXAPMLE
//**********************************************************************


//A CLOUSURE (INNER) CAN USE OUTER FUNCTION'S VARIABLE
//IT IS USEFUL TO MIMIC PRIVATE CLASS VARIABLES

function outer(){
	var data = 'clousers are '
	return function inner(){
		var innerData = 'awesome'
		return data + innerData;
	}
}

//CALLING OUTER FUNCTION WILL RETURN INNER FUNCTION CODE AS EXPECTED
console.log(outer());
//inner function

//SO CALLIN IT LIKE THAT WILL CALL INNER FUNTION WICH CAN USE VARIABLE DEFINED IN OUTER FUNCTION WICH HAS ALREADY RETURNED
console.log(outer()());
//clousers are awesome


//**********************************************************************
//COUSERES AS PRIVATE VARIABLE
//**********************************************************************


function count(){
	var counter = 0;
	return function(){
		return ++counter;
	}
}

//THOE TWO WILL BE INDEPENDANT
var c = count();
var c2 = count();

console.log(c());
//1
console.log(c());
//2
console.log(c());
//3
console.log(c2())
//1

//THE COUNTER VARIABLE IS INNACCESSIBLE OUTSIDE FUNCTION(PRIVATE)
//console.log(counter);
//reference error


//**********************************************************************
//EXAPMLE OF CONSTRUCTOR FUNCTION USING CLOSURES
//**********************************************************************


function ClassRoom(){
	var instructors = ['Hobo', 'Hillbilly']
	return {
		getInstructors: function(){
			return instructors;
		},
		addInstructors: function(instructor){
			instructors.push(instructor);
			return instructors;
		}
	}
}

var classroom1 = new ClassRoom();
var classroom2 = new ClassRoom();

console.log(classroom1.getInstructors());
//'Hobo', 'Hillbilly'

console.log(classroom1.addInstructors('Patty'));
//'Hobo', 'Hillbilly', 'Patty'

console.log(classroom2.getInstructors());
//'Hobo', 'Hillbilly'