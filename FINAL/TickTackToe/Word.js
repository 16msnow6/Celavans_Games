//a false word class for use in testing the dictionary
class Word{
	//constructor that instantiates the name and points values to the values passed to it
	constructor(name, points){
		this.name = name;
		this.points = points
	}
	//set functions to set a new word
	setName(name){
		this.name=name;
	}
	setPoint(point){
		this.points=point;
	}
	
	//Get functions for the word class
	getName(){
		return this.name;
	}
	getPoint(){
		return this.points;
	}
}
