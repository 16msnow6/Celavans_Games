var square= function(checkerIn){
	this.checker=checkerIn;
	this.isSelected=false;
	this.getClass=function(){
		var selected=""
		if(this.checker&&this.checker.isSelected){
			selected="selected"
		}
		if(this.checker!=null){
			if(this.checker.isRed){
				if(this.checker.isKing){
					return " RedKing "+selected;
				}else{
					return " RedChecker "+selected;
				}
			}else{
				if(this.checker.isKing){
					return " BlackKing "+selected;
				}else{
					return " BlackChecker "+selected;
				}				
			}
		}
	}
}
var checker = function(IsRed_){
	this.isKing=false;
	this.isRed=IsRed_;
	this.canMoveInDirection=function(direction){
		if(this.isKing){
			return true
		}
		if((this.isRed&&direction>0)
		  ||(!this.isRed&&direction<0)){
			return true;
		}
		return false;
	}
}
const Direction ={
	NE:'ne',
	SE:'se',
	NW:'nw',
	SW:'sw'
}


angular.module("checkersGame" , [])
  .controller("Checkers",function(){
	this.init=function(){
		this.selected=null;
		this.sx=0;
		this.sy=0;
		this.board= [] ;
		var size = 8;
		//init
		for(var i = 0;i<size;i++){
			var row=[];
			for(var j=0;j<size;j++){
				var cell;
				if(i%2==j%2){
					cell=new square(null);
				}else{
					if(i<3){
						cell=new square(new checker(true));
					}else if(i>4){
						cell=new square(new checker(false));
					}
					else{
						cell=new square(null);
					}
				}
				row.push(cell);
			}
			//board.push(row);
			this.board.push(row);
		}
	}
	this.init();
	this.click= function(x,y){
		if(this.selected==null){
			this.selected=this.board[x][y].checker;
			if(this.selected!=null){
				this.selected.isSelected=true;
				this.sx=x;
				this.sy=y;
			}
		}else{
			if(
			  Math.abs(this.sx-x)==1
			  &&Math.abs(this.sy-y)==1
			  &&this.board[x][y].checker==null
			  &&this.selected.canMoveInDirection(x-this.sx))
			{
				this.move(this.sx,this.sy,x,y);		
			}
			if(
			  Math.abs(this.sx-x)==2
			  &&Math.abs(this.sy-y)==2
			  &&this.board[(this.sx+x)/2][(this.sy+y)/2].checker!=null
			  &&this.board[x][y].checker==null
			  &&this.board[(this.sx+x)/2][(this.sy+y)/2].checker.isRed!=this.selected.isRed
			  &&this.selected.canMoveInDirection(x-this.sx))
			{
				this.jump(this.sx,this.sy,(this.sx+x)/2,(this.sy+y)/2,x,y);
			}
			this.selected.isSelected=false	
			this.selected=null;
		}
		
	}
	



	this.move = function(x1,y1,x2,y2){
		
		this.board[x2][y2].checker=this.board[x1][y1].checker;
		this.board[x1][y1].checker= null;
		
		if((this.board[x2][y2].checker.isRed&&x2==7)||((!this.board[x2][y2].checker.isRed)&&x2==0)){
			this.board[x2][y2].checker.isKing=true;
		}
	}
	this.jump = function(x1,y1,x2,y2,x3,y3){
		this.board[x3][y3].checker=this.board[x1][y1].checker;
		this.board[x2][y2].checker=null;
		this.board[x1][y1].checker=null;
		
		if((this.board[x3][y3].checker.isRed&&x3==7)||((!this.board[x3][y3].checker.isRed)&&x3==0)){
			this.board[x3][y3].checker.isKing=true;
		}
	}
});

