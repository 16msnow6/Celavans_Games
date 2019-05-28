class connection{
	//connects the computer to the server
	constructor(width, height){
		try{
			this.socket = io();
			this.hasServer=true;
			this.socket.on('CreateGame',function(width,height,points,scrabble,dict){
				console.log('creating a new game');
				this.gameState=new game(width,height,scrabble);
				this.gameState.setWinPoints(points);
				this.gameState.addDictionary(dict);
			});
			this.socket.on('StartGame',function(){
				console.log('starting a new game');
				this.gameState.printBoard();
				this.gameState.printLeaderboard();
				if(this.gameState.getTurn()==this.PlayerNumber){
					//alert('it is now your turn');
				}
			
			
			});
			this.socket.on('setWinPoints',function(points){
				console.log('setting the points to win to ' + points);
				this.gameState.setWinPoints(points);
			});
			this.socket.on('getPlayer',function(PN){
				console.log('getting player'+PN);
				images[PN]
			
			
				this.emit('addPlayer',this.nickname,images[PN]);
				this.PlayerNumber=PN
			});
			this.socket.on('addPlayer',function(nickname, image){
				console.log('adding player ' + nickname +' with the image of ' + image);
				this.gameState.addPlayer(nickname,image);
			});
			this.socket.on('pushButton',function(id){
				this.gameState.pushButton(id);
				if(this.gameState.getTurn()==this.PlayerNumber&&this.gameState.Over==false){
					//alert('it is now your turn');
				}
			});
			this.socket.on('changeLetter',function(id){
				this.gameState.players[this.gameState.getTurn()-1].setImage(images[parseInt(id) + 1000]);
				this.gameState.players[this.gameState.getTurn()-1].drawn=true;
			});
		}catch(e){
			if(e.message=="io is not defined"){
				this.HasServer=false
				this.players=new Array();
			}else{
				throw e
			}
		}
	}	
	CreateGame(width,height,points,scrabble,dict){
		if(this.hasServer){
			if(scrabble){	
				this.socket.emit('CreateGame',width,height,points,scrabble,dict);
			}else{
				this.socket.emit('CreateGame',width,height,points,scrabble,-1);
			}
		}else{
				this.gameState=new game(width,height,scrabble);
				this.gameState.setWinPoints(points);
				if(scrabble){
					this.gameState.addDictionary(dict);
				}else{
					this.gameState.addDictionary(-1);
				}
		}
	}
	StartGame(){
		if(this.hasServer){
			this.socket.emit('StartGame')
		}else{
			for(var i=0;i<this.players.length;i++){
				console.log('getting player'+i);
				var image= images[i+1]
				console.log('adding player ' + this.players[i] +' with the image of ' + image);
				this.gameState.addPlayer(this.players[i],image);
				
			}
			console.log('starting a new game');
			this.gameState.printBoard();
			this.gameState.printLeaderboard();
			if(this.gameState.getTurn()==this.PlayerNumber){
				//alert('it is now your turn');
			}
			
		}
	}	
	setWinPoints(points){
		if(this.hasServer){
			this.socket.emit('setWinPoints',points);
		}else{
			console.log('setting the points to win to ' + points);
			this.gameState.setWinPoints(points);
		}
	}
	SetPlayer(nickname){
		if(this.hasServer){
		this.socket.nickname=nickname;
		}else{
			this.players.push(nickname);
		}
	}
	pushButton(id){
		if(this.hasServer){
			if(this.socket.gameState.getTurn()==this.socket.PlayerNumber){
				this.socket.emit('pushButton',id);
			}
		}else{
			this.gameState.pushButton(id);
			if(this.gameState.getTurn()==this.PlayerNumber&&this.gameState.Over==false){
				//alert('it is now your turn');
			}
		}
	}	
	changeLetter(id){
		if(this.hasServer){
			if(this.socket.gameState.getTurn()==this.socket.PlayerNumber){
			this.socket.emit("changeLetter",id);
			this.socket.gameState.changeLetter(id);
		}
		}else{
			this.gameState.changeLetter(id);
		}
	}	
}