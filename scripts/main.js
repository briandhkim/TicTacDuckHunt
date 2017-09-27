var ticTacMain = null;
var duck = null;

function startGame(){
	var dimension = $("input[name='grid']:checked").val();
	ticTacMain = new TicTacMain(dimension);
	duck = new DuckLayer();
	ticTacMain.createBoard(dimension);
}

$(document).ready(function(){
	$('.startButton').click(startGame);
});