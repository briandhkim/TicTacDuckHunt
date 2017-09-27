var TicTacMain = function(dim){
	this.dimension = dim;
	this.playerTurn = 0;	//will always be either 0 or 1
							/*player turn tracker
								0 : o turn  ||| 1 : x turn*/
	this.availableSquareArray = []; //will be populated createBoard containing all square ids
	this.player0Squares = []; //ids of player occupied squares
	this.player1Squares = []; 
	this.createBoard = function(){
		var divRowHeight = Math.floor(100/this.dimension);
		var gameSquareWidth = Math.floor(100/this.dimension);
		for(var i=0; i<this.dimension; i++){
			$('<div>').addClass('row').attr('id','row'+i).appendTo('.gameScreenMonitor').css('height',divRowHeight+'%');
			for(var j=0; j<this.dimension; j++){
				$('<div>').addClass('gameSquare').attr('id',i.toString()+j.toString()).css({'width':gameSquareWidth+'%','height':'100%'}).click(self.placePiece).appendTo('#row'+i);
				this.availableSquareArray.push(i.toString()+j.toString());
			}
		}
		console.log(this.availableSquareArray);
	};

	this.placePiece = function(squareID){}; //places either x or o on the square
			// will call function that switches player turn - changePalyerTurn
			//needs to call function that updates global array of available squares
			//splice squareID from availableSquareArray and push to playerSquare array to current player

	this.changePlayerTurn = function(){}; 
	/*called by placePiece either decrement or increment playerTurn depending on player turn
		duck obje*/

	/*function for winning condition*/

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