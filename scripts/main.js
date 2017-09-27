var ticTacMain = null;
var duckLayer = null;

function startGame(){
	var dimension = $("input[name='grid']:checked").val();
	var winCond = $("input[name='win']:checked").val();
	if(winCond=="default"||winCond>dimension){
		winCond = dimension;
	}
	ticTacMain = new TicTacMain(dimension,winCond);
	duckLayer = new DuckLayer();
	ticTacMain.createBoard(dimension);
}

$(document).ready(function(){
	$('.startButton').click(startGame);
});