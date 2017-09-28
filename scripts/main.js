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
		audioHandler = new AudioHandler();
		ticTacMain.createBoard(dimension);
		$('body').removeClass('cursorDefault');
		$('body').addClass('cursorPlayer0');
		$('.player0Area').bind('click',playerTurnStart);
		gameStarted = true;
        audioHandler.start();
	}
}

//add and remove this click handler by class toggle in tictac object
function playerTurnStart(){		//click handler for player areas  | starts each player's turn and timer
	if(gameStarted){
		duckLayer.startTimer();
	}
}

$(document).ready(function(){
	$('.startButton').click(startGame);
});

//click handlers for guns that initiate duckLayer.startTimer()
