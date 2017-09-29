var ticTacMain = null;
var duckLayer = null;
var gameStarted =false;

function startGame(){
	if(!gameStarted){
		var dimension = $("input[name='grid']:checked").val();
		var winCond = $("input[name='win']:checked").val();
		if(winCond=="default"||winCond>dimension){
			winCond = dimension;
		}
		ticTacMain = new TicTacMain(dimension,winCond);
		duckLayer = new DuckLayer();
        duckLayer.duckAnimation();
		audioHandler = new AudioHandler();
		ticTacMain.createBoard(dimension);
		$('body').removeClass('cursorDefault');
		$('body').addClass('cursorPlayer0');
		$('.player0Name').addClass('playerFocusHighlight');
		$('.player0Area').bind('click',playerTurnStart);
		gameStarted = true;
        audioHandler.start();
	}
}

function resetGame(){
	// if(gameStarted){
	// 	gameStarted = false;
	// 	$('.gameSquare').remove();
	// 	$('body').removeClass('cursorPlayer0').addClass('cursorDefault');
	// 	$('.player0Name').addClass('playerFocusHighlight');
	// 	$('.player0Area').unbind('click',playerTurnStart);
	// 	ticTacMain = null;
	// 	duckLayer = null;
	// 	audioHandler = null;
	// }
	location.reload();
}

//add and remove this click handler by class toggle in tictac object
function playerTurnStart(){		//click handler for player areas  | starts each player's turn and timer
	if(gameStarted){
		duckLayer.startTimer();
	}
}

$(document).ready(function(){
	$('.startButton').click(startGame);
	$('.restartButtonDiv').click(resetGame);
});

//click handlers for guns that initiate duckLayer.startTimer()
