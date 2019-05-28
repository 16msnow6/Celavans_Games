//to run, use:    "node node_modules\qunit\bin\qunit tests.js"


QUnit.test("hello test", function(assert){
	var test=true;
		assert.ok(test,"message to display when test goes wrong");
});
QUnit.test("getBoard",function(assert){
	var newBoard=new Board(1,5);
	assert.ok(newBoard!=null);
});

QUnit.test("make Board",function(assert){
	newBoard= new Board(3,5);
	assert.ok(newBoard.getWidth()==1&&newBoard.getHeight()==5);
});
	
QUnit.test("Make Dictionary",function(assert){
	dict=new Dictionary();
	assert.ok(dict!=null);
});

QUnit.test("Dictionary Make Word",function(assert){
	dict=new Dictionary();
	dict.addWord("apple",5);
	assert.ok(dict.wordExists("apple"));
});
QUnit.test("Dictionary getPoints",function(assert){
	dict=new Dictionary();
	dict.addWord("apple",5);
	assert.ok(dict.getWordPoints("apple")==5);
});