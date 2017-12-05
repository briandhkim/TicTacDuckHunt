var ticTacMain = null;
var duckLayer = null;
var audioHandler = null;
var gameStarted =false;
var playerTurnStartClicked = false;

function startGame(){
	//start game
	if(!gameStarted){
		var dimension = $("input[name='grid']:checked").val();
		var winCond = $("input[name='win']:checked").val();


        $('#condition-3:not(:checked), #condition-4:not(:checked), #condition-5:not(:checked)').prop('disabled',true);
        $('#grid-3:not(:checked), #grid-4:not(:checked), #grid-5:not(:checked)').prop('disabled',true);

		ticTacMain = new TicTacMain(dimension,winCond);
		duckLayer = new DuckLayer();
		audioHandler = new AudioHandler(); //audioHandler missing var| set var audioHandler to null up top (Brian)
		ticTacMain.createBoard(dimension);
		$('.gameScreenMonitor').removeClass('cursorDefault');
		$('.container-fluid').removeClass('gunCursorDefault').addClass('gunCursorPlayer0');
		$('.gameScreenMonitor').addClass('cursorPlayer0');
		$('.player0Name').addClass('playerFocusHighlight');
		$('.player0Area').bind('click',playerTurnStart);
        $('.player1Area').css("opacity","0.3");
        $('.player1Score').css("opacity","0.3");
		$('.winnerMessageDisplay').text("player1 click gun to start");
		gameStarted = true;
        audioHandler.start();
        $(".instructionsMenu").hide();
        displayUIMenu("Player 1: Press your zapper to start your turn!")
	}
	//reset game
	else{
        gameStarted = false;

        $('#condition-3, #condition-4, #condition-5').prop('disabled',false);
        $('#grid-3, #grid-4, #grid-5').prop('disabled',false);

        $(".animateDuck0").removeClass("animateDuck0");
        $(".animateDuck1").removeClass("animateDuck1");
        $(".animateDog").removeClass("animateDog");
        duckLayer.stopTimer();
        $('.container-fluid').removeClass('gunCursorPlayer0 gunCursorPlayer1').addClass('gunCursorDefault');
        $('.gameSquare').remove();
        $('.gameScreenMonitor .row').remove();
        $('.gameScreenMonitor').removeClass('cursorPlayer0 cursorPlayer1').addClass('cursorDefault');
        $('.player0Name, .player1Name').removeClass('playerFocusHighlight');
        $('.player0Area, .player1Area').unbind('click',playerTurnStart);
        $('.player0Area').css("opacity","1");
        $('.player1Area').css("opacity","1");
        $('.player0Score').css("opacity","1");
        $('.player1Score').css("opacity","1");
        $('.player0ScoreVal, .player1ScoreVal').text('0');
        $('.winnerMessageDisplay').text('select options above and click start');
        ticTacMain = null;
        duckLayer.timerTimeRemaining = 0;
        duckLayer = null;
        audioHandler = null;
        playerTurnStartClicked = false;
        displayUIMenu("Select board size, number of ducks in a row to win, and press START to play!")
	}
}

function removeUIMenu(){
	$(".uiMenu").hide();
}
function displayUIMenu(message){
    $(".uiMenu").show();
	$(".uiMenuText").text(message).css("text-align", "center")/*.css("display", "flex");*/
    $(".uiMenuText").css("margin", "0 20px")
}

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
	//set browser zoom to 100%
    document.body.style.webkitTransform =  1;    // Chrome, Opera, Safari
    document.body.style.msTransform =   1;       // IE 9
    document.body.style.transform = 1;     // General
	$('.startButton').click(startGame);
	$('#condition-4, #condition-5[type=radio]').attr('disabled',true);
	$('.radioGridSelectInput').change(function(){
		if(!$('#grid-5[type=radio]').is(':checked')){
			$('#condition-5[type=radio]').attr('disabled',true);
		}
		if(!$('#grid-4[type=radio]').is(':checked')){
			$('#condition-4[type=radio]').attr('disabled',true);
		}
        if($('#grid-3').is(':checked')){
            $('#condition-3[type=radio]').prop("checked", true)
		}
		if($('#grid-4').is(':checked')){
			$('#condition-4[type=radio]').attr('disabled',false);
            $('#condition-4[type=radio]').prop("checked", true)

		}if($('#grid-5').is(':checked')){
			$('#condition-4,#condition-5[type=radio]').attr('disabled',false);
            $('#condition-5[type=radio]').prop("checked", true)
		}
	});
});