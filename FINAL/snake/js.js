$(function(e){
	//prototypes
	function Pos(x_,y_){
		this.x=x_;
		this.y=y_;
	}
	//enums
	const DIRECTION = {
		UP:'up',
		DOWN:'down',
		LEFT:'left',
		RIGHT:'right'
		
	}
	//globals
	var board=new Board(16, 16, 5);
	board.addApple(Math.floor(Math.random()*board.width),Math.floor(Math.random()*board.height),1);


	
	//main
	window.setInterval(function(e){
		//get the position
		if(!board.checkLoose()){
			board.snake.tick(board);
			board.checkLoose();
			draw();
			//lost=checkLoose(x,y);
			//drawScreen();
		}
	},100);
	

		//change the direction
	$(window).keydown(function(e){
		var d
		if(e.which==37){
			d=DIRECTION.LEFT;
		}
		if(e.which==38){
			d=DIRECTION.UP;
		}
		if(e.which==39){
			d=DIRECTION.RIGHT;
		}
		if(e.which==40){
			d=DIRECTION.DOWN;
		};
		if(d!=null)
			board.snake.facing=d;
	});
	
	$("#reset").click(function(){
		board=new Board(16, 16, 5);
		board.addApple(Math.floor(Math.random()*board.width),Math.floor(Math.random()*board.height),1);
	});
	
	draw = function(){
		$("#BoardWrapper").empty();
		var screen = $('<table></table>');
		
		for(var i=0;i<board.height;i++){
			var $row=$("<tr></tr>");
			for(var j=0;j<board.width;j++){
				var $cell=$("<td></td>");
				//color the squares 
				if(board.snake.tail.map(function(e){ return e.x+","+e.y; }).includes( j+','+i)){
					$cell.css('background-color','black')
				}
				if(board.snake.pos.x==j&&board.snake.pos.y==i){
					$cell.css('background-color','grey')
				}
				if(board.apples.map(function(e){ return e.pos.x+","+e.pos.y; }).includes(j+','+i)){
					$cell.css('background-color','red')
				}
				$row.append($cell);
			}
			screen.append($row);
		}
		$("#BoardWrapper").append(screen);
	}
			
	
	
	
	
	
	
	

	
	
	
	
	
	
	//full on objects
	function Snake(x,y,length_,direction){
		this.pos=new Pos(x,y);
		this.length=length_;
		this.facing=direction;
		this.tail=[];
		
		//
		this.tick=function(board){
			//move the tail
			this.tail.push(new Pos(this.pos.x,this.pos.y));
			if(this.tail.length>this.length){
				this.tail.shift()
			}
			//move the head
			this.pos.x=(this.pos.x+(this.facing==DIRECTION.RIGHT)-(this.facing==DIRECTION.LEFT));
			this.pos.y=(this.pos.y+(this.facing==DIRECTION.DOWN)-(this.facing==DIRECTION.UP));
			if(board.apples.map(function(e){ return e.pos.x+","+e.pos.y; }).includes(this.pos.x+','+this.pos.y)){
				this.length++;
				board.removeApple(this.pos);
				board.addApple(Math.floor(Math.random()*board.width),Math.floor(Math.random()*board.height),1);

			}
		}
	}
	
	
	
	
	
	
	
	
	function Apple(x,y,growth_){
		this.pos=new Pos(x,y);
		this.growth = growth_;
		
		this.draw=function(){}
	}
	
	
	
	
	
	
	
	
	function Board(width_,height_,snakeLength){
		this.width=width_;
		this.height=height_;
		
		this.snake = new Snake(~~(width_/2),(~~height_/2), snakeLength, DIRECTION.UP)
		this.apples = [];
		
		this.checkLoose = function(){
			if(this.snake.pos.x<0||this.snake.pos.x>=this.width||this.snake.pos.y<0||this.snake.pos.y>=this.height){
				return true;
			}
			if(this.snake.tail.map(function(e){ return e.x+','+e.y; }).includes(this.snake.pos.x+','+this.snake.pos.y)){
				return true;
			}
			return false;
		
		}
		this.addApple = function(x,y){
			this.apples.push(new Apple(x,y,1));
		}
		
		this.removeApple = function(pos){
			for(apple of this.apples){
				if(apple.pos.x==pos.x&&apple.pos.y==pos.y){
					this.apples.splice(this.apples.indexOf(apple),1);
				}
			}
		}
		

		

	}
});










