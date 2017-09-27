var ticTacMain = null;
var duckLayer = null;

function startGame(){
	var dimension = $("input[name='grid']:checked").val();
	ticTacMain = new TicTacMain(dimension);
	duckLayer = new DuckLayer();
	ticTacMain.createBoard(dimension);
}

$(document).ready(function(){
	$('.startButton').click(startGame);
});