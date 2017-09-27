function startGame(){
	var dimension = $("input[name='grid']:checked").val();
	var ticTacMain = new TicTacMain(dimension);
	var duck = new DuckLayer();
	ticTacMain.createBoard(dimension);
}

$(document).ready(function(){
	$('.startButton').click(startGame);
});