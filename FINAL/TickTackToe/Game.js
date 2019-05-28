//a class that holds the game state and methods that controll the high end game functions
class game{
	constructor(width, height, scrabble){
		this.dictionary = new Dictionary();
		this.board = new Board(width, height);
		this.squaresPushed = 0;
		this.players = [];
		this.numPlayers = 0;		
		this.PointsToWin = 1;
		this.turn = 1;
		this.countedWords = [];
		this.Over=false
		this.isScrabble = new Boolean(scrabble);
		this.scrabbleLetters = [0,0,0,0,0,0,0];
		
		this.printScrabble();
	//	this.printBoard();
	//	this.printLeaderboard();
		this.generateLetters();
		
	//	this.addPlayer("bob", testX);
	//	this.addPlayer("Player", testO);
		/*this.addPlayer("Player2", images[0]);
		this.addPlayer("bob", images[2]);
		this.addPlayer("bob", images[3]);
		this.addPlayer("bob", images[4]);
		this.addPlayer("bob", images[5]);
		this.addPlayer("bob", images[6]);
		this.addPlayer("bob", images[7]);
		this.addPlayer("bob", images[8]);
		this.addPlayer("bob", images[9]);
		this.addPlayer("bob", images[27]);*/
		var player = 1
	}
	//returns the game's dictionary
	getDictionary(){
		return this.dictionary;
	}
	//returns the game board
	getBoard(){
		return this.board;
	}
	//returns a list of all the players
	getPlayers(){
		return this.players;
	}
	//returns the player with the given player ID
	getPlayer(id){
		for(var i=0;i<players.length;i++){
			if(players[i].getID==id){
				return players[i];
			}
		}
	}
	//returns how many points there need to be to win
	getWinPoints(){
		return this.winPoints;
	}
	//sets how many points there need to be to win
	setWinPoints(points){
		this.PointsToWin=points;
	}
	//returns true if the player has won
	checkWin(player){
		if(player.getScore()>=this.PointsToWin){
			return true;
		}else{
			return false;
		}
	}
	//returns the player in first place
	getFirstPlacePlayer(){
		winner = this.players[0]
		for(i=1;i < this.players.length;i++){
			if(this.players[i].getScore>winner.getScore){
				winner=this.players[i];
			}
		}
		return winner;
	}
	//adds a new player to the game
	addPlayer(nickname, image){
		this.players.push(new Player(++this.numPlayers, nickname, image));	
	}
	//takes a player out of the game((messes up the player ID))
	removePlayer(id){
		for(var i = 0;i < this.players.length; i++){
			if(players[i].getID()==id){
				this.players.splice(i,1);
				this.numPlayers--;
				return ;
			}
		}
		//player not found
			
	}
		
	getTurn(){
		return this.turn;
	}
	updateTurn(){
		if(this.turn < this.numPlayers){
			this.turn++;
		}
		else{
			this.turn = 1;
		}
	}
	
	printLeaderboard(){
		var leaderBoard = "<tr>	<th>#</th> <th>Image</th> <th>Name</th> <th>Score</th> <th>Turn</th></tr>";
		for(var i = 0; i < this.numPlayers; i++){
			leaderBoard += leader1;
			leaderBoard += i;
			leaderBoard += leader2;
			
			leaderBoard += leader3;
			leaderBoard += i + "id";
			leaderBoard += leader2;
			leaderBoard += i + 1;
			leaderBoard += leader4;
			
			leaderBoard += leader3;
			leaderBoard += i + "image";
			leaderBoard += leader2;
			leaderBoard += this.players[i].getImage();
			leaderBoard += leader4;
			
			leaderBoard += leader3;
			leaderBoard += i + "name";
			leaderBoard += leader2;
			leaderBoard += this.players[i].getNickname();
			leaderBoard += leader4;
			
			leaderBoard += leader3;
			leaderBoard += i + "score";
			leaderBoard += leader2;
			leaderBoard += this.players[i].getScore();
			leaderBoard += leader4;
			
			leaderBoard += leader3;
			leaderBoard += i + "turn";
			leaderBoard += leader2;
			if(i + 1 == this.getTurn()){
				leaderBoard += "X";
			}
			leaderBoard += leader4;
			
			leaderBoard += leader5;
		}
		var item = document.getElementById("leader");
		item.innerHTML = leaderBoard;
	}
	
	printBoard(){
		var id = 0;
		var boardHTML = "";
		boardHTML+="first to "+this.PointsToWin+" points wins"; 
		for(var i = 0; i < this.board.height; i++){
		    boardHTML += "<tr>\n";
		    for(var j = 0; j < this.board.width; j++){
			id = i * this.board.width + j;
			boardHTML += "<td id = '" + id + "'>";
			
			switch(this.board.boardArray[id]){
			    case 0: boardHTML += "<button type='button' onclick='conn.pushButton(" + id + ")'></button>";
				    break;
			    case 1: boardHTML += player1;
				    break;
			    default: break;
			}
			
			boardHTML += "</td>\n";
		    }

		    boardHTML += "</tr>\n";
		}
		
        	var boardAddress = document.getElementById("board");
		boardAddress.innerHTML = boardHTML;
    	}
	
	printScrabble(){
		if(this.isScrabble == true){
			var letters = document.getElementById("scrabble");
			var letterBoard = "<tr>";
			for(var i = 1; i < 8; i++){
				letterBoard += "<td><button type='button' class = 'scrabbles' id = '" + (i - 1000) + "' onclick='conn.changeLetter(this.id )'></button></td>";
			}
			letterBoard += "</tr>";
			letters.innerHTML = letterBoard;
		}
	}
	
	changeLetter(id){
		if(this.players[this.getTurn()-1].drawn==false|this.players[this.getTurn()-1].drawn==null){
			this.players[this.getTurn()-1].setImage(images[parseInt(id) + 1000]);
			this.randomLetter(id);
			this.printLeaderboard();
			this.players[this.getTurn()-1].drawn=true;
		}
	}
	
	generateLetters(){
		if(this.isScrabble == true){
			for(var i = 1; i < 8; i++){
				var id = i - 1000;
				console.log(this.randomLetter(id));
				
			}
		}
	}
	randomLetter(id){
		var letter = document.getElementById(id);
		var letterStuff = "";
		var letterNum = Math.floor(Math.random() * Math.floor(26)) + 1;
		letterStuff += images[letterNum];
		letter.innerHTML = letterStuff;
		letter.id=(letterNum-1000)
		return letter.id;
	}
	
	//Work in progress. Function to output a win condition
	gameOver(){
		var numSquares = this.board.height * this.board.width;
		
		if(numSquares == this.squaresPushed)
			alert("Game is over!");
	      }
	pushButton(id){
		if((this.isScrabble==false)|(this.players[this.getTurn() - 1].drawn)){
			var item = document.getElementById(id);
			
			this.squaresPushed++;
			item.innerHTML = this.players[this.getTurn() - 1].getImage();
			scanBoard(this, id);
			this.board.set(id, this.getTurn());
		
			this.gameOver();
			if(this.checkWin(this.players[this.getTurn() - 1])){
				lockBoard(this);
				alert('Player ' + this.getTurn() + ' has won the game!');
				this.Over=true;
			}		
			this.updateTurn();
			this.printLeaderboard();
			if(this.isScrabble){
				this.players[this.getTurn() - 1].drawn=false;
			}
		}else{
			if(this.conn.HasServer&&this.getTurn()==conn.socket.PlayerNumber){
				alert("you have to draw a new tile");
			}
		}
	}
	addDictionary(Dict){
		if(Dict!=-1){
			this.dictionary=ParseDict(Dict);
		}else{
			this.dictionary.DefaultWords();
		}
	}
}

//var newGame = new game(3,3,true);
	


function lockBoard(newGame){
	for(var i = 0; i < (newGame.board.getWidth() * newGame.board.getHeight()); i++){
		if (newGame.board.boardArray[i] == 0){
			var button = document.getElementById(i);
			button.innerHTML = blank;
		}	
	}	
	
}

function getGame()
{     
	formDATA = this.document.querySelector('.GameForm');
                  
	var width = parseInt(formDATA[0].value);
	var height = parseInt(formDATA[1].value);
	var pnts = parseInt(formDATA[2].value);
	var scrabble = formDATA[3].value=="YES";
	if(scrabble){
	var dictionary=formDATA[4].value;
	}
	if(width == "" | height =="" | pnts == "")
	{
		alert("Please fill in the fields to proceed");
		return;
	}
	conn.CreateGame(width, height, pnts, scrabble,dictionary);
	conn.StartGame();
	return false;
}
function ParseDict(str){
	var dict=new Dictionary();
	var word=""
	while(str.search("[ \n]")!=-1){
		//split the string at the first remaining space or new line charictor
		word=str.substring(0,str.search("[ \n]"));
		str=str.substring(str.search("[ \n]")+1);
		dict.addWord(word.toUpperCase(),1);
	}
	dict.addWord(str.toUpperCase(),1);
	return dict;
}
function getPlayer()
	{     
	formDATA = this.document.querySelector('.PlayerForm');
	
	console.log(formDATA[0].value);
                    
	var name_ = formDATA[0].value;
             
	if(name_ == "")
	{
		alert("Please fill in the fields to proceed");
		return;
	}
    
	console.log(name_);                    
	
	conn.SetPlayer(name_);
	return false;
}

