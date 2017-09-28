function TicTacMain(dim,winCond){	//will eventually need to take in winning condition number
	this.self = this;
	this.dimension = dim;
	this.winNumber = winCond; 
	this.playerTurn = 0;	//will always be either 0 or 1
							/*player turn tracker
								0 : o turn  ||| 1 : x turn*/
	this.availableSquareArray = []; //will be populated createBoard containing all square ids
	this.player0Squares = []; //ids of player occupied squares
	this.player1Squares = []; 
	this.createBoard = function(){
		var divRowHeight = 100/this.dimension;
		var gameSquareWidth = 100/this.dimension;
		for(var i=0; i<this.dimension; i++){
			$('<div>').addClass('row').attr('id','row'+i).appendTo('.gameScreenMonitor').css('height',divRowHeight+'%');
			for(var j=0; j<this.dimension; j++){
				$('<div>').addClass('gameSquare').attr('id',i.toString()+j.toString()).css({'width':gameSquareWidth+'%','height':'100%'}).click(self.clickGameSquare).appendTo('#row'+i);
				this.availableSquareArray.push(i.toString()+j.toString());
			}
		}
		console.log(this.availableSquareArray);
	}.bind(this);

	this.clickGameSquare = function(squareID){ //will have $().attr('id') passed in
        //conditional checking player turn was removed | duck object can access that data
		for(var i=0; i<duckLayer.duckOccupiedSquares.length; i++){	//traverse through available squares with ducks inside them
			if(duckLayer.duckOccupiedSquares[i]==squareID){	//if clicked squareID is inside the array, call hitDuck function
				// return duck.hitDuck();	//may need to use return before function call to exit loop
				duckLayer.hitDuck(squareID);	//hitDuck function needs to update player0/1Squares array
			}
			else if(duckLayer.dogOccupiedSquares[i]==squareID){
				//FUNCTION THAT ENDS GAME
			}
		}
	};

	//needs to call hitDuck in duck object
	//places either x or o on the square
	//go through duckoccupied square in duck object to check condition
			// will call function that switches player turn - changePalyerTurn
			//needs to call function that updates global array of available squares
			//splice squareID from availableSquareArray and push to playerSquare array to current player

	this.changePlayerTurn = function(){
		console.log("ran changePlayerTurn");
		if(this.playerTurn == 0){
			this.playerTurn = 1;
			$('.player0Area').unbind('click', playerTurnStart);
			$('.player1Area').bind('click',playerTurnStart);
            console.log("player 2 turn");
			return;
		}else if(this.playerTurn == 1){
            this.playerTurn = 0;
			$('.player1Area').unbind('click',playerTurnStart);
			$('.player0Area').bind('click',playerTurnStart);
            console.log("player 1 turn");
			return;
		}
		//unlocks gun for current player
		//change crosshairs to match current player
	}; 
	/*called by placePiece either decrement or increment playerTurn depending on player turn
		duck obje*/

	/*function for winning condition*/
	/*for checking win condition call the three functions after the function that places player markers on the board
	e.g.
		ticTacMain.checkWinRow();
		ticTacMain.checkWinCol();
		ticTacMain.checkWinDiag();	*/
	this.checkWinRow = function (){
		var player0Pt = 0;	//if there are enough consequtive rows in play, this point will match the necessary win square number
		var player1Pt = 0;
		for(var i=0; i<this.dimension;i++){		//outer loop iterates rows
			for(var j=0; j<this.dimension;j++){	//inner loop iterates through each square inside the row
				var currentSquare = $('#'+i+j); //targets the current square in iteration for comparison
				if(currentSquare.hasClass('player0Sq')){	//if the square has class matching whichever player that clicked; checking square div class not image class
					player0Pt++;							//increment the matching player's point checker
				}else{					
					player0Pt = 0;							//if there is a gap in the middle of missing square, 
				}											//point is set back to zero; essentially check if squares available are consequtive
				if(currentSquare.hasClass('player1Sq')){
					player1Pt++;
				}else{
					player1Pt = 0;
				}
				if(player0Pt ==this.winNumber){
					console.log('player 0 wins; triggered at row win check');
					//call function that updates ui with player 0 win
				}
				if(player1Pt == this.winNumber){
					console.log('player 1 wins; triggered tat row win check');
					//call function updating ui with player 1 win
				}
			}
		}
	};
	this.checkWinCol = function(){
		var player0Pt = 0;
		var player1Pt = 0;
		for(var i=0; i<this.dimension; i++){ 		//outer loop keeps id number confined to column
			for(var j=0; j<this.dimension; j++){ 	//inner loop iterates through each row at every column
				var currentSquare = $('#'+j+i);
				if(currentSquare.hasClass('player0Sq')){
					player0Pt++;
				}else{
					player0Pt = 0;
				}
				if(currentSquare.hasClass('player1Sq')){
					player1Pt++;
				}else{
					player1Pt = 0;
				}
				if(player0Pt == this.winNumber){
					console.log('player 0 wins; triggered at col win check');
					//call function updating ui with player 0 win
				}
				if(player1Pt == this.winNumber){
					console.log('player 1 wins; triggered at col win check');
				}
			}
		}
	};
	this.checkWinDiag = function(){ 		//this function checks both tLeft-bRight and tRight-bLeft diagonals
		var player0PtLR = 0; 
		var player1PtLR = 0;
		for(var i=0; i<this.dimension; i++){ 	//checking top left to bottom right
			var currentSquare = $('#'+i+i);		//the col/row index in this direction should increment equally; therefore only one loop
			if(currentSquare.hasClass('player0Sq')){
				player0PtLR++;
			}else{
				player0PtLR = 0;
			}
			if(currentSquare.hasClass('player1Sq')){
				player1PtLR++;
			}else{
				player1PtLR = 0; 
			}
			if(player0PtLR == this.winNumber){
				console.log('plaer 0 wins; triggered at diagonal win check');
				//call function for ui update
				return;
			}
			if(player1PtLR == this.winNumber){
				console.log('player 1 wins; triggered at diagonal win check');
				return;
			}
		}
		var player0PtRL = 0;
		var player1PtRL = 0;
		for(var i=0; i<this.dimension; i++){
			for(var j=this.dimension-1; j>=0; j--){
				var currentSquare2 = $('#'+i+j);
				if(currentSquare2.hasClass('player0Sq')){
					player0PtRL++;
				}else{
					player0PtRL = 0;
				}
				if(currentSquare2.hasClass('player1Sq')){
					player1PtRL++;
				}else{
					player1PtRL = 0;
				}
				if(player0PtRL == this.winNumber){
					console.log('player 0 wins; triggered at diagonal win check');
					//call function for ui update
					return;
				}
				if(player1PtRL == this.winNumber){
					console.log('player 1 wins; triggered at diagonal win check');
					return;
				}
			}
		}
	};

};

// <script>
//         var sideNum = 5;
//         var clickNum = 0;

//         function createBoard(sideNum) {
//             for (var i = 0; i < sideNum; i++) {
//                 $('<div>').addClass('row').attr("id", "row" + i).appendTo('body');
//                 for (var j = 0; j < sideNum; j++) {
//                     $('<div>').addClass('square').attr('id', i.toString() + j.toString()).click(addMark).appendTo('#row' + i);
//                 }
//             }
//         }
//         function addMark() {
//             if (clickNum == 0 && $(this).text() == '') {
//                 $(this).html('<span>x</span>');
//                 clickNum++;
//             } else if (clickNum == 1 && $(this).text() == '') {
//                 $(this).html('<span>o</span>');
//                 clickNum--;
//             }
//             checkVictoryRowX();
//             checkVictoryColX();
//             checkCrossX();
//         }
//         function checkVictoryRowX(){
//             var pointsX = 0;
//             for(var i = 0; i<sideNum; i++){
//                 for(var j =0; j<sideNum; j++){
//                     var checkX= $("#"+i+j);
//                     if(checkX.text() == "x"){
//                         pointsX++
//                     }
//                     else{
//                         pointsX=0;
//                     }
//                     if(pointsX==sideNum){
//                         console.log("Victory");
//                         $("<div>").text("victory").appendTo("body");
//                         return;
//                     }
//                 }
//             }
//         }
//         function checkVictoryColX(){
//             var pointsX = 0;
//             for(var i = 0; i<sideNum; i++){
//                 for(var j =0; j<sideNum; j++){
//                     var checkX= $("#"+j+i);
//                     if(checkX.text() == "x"){
//                         pointsX++
//                     }
//                     else{
//                         pointsX=0;
//                     }
//                     if(pointsX==sideNum){
//                         console.log("Victory");
//                         $("<div>").text("victory").appendTo("body");
//                         return;
//                     }
//                 }
//             }
//         }
//         function checkCrossX(){
//             var pointsX = 0;
//             for(var i = 0; i<sideNum; i++){
//                 var j = i;
//                 var checkX= $("#"+i+j);
//                 if(checkX.text() == "x"){
//                     pointsX++
//                 }
//                 else{
//                     pointsX=0;
//                 }
//                 if(pointsX==sideNum){
//                     console.log("Victory");
//                     $("<div>").text("victory").appendTo("body");
//                     return;
//                 }
//             }
//             var pointsX2 = 0;
//             for(var i = 0; i<sideNum; ){
//                 for(var j=sideNum-1; j>-1 ; j--){
//                     var checkX=$("#"+i+j);
//                     if(checkX.text() == "x"){
//                         pointsX2++;
//                     }
//                     else{
//                         pointsX2=0;
//                     }
//                     if(pointsX2==sideNum){
//                         console.log("Victory");
//                         $("<div>").text("victory").appendTo("body");
//                         return;
//                     }
//                     i++;
//                 }
//             }
//         }

// //        $("<div>").text("victory").appendTo("body");
//         function clickHandled(){
//             var sideNum = $("#playerInput").val();
//             createBoard(sideNum);
//         }

//         $(document).ready(function() {
//             $("button").click(clickHandled);
// //            createBoard(sideNum);
// //            $('.square').click(addMark);
//         });

//     </script>