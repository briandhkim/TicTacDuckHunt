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
var playerTurnStartClicked = false;

function startGame(){
	if(!gameStarted){
		var dimension = $("input[name='grid']:checked").val();
		var winCond = $("input[name='win']:checked").val();
		if(winCond=="default"||winCond>dimension){
			winCond = dimension;
		}
		ticTacMain = new TicTacMain(dimension,winCond);
		duckLayer = new DuckLayer();
        // duckLayer.duckAnimation();
		audioHandler = new AudioHandler(); //audioHandler missing var| set var audioHandler to null up top (Brian)
		ticTacMain.createBoard(dimension);
		$('.gameScreenMonitor').removeClass('cursorDefault');
		$('.container-fluid').removeClass('gunCursorDefault').addClass('gunCursorPlayer0');
		$('.gameScreenMonitor').addClass('cursorPlayer0');
		$('.player0Name').addClass('playerFocusHighlight');
		$('.player0Area').bind('click',playerTurnStart);
		$('.winnerMessageDisplay').text("player1 click gun to start");
		gameStarted = true;
        audioHandler.start();
        $(".instructionsMenu").hide();
        displayUIMenu("Player 1: Press your zapper to start your turn!")

	}
}

function resetGame(){
	if(gameStarted){
		gameStarted = false;
		$('.container-fluid').removeClass('gunCursorPlayer0 gunCursorPlayer1').addClass('gunCursorDefault');
		$('.gameSquare').remove();
		$('.gameScreenMonitor .row').remove();
		$('.gameScreenMonitor').removeClass('cursorPlayer0 cursorPlayer1').addClass('cursorDefault');
		$('.player0Name, .player1Name').removeClass('playerFocusHighlight');
		$('.player0Area, .player1Area').unbind('click',playerTurnStart);
		$('.player0ScoreVal, .player1ScoreVal').text('0');
		$('.winnerMessageDisplay').text('select options above and click start');
		ticTacMain = null;
		duckLayer.timerTimeRemaining = 0;
		duckLayer = null;
		audioHandler = null;
		playerTurnStartClicked = false;
		displayUIMenu("Select board size, number of ducks for win, and press START")
	}
	// location.reload();
}

function removeUIMenu(){
	$(".uiMenu").hide();
}
function displayUIMenu(message){
    $(".uiMenu").show();
	$(".uiMenuText").text(message).css("text-align", "center")/*.css("display", "flex");*/
    // $(".uiMenuText").css("margin", "0 8px 0 8px")
}

//add and remove this click handler by class toggle in tictac object
function playerTurnStart(){		//click handler for player areas  | starts each player's turn and timer
	removeUIMenu();
	if(gameStarted&&!playerTurnStartClicked){
		playerTurnStartClicked = true;
		if(ticTacMain.playerTurn == 0){
			$('.winnerMessageDisplay').text('player 1 is playing');
		}else if (ticTacMain.playerTurn ==1){
			$('.winnerMessageDisplay').text('player 2 is playing');
		}
		duckLayer.startTimer();
	}
}

$(document).ready(function(){
	$('.startButton').click(startGame);
	$('.restartButtonDiv').click(resetGame);
	$('#condition-4, #condition-5[type=radio]').attr('disabled',true);
	$('.radioGridSelectInput').change(function(){
		if(!$('#grid-5[type=radio]').is(':checked')){
			$('#condition-5[type=radio]').attr('disabled',true);
		}
		if(!$('#grid-4[type=radio]').is(':checked')){
			$('#condition-4[type=radio]').attr('disabled',true);
		}
		if($('#grid-4').is(':checked')){
			$('#condition-4[type=radio]').attr('disabled',false);
		}else if($('#grid-5').is(':checked')){
			$('#condition-4,#condition-5[type=radio]').attr('disabled',false);
		}
	});
});

//click handlers for guns that initiate duckLayer.startTimer()
