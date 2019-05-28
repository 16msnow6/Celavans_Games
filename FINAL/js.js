angular.module('GameApp', [])
	.controller('GameController', function() {
		this.reg=Registrar;
		this.name;
		
		this.getGame=function(){
			var get = [] ;
			var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				get[key] = value;
			});
			this.name=get.iframe;
			return get.iframe+"/index.html";
		}
		this.getHeight=function(){
			var height;
			for(item of this.reg){
				var i=item;
				var IName=item.name;
				var TName=this.name;
				if(item.name==this.name){
					height=item.height;
				}
			}
			return "height:"+height;
		}
	
});
angular.module('GameListApp', [])
	.controller('GameListController', function() {
		this.reg=Registrar;
	
		this.setHref = function(str){
			return"game.html?iframe="+str
		}
		this.setThumb = function(str){
			return str+"/thumb.png"
		}
		
});