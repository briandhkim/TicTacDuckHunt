/*Saturday edit notes - brian
audioHandler is not instantiated before being used - added var aduiHandler=null below var gameStarted
reset button had remove/addClass typo - fixed typo
score was not reset to blank(or zero) when reset was pressed
added 0 to html playerScore span - a395d5b(github commit id thing)
cursor confined to gameScreenMonitor
winnerDisplayMessage area message added
*/
var ticTacMain = null;
var duckLayer = null;
var gameStarted =false;
var audioHandler = null;

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
		audioHandler = new AudioHandler();	//audioHandler missing var| set var audioHandler to null up top (Brian)
		ticTacMain.createBoard(dimension);
		$('.gameScreenMonitor').removeClass('cursorDefault');
		$('.gameScreenMonitor').addClass('cursorPlayer0');
		$('.player0Name').addClass('playerFocusHighlight');
		$('.player0Area').bind('click',playerTurnStart);
		gameStarted = true;
        audioHandler.start();
	}
}

function resetGame(){
	if(gameStarted){
		gameStarted = false;
		$('.gameSquare').remove();
		$('.gameScreenMonitor').removeClass('cursorPlayer0 cursorPlayer1').addClass('cursorDefault');
		$('.player0Name, .player1Name').removeClass('playerFocusHighlight');
		$('.player0Area, .player1Area').unbind('click',playerTurnStart);
		$('.player0ScoreVal, .player1ScoreVal').text('0');
		$('.winnerMessageDisplay').text('select options above and click start');
		ticTacMain = null;
		duckLayer = null;
		audioHandler = null;
	}
	// location.reload();
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
