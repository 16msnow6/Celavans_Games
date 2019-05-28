//a clas thatt holds a word array and methods to work with it
//created by matthew Snow
class Dictionary{
	
	//creates a default dictionary
	constructor(){
		this.dict = [];
	}
	DefaultWords(){
				//for testing
		this.addWord("XXX", 1);
		this.addWord("~~~", 1);
		this.addWord("AAA", 1);
		this.addWord("BBB", 1);
		this.addWord("CCC", 1);
		this.addWord("DDD", 1);
		this.addWord("EEE", 1);
		this.addWord("FFF", 1);
		this.addWord("GGG", 1);
		this.addWord("HHH", 1);
		this.addWord("III", 1);
		this.addWord("JJJ", 1);
		this.addWord("KKK", 1);
		this.addWord("LLL", 1);
		this.addWord("MMM", 1);
		this.addWord("NNN", 1);
		this.addWord("OOO", 1);
		this.addWord("PPP", 1);
		this.addWord("QQQ", 1);
		this.addWord("RRR", 1);
		this.addWord("SSS", 1);
		this.addWord("TTT", 1);
		this.addWord("UUU", 1);
		this.addWord("VVV", 1);
		this.addWord("WWW", 1);
		this.addWord("XXX", 1);
		this.addWord("YYY", 1);
		this.addWord("ZZZ", 1);
	}
	
	//adds a word to the dictionary
	addWord(name , points){
		if(typeof name!="string"){
			//throw an error
		}else{
			var word = new Word();
			
			word.setName(name);
			word.setPoint(points);
			
			this.dict.push(word);
		}
	}
	
	//removes given word from the dictionary
	removeWord(word){
		if(typeof word!="string"){
			//throw an error
		}else{
			if(this._getWordPos(word)==-1){
				//throw an error
			}else{
				var wordPos=this._getWordPos(word);
				this.dict.splice(wordPos,1);
			}
		}
	}
	
	//returns true if the word exists in the dictionary
	wordExists(word){
		if(typeof word!="string"){
			//throw an error
		}else{
			return(this._getWordPos(word)!=-1);
		}
	}
	
	//returns the number of points assigned to the word
	getWordPoints(word){
		if(typeof word!="string"){
			//throw an error
		}else{
			var wordPos=this._getWordPos(word);
			if(wordPos==-1){
				//throw an error
			}else{
				return this.dict[wordPos].getPoint()
			}
		}
	}
	
	//returns the whole word array/Dictionary
	getDictionary(){
		return this.dict;
	}
	
	//gets where in the array the given word is
	_getWordPos(name){
		for(var i=0;i<this.dict.length;i++){
			if(this.dict[i].getName()==name){
				return i;
			}
		}
		return -1;
	}
}
