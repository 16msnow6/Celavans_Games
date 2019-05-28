
//Object to hold the board in game.
//It constructs the board using an array, and it allows setters and getters for the height and width of the board.
class Board{
    
    //var width;
    //var height;
    //var boardArray;
    //var boardHTML;
   // var boardAddress;
    
    //Constructor that sets the width and height of the board
    constructor(w, h){
        this.width = w + 2 ;
        this.height = h + 2;
        this.boardArray = [];
    
        for(var j = 0; j < this.height; j++){
	for(var i = 0; i < this.width; i++){
                if(j == 0 || j == this.height - 1 || i == 0 || i == this.width - 1){
                    this.boardArray.push(null);
                }
                else{ 
                    this.boardArray.push(0);
		}
            }
        }
    }
   

    //set the value of the board at the id to the player value
    set(id, player){
        this.boardArray[id] = player;
    }
    
    //Gets the value of the board at the id
    get(id){
        /*if(x > this.width - 1 || y > this.height - 1 || y < 0 || x < 0){
            return null;
        }*/
        return this.boardArray[id];
    }
  
    //Get functions to check the dimensions of the board
    getWidth(){
        return this.width; 
    }
  
    getHeight(){
        return this.height; 
    }
}




function test(message){
    window.alert(message); 
}


