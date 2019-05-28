

var Board = function($container_){
	this.$container=$container_
	this.mineNum;
	this.width;
	this.height;
	this.going=true;
	this.uncovered=0;
	this.cells = [];

	
	
	this.setup=function(width_, height_, mines){
		this.mineNum=mines;
		this.width=width_;
		this.height=height_;
		
		var i=0;
		//make the board
		for(var i=0;i<this.height;i++){
			var $row=$("<tr></tr>");
			this.cells[i] = [];
			for(var j=0;j<this.width;j++){
				var $col=$("<td></td>")
				this.cells[i][j]=new Cell(i,j,$col);
				$row.append($col);
			}
			this.$container.append($row);
		}
		
		//assign the mines
		var i=0;
		while(i<this.mineNum){
			var xPos=Math.ceil(Math.random()*this.width)-1;
			var yPos=Math.ceil(Math.random()*this.height)-1;
			if(!this.cells[yPos][xPos].IsMine){
				this.cells[yPos][xPos].SetMine();
				i++;
			}
		}
	}
	this.reSetup = function(width_, height_, mines){
		this.mineNum=mines;
		this.width=width_;
		this.height=height_;
		this.going=true;
		this.uncovered=0;
		
		var i=0;
		//make the board
		for(var i=0;i<this.height;i++){
			for(var j=0;j<this.width;j++){
				this.cells[j][i].Reset();
			}
		}
		
		//assign the mines
		var i=0;
		while(i<this.mineNum){
			var xPos=Math.ceil(Math.random()*this.width)-1;
			var yPos=Math.ceil(Math.random()*this.height)-1;
			if(!this.cells[yPos][xPos].IsMine){
				this.cells[yPos][xPos].SetMine();
				i++;
			}
		}
	}
		
	
	
	
	this.end = function(){
		this.going=false;
		
		for(var i=0;i<this.height;i++){
			for(var j=0;j<this.height;j++){
				if(this.cells[j][i].IsMine){
					 if(this.cells[j][i].isFlagged){
						 this.cells[j][i].$cell.css('background-image','url("meta/minePic2.png")')
					 }else{	
						this.cells[j][i].$cell.css('background-color','red')
					 }
				}
				else if(this.cells[j][i].isFlagged){
					this.cells[j][i].$cell.css('background-image','url("meta/minePic3.png")')
				}
			}
		}
	}
}





var Cell = function(y,x,$cell_){
	this.$cell=$cell_;
	this.xPos=x;
	this.yPos=y;
	this.IsMine=false;
	this.isFlagged=false;
	this.IsSelected=false;
	
	
	
	
	this.check= function(par){
		var AroundMines=0;
		if(this.isFlagged){
			return;
		}
		if(this.IsMine){
			par.end();
			return;
		}
		this.IsSelected=true;
		this.$cell.css('background-color','lightgray');
		//check how many mines are around this one
		for(var i=-1;i<=1;i++){
			for(var j=-1;j<=1;j++){	
				if(
				 this.yPos+i>=0
				 &&this.yPos+i<par.height
				 &&this.xPos+j>=0
				 &&this.xPos+j<par.width)
				{			
					if( par.cells[this.yPos+i][this.xPos+j].IsMine ){
						AroundMines++;
					}
				 }
			}
		}
		this.$cell.text(AroundMines);
		//recurse if necicary.
		if(AroundMines==0){
			for(var i=-1;i<=1;i++){
				for(var j=-1;j<=1;j++){	
					if(
					 this.yPos+i>=0
					 &&this.yPos+i<par.height
					 &&this.xPos+j>=0
					 &&this.xPos+j<par.width)
					{			
						if(!par.cells[this.yPos+i][this.xPos+j].IsSelected){
							par.cells[this.yPos+i][this.xPos+j].check(par);
						}
					 }
				}
			}
		}
	}
	
	this.SetMine= function(){
		this.IsMine=true;
	}
	this.Reset=function(){
		this.$cell.empty();
		this.$cell.css("background-color","");
		this.$cell.css("background-image","");
		this.IsMine=false;
		this.isFlagged=false;
		this.IsSelected=false;
	}
		
		
}
	
	

$(document).ready(function(){
	//------------asign mines
	var board=new Board($('tbody'));
	board.setup(10,10,10);
	
	$('td').click(function(e){
		if(board.going){
			var x = $(e.target).index();
			var y = $(e.target.parentNode).index();
			var cell = board.cells[y][x];
			cell.check(board);
		}
	});
	$('td').contextmenu(function(e){
		if(board.going){
			var x = $(e.target).index();
			var y = $(e.target.parentNode).index();
			var cell = board.cells[y][x];
			if(!(cell.IsSelected)){
				if(cell.isFlagged){
					cell.isFlagged=false
					cell.$cell.css("background-image","none")
				}else{
					cell.isFlagged=true;
					cell.$cell.css('background-image','url("meta/minePic2.png"');
				}
			}
		}
		return false;
		
	})
	$("#reset").click(function(){
		board.reSetup(10,10,10);
	});
});













/*flaging=false
going=true
function asignMines(){
	mineNum=15;
	var xMax=10;
	var yMax=10;
	var a
	for(i=0;i<mineNum;i++){
		do{
		xPos=Math.ceil(Math.random()*xMax);
		yPos=Math.ceil(Math.random()*yMax);
		//------check if allready a mine
		$("table tbody").each(function(){
			$(this).children('tr').slice(xPos-1,xPos).each(function(){
						a=$(this).children('td').slice(yPos-1,yPos).hasClass('mine')			
			})
		})
		}
		while(a);
		//------turn into a mine
		$("table tbody").each(function(){
			$(this).children('tr').slice(xPos-1,xPos).each(function(){
				$(this).children('td').slice(yPos-1,yPos).addClass('mine');			
			})
		})
	}	
}
function check(x, y){

	
	var AroundMines=0;
	
	
	for(i=-1;i<=1;i++){
		$("table tbody").each(function(){
			$(this).children('tr').slice(i+y-1,i+y).each(function(){
				
				for(j=-1;j<=1;j++){
					if($(this).children('td').slice(j+x-1,j+x).hasClass('mine')){
						AroundMines+=1;
						
					}
				}
			})
		})
	}
	$("table tbody").each(function(){
		$(this).children('tr').slice(y-1,y).each(function(){
			$(this).children('td').slice(x-1,x).text(AroundMines)
			$(this).children('td').slice(x-1,x).css('background-color','darkGrey')
		})
	})
}




$(document).ready(function(){
	//------------asign mines
	asignMines();
	
	
	
	//----------------on click
	$('td').click(function(){
		if (going==true){
			if(flaging==false){
				if(!$(this).hasClass('flagged')){
					if(!$(this).hasClass('mine')){
							
						check(parseInt(this.className.substring(1,3)),parseInt(this.className.substring(5,7)))
					}else{
						//-----------end
						$(this).css('background-color','red');
						going=false;
						$('.mine').css('background-color','red')
						$('.flagged').css('background-image','url("meta/minePic3.png")')
						$('.mine.flagged').css('background-image','url("meta/minePic2.png")')
						
					}
				}
			}else{
				$(this).toggleClass('flagged');
			}
		}
	})
//---------------------------------------------if 0, check on all the mines around it
	$('td').hover(function(){//because i don't know how to do this automaticly
		if(this.innerHTML=='0'){
			for(i=-1;i<=1;i++){
				x=parseInt(this.className.substring(1,3))
				y=parseInt(this.className.substring(5,7))

				
				$("table tbody").each(function(){
					$(this).children('tr').slice(y-1+i,y+i).each(function(){
						for(j=-1;j<=1;j++){
							$(this).children('td').slice(x-1+j,x+j).each(function(){
								if(this.innerHTML==''&&!$(this).hasClass('flagged')){
									check(x+j,y+i)
								}
							})
						}	
					})
					
					
				})

			}	
		}
	})
//----flag
	$('.mode').click(function(){
		if(flaging==true){
			$(this).css('background-image','url("meta/minePic.png")')
			flaging=false;
		}else{
			$(this).css('background-image','url("meta/minePic2.png")')
			flaging=true;
		}
	})	
	
	
})*/


