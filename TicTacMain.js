ar TicTacMain = function(dimension){
	this.dimension = dimension;
	this.playerTurn = 0;	//will always be either 0 or 1
							/*player turn tracker
								0 : o turn  ||| 1 : x turn*/
	this.availableSquareArray = []; //will be populated createBoard containing all square ids
	this.createBoard = function(dimension){};

	this.placePiece = function(squareID){}; //places either x or o on the square
			// will call function that switches player turn
			//needs to call function that updates global array of available squares
			//splice squareID from availableSquareArray

	this.changePlayerTurn = function(){}; 
	/*called by placePiece either decrement or increment playerTurn depending on player turn
		duck obje*/

	/*function for winning condition*/

};