//test - should output 3
/*alert(`${1+2}`)*/
/*
This assumes that a few functions/classes will be made in the future. It has not been debugged whatsoever.
It is just a proof of concept for the search function.
--I suggest that the Game class needs to have a getCurrentPlayer function that returns the index of the player who's turn it currently is.
This is shown in the scanBoard Function

--The leftDiagonal function is the only one 'implemented' and will be until more code is finished so it can be tested. It will need to be
changed depending on how the board class and HTML is finally implemented. The idea will be the same because all the board needs for this to work
is a tile ID and some indicator of the word in the square. This assumes that that indicator is only presented in the image name. The code for that
will also need to be modified to work regardless of how many elements are in each tile.

--The scanBoard Function will need to either be part of the game class or be passed a game object. If it is not part of the game class some more
code will need to be changed in this but It will be relatively minor.

--I also suggest that we should have a countedWords class(or just an array) to keep track of the words that have been counted in the game. It will contain an array
with strings like "1-5-9", and "9-5-1" with this example board(starting with ID 1 in the top left):
| x |   |   |
|   | x |   |
|   |   | x |
Note: this will not neccessarily be sorted in numeric order but alphabetical order i.e ('2' > '100') but the process should still work
These strings represent the ID of the tile the letter is contained within. I have both the forwards and backwards string included because each
part of the scan board function looks for words both forwards and backwards. I haven't implemented the backwards part yet because I need to debug
the basic stuff first. Once the left Diagonal is debugged and working everything else will be almost copy and paste.

--When adding elements to countedWords the addWord method within it will sort the array alphabetically using the .sort function that is provided by
default. This makes it so we can do a binary search on the strings. The string binary search function will still need to be implemented.

--`${wordArr[endIndex].position}` this is a pretty nifty thing that converts javascript code(after it is excecuted) into a string. you need to 
use the quotes that are on the ~ key. I think it need jquery as well.

If you have any questions and/or suggestions please let me know
-Brandon Isbell
*/

//This function scans the board for words made by placing a letter in a given position
function scanBoard(newGame, placedLetterPosition){
    var points = 0
    points += leftDiagonal(newGame, placedLetterPosition);
    points += RightDiagonal(newGame,placedLetterPosition);
    points += Vertical(newGame,placedLetterPosition);
    points += Horizontal(newGame,placedLetterPosition);
    //give points to player that made the move
    newGame.players[newGame.getTurn()-1].setScore((newGame.players[newGame.getTurn()-1].getScore() + points))
    console.log("Player " + `${newGame.getTurn()}` + " score: " + `${newGame.players[newGame.getTurn()-1].getScore()}`);
}

//This function scans the left diagonal '\'
function leftDiagonal(newGame,placedLetterPosition){
    var currentPosition = placedLetterPosition;
    var wordArr =[currentPosition];
    //add letter at current position to wordStr
    var wordStr = document.getElementById(`${currentPosition}`).firstChild.src.slice(-5).replace(".png", "");
    //get letters left of initial
    while(newGame.board.get(`${currentPosition - newGame.board.getWidth() - 1}`) != null && !(document.getElementById(`${currentPosition - newGame.board.getWidth() - 1}`).firstChild.tagName === "BUTTON")){
        //and new object to the beginning wordArr {char: 'character', position: boardposition}
        //unshift inserts an item to the front of an array
        wordArr.unshift((currentPosition - newGame.board.getWidth() - 1));
        wordStr = document.getElementById(`${currentPosition - newGame.board.getWidth() - 1}`).firstChild.src.slice(-5).replace(".png", "") + wordStr;
        //move current position
        currentPosition = currentPosition - newGame.board.getWidth() - 1;
    }
    //reset currentPosition
    currentPosition = placedLetterPosition;
    //get letters right of initial
    while(newGame.board.get(`${currentPosition + newGame.board.getWidth() + 1}`) != null && !(document.getElementById(`${currentPosition + newGame.board.getWidth() + 1}`).firstChild.tagName === "BUTTON")){
        //add new object to the end of wordArr
        wordArr.push((currentPosition + newGame.board.getWidth() + 1));
        wordStr = wordStr + document.getElementById(`${currentPosition + newGame.board.getWidth() + 1}`).firstChild.src.slice(-5).replace(".png", "");
        currentPosition = currentPosition + newGame.board.getWidth() + 1;
    }

    return checkWords(newGame, wordStr, wordArr);
}

//get points if needed
//AAAAA given AAA is a word gives three points
function checkWords(newGame, wordStr, wordArr){
    var tempStr = wordStr.slice(0);
    var tempArr = wordArr.slice(0);
    var words = newGame.dictionary.getDictionary();
    var points = 0;
    for(word in words){
        var index = wordStr.indexOf(`${words[word].getName()}`);
        tempArr = wordArr.slice(0);
        while(index > -1 && wordCounted(newGame,tempArr, index, (index + words[word].getName().length - 1)) == false){
            points += words[word].getPoint();
            addCountedWord(newGame,tempArr, index, (index + words[word].getName().length - 1));
            wordStr = wordStr.substring((index + 1));
            for(var i = 0; i <= index; i++){
                tempArr.shift();
            }
            index = wordStr.indexOf(`${words[word].getName()}`);
        }
        //check backwards
        wordStr = tempStr.slice(0);
        wordStr = wordStr.split("").reverse().join("");
        tempArr = wordArr.slice(0);
        tempArr.reverse();
        
        index = wordStr.indexOf(`${words[word].getName()}`);
        while(index > -1 && wordCounted(newGame,tempArr, index, (index + words[word].getName().length - 1)) == false){
            points += words[word].getPoint();
            addCountedWord(newGame,tempArr, index, (index + words[word].getName().length - 1));
            wordStr = wordStr.substring((index + 1));
            for(var i = 0; i <= index; i++){
                tempArr.shift();
            }
            index = wordStr.indexOf(`${words[word].getName()}`);
        }
        wordStr = tempStr.slice(0);
    }
    return points;
}

//This function checks to see if a word was counted
function wordCounted(newGame,wordArr, startIndex, endIndex){
    var flag = new Boolean(false);
    if(startIndex == -1){
        return true;
    }
    if(wordArr.length < endIndex - 1){
        return true;
    }
    var value = wordArr[startIndex];
    for (var i = startIndex + 1; i <= endIndex; i++){
        value = value + '-' + wordArr[i];
    }
    ///TODO implement binary search function (array to search, value to find)
    if(binarySearch(newGame.countedWords, value) != -1){
        flag = true;
    }
    //search for backwards order
    var value = wordArr[endIndex];
    for (var i = endIndex - 1; i >= startIndex; i--){
        value = value + '-' + wordArr[i];
    }

    if(binarySearch(newGame.countedWords, value) != -1){
        flag = true;
    }

    return flag;
}

//This adds a word to the list of counted words
function addCountedWord(newGame, wordArr, startIndex, endIndex){
    var value = wordArr[startIndex];
    for (var i = startIndex + 1; i <= endIndex; i++){
        value = value + '-' + wordArr[i];
    }
    newGame.countedWords.push(value);
    newGame.countedWords.sort();
    //add backwards order as well
    var value = wordArr[endIndex];
    for (var i = endIndex - 1; i >= startIndex; i--){
        value = value + '-' + wordArr[i];
    }
    newGame.countedWords.push(value);
    newGame.countedWords.sort();
}

//This function scans the right diagonal '/'
function RightDiagonal(newGame,placedLetterPosition){
    var currentPosition = placedLetterPosition;
    var wordArr =[currentPosition];
    //add letter at current position to wordStr
    var wordStr = document.getElementById(`${currentPosition}`).firstChild.src.slice(-5).replace(".png", "");
    //get letters left of initial
    while(newGame.board.get(`${currentPosition + newGame.board.getWidth() - 1}`) != null && !(document.getElementById(`${currentPosition + newGame.board.getWidth() - 1}`).firstChild.tagName === "BUTTON")){
        //and new object to the beginning wordArr {char: 'character', position: boardposition}
        //unshift inserts an item to the front of an array
        wordArr.unshift((currentPosition + newGame.board.getWidth() - 1));
        wordStr = document.getElementById(`${currentPosition + newGame.board.getWidth() - 1}`).firstChild.src.slice(-5).replace(".png", "") + wordStr;
        //move current position
        currentPosition = currentPosition + newGame.board.getWidth() - 1;
    }
    //reset currentPosition
    currentPosition = placedLetterPosition;
    //get letters right of initial
    while(newGame.board.get(`${currentPosition - newGame.board.getWidth() + 1}`) != null && !(document.getElementById(`${currentPosition - newGame.board.getWidth() + 1}`).firstChild.tagName === "BUTTON")){
        //add new object to the end of wordArr
        wordArr.push((currentPosition - newGame.board.getWidth() + 1));
        wordStr = wordStr + document.getElementById(`${currentPosition - newGame.board.getWidth() + 1}`).firstChild.src.slice(-5).replace(".png", "");
        currentPosition = currentPosition - newGame.board.getWidth() + 1;
    }

    return checkWords(newGame,wordStr, wordArr);
}

//This function scans the vertical '|'
function Vertical(newGame,placedLetterPosition){
    var currentPosition = placedLetterPosition;
    var wordArr =[currentPosition];
    //add letter at current position to wordStr
    var wordStr = document.getElementById(`${currentPosition}`).firstChild.src.slice(-5).replace(".png", "");
    //get letters left of initial
    while(newGame.board.get(`${currentPosition - newGame.board.getWidth()}`) != null && !(document.getElementById(`${currentPosition - newGame.board.getWidth()}`).firstChild.tagName === "BUTTON")){
        //and new object to the beginning wordArr {char: 'character', position: boardposition}
        //unshift inserts an item to the front of an array
        wordArr.unshift((currentPosition - newGame.board.getWidth()));
        wordStr = document.getElementById(`${currentPosition - newGame.board.getWidth()}`).firstChild.src.slice(-5).replace(".png", "") + wordStr;
        //move current position
        currentPosition = currentPosition - newGame.board.getWidth();
    }
    //reset currentPosition
    currentPosition = placedLetterPosition;
    //get letters right of initial
    while(newGame.board.get(`${currentPosition + newGame.board.getWidth()}`) != null && !(document.getElementById(`${currentPosition + newGame.board.getWidth()}`).firstChild.tagName === "BUTTON")){
        //add new object to the end of wordArr
        wordArr.push((currentPosition + newGame.board.getWidth()));
        wordStr = wordStr + document.getElementById(`${currentPosition + newGame.board.getWidth()}`).firstChild.src.slice(-5).replace(".png", "");
        currentPosition = currentPosition + newGame.board.getWidth();
    }

    return checkWords(newGame,wordStr, wordArr);
}

//This function scans the horizontal '-'
function Horizontal(newGame,placedLetterPosition){
    var currentPosition = placedLetterPosition;
    var wordArr =[currentPosition];
    //add letter at current position to wordStr
    var wordStr = document.getElementById(`${currentPosition}`).firstChild.src.slice(-5).replace(".png", "");
    //get letters left of initial
    while(newGame.board.get(`${currentPosition - 1}`) != null && !(document.getElementById(`${currentPosition - 1}`).firstChild.tagName === "BUTTON")){
        //and new object to the beginning wordArr {char: 'character', position: boardposition}
        //unshift inserts an item to the front of an array
        wordArr.unshift((currentPosition - 1));
        wordStr = document.getElementById(`${currentPosition - 1}`).firstChild.src.slice(-5).replace(".png", "") + wordStr;
        //move current position
        currentPosition = currentPosition - 1;
    }
    //reset currentPosition
    currentPosition = placedLetterPosition;
    //get letters right of initial
    while(newGame.board.get(`${currentPosition + 1}`) != null && !(document.getElementById(`${currentPosition + 1}`).firstChild.tagName === "BUTTON")){
        //add new object to the end of wordArr
        wordArr.push((currentPosition + 1));
        wordStr = wordStr + document.getElementById(`${currentPosition + 1}`).firstChild.src.slice(-5).replace(".png", "");
        currentPosition = currentPosition + 1;
    }

    return checkWords(newGame,wordStr, wordArr);
}

//This function performs a binary search on an array of strings and returns the index of the string
function binarySearch(array, value){
    var maxIndex = array.length-1;
    var minIndex = 0;
     while(minIndex<=maxIndex){
        var mid = (maxIndex + minIndex)/2 | 0;
        if(array[mid] > value){
            maxIndex = mid - 1;
        }
        else if(array[mid] < value){
            minIndex = mid + 1;
        }
        else{
            return mid;
        }
    }
    return -1
}


//This function tests the wordCounted function
/*(function(){
    var wordArray = [{char: "a", position: "1"},{char: "b", position: "2"},{char: "c", position: "3"},{char: "d", position: "4"},{char: "e", position: "5"},{char: "f", position: "6"}];
    var Start = 2;
    var End = 4;
    countedWords.addWord("2-3-4");
    countedWords.addWord("4-3-2");
    if(wordCounted(newGame,wordArray, Start, End) == false){
        console.log("wordCounted produced an incorrect result")
    }
    if(wordCounted(newGame,wordArray, (Start + 1), End) == true){
        console.log("wordCounted produced an incorrect result")
    }
})();

//This function tests the addCountedWord function
(function(){
    var wordArray = [{char: "a", position: "1"},{char: "b", position: "2"},{char: "c", position: "3"},{char: "d", position: "4"},{char: "e", position: "5"},{char: "f", position: "6"}];
    var Start = 2;
    var End = 4;
    addCountedWord(wordArray, Start, End);
    if(binarySearch(countedWords.get(), "2-3-4") != -1){
        console.log("addCountedWord produced an incorrect result")
    }
    if(binarySearch(countedWords.get(), "4-3-2") != -1){
        console.log("addCountedWord produced an incorrect result")
    }
})();*/
