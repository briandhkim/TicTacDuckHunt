function DuckLayer(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.dogOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;
    this.interval = 500;
    this.percentChangeDuckAppears = 0.90;
    this.duckDurations = {}; //key = time spent in square, value = ID of square
    this.pointPerDuck = 10;
    this.timeRemaining = 5000;
    this.timer = null;
    this.timePerInterval = 10;

    this.startTimer = function(){ //Clicking on player gun starts turn = starts timer
        if (this.duckHit === false){ //check if duckHit === false
            this.playerTimer = setInterval(this.intervalFunction, this.interval); // will call generateDucks every half a second and generateDucks will either have the duck or not
            this.startTimerCountdown();
        }
    };

    this.startTimerCountdown = function(){
        this.timer = setInterval(this.timerAnimation, this.timePerInterval);
    };

    this.timerAnimation = function(){
        this.timeRemaining -= 10;
        if(this.timeRemaining <= 0){
            this.timeRemaining = 0;
            clearInterval(this.timer);
            console.log('time ran out');
        }
        var percentRemaining = this.timeRemaining / this.turnTime * 100;
        $(".timer").css('width', percentRemaining + '%');
    }.bind(this);


    this.intervalFunction = function(){
        this.generateRandomDuck();
        this.removeRandomGeneratedDuck();
    }.bind(this);

    this.stopTimer = function(){
        this.currentTurnTime = 0;
        // console.log("Stop timer called");
        clearInterval(this.playerTimer); //stopping duck creation
        this.checkWinCondition(); //check win
        this.updateDisplay(); //updateDisplay
        this.resetDuckVar();
        ticTacMain.changePlayerTurn(); //this.changePlayerTurn
    };

    this.checkWinCondition = function(){
        ticTacMain.checkWinCol();
        ticTacMain.checkWinRow();
        ticTacMain.checkWinDiag();
    };

    this.resetDuckVar = function(){
        this.duckOccupiedSquares = [];
        this.dogOccupiedSquares = [];
        this.duckHit = false;
        this.currentTurnTime = 0;
        this.duckDurations = {};
    };

    this.generateRandomDuck = function() {
        // console.log("generateDuck ran");
        this.currentTurnTime += this.interval; //adding half a second to currentTurnTime every time the interval runs
        if (this.currentTurnTime >= this.turnTime) { //checking if currentTime === 5 seconds and if it is, stopTimer
            this.stopTimer();
        }

        if (this.duckOccupiedSquares.length === 3) {            //determine percentage change of duck creation
            return                                              //looking at the length of duckOccupiedSquares array to determine the percentChange
        }
        else if (this.duckOccupiedSquares.length === 2) {
            this.percentChangeDuckAppears = 0.33
        }
        else if (this.duckOccupiedSquares.length === 1) {
            this.percentChangeDuckAppears = 0.75
        }
        else if (this.duckOccupiedSquares.length === 0) {
            this.percentChangeDuckAppears = 0.9
        }

        var checkToProceed = Math.random(); //creates random number 0-1
        if(checkToProceed > this.percentChangeDuckAppears){ //if random number > percent given above
            return
        }

        //chance of dog
        var dogGenerate = false;
        if(this.dogOccupiedSquares.length === 0){
            if(Math.random() < 0.10){
                dogGenerate = true;
            }
        }

        var availableUnoccupiedSquares = [];
        for(var i = 0; i < ticTacMain.availableSquareArray.length; i++){ //looping through array in ticTacMain.js containing all available div IDs
            if(this.duckOccupiedSquares.indexOf(ticTacMain.availableSquareArray[i]) === -1 && this.dogOccupiedSquares.indexOf(ticTacMain.availableSquareArray[i]) === -1){ //checking if duckOccupied squares array contains the same ID in the availableSquareArray
                availableUnoccupiedSquares.push(ticTacMain.availableSquareArray[i]) //if there is no match, push those IDs to newly made array
            }
        }

        var randomIndex = Math.floor(Math.random() * availableUnoccupiedSquares.length); //making random index based on availableUnoccupiedSquares length
        var randomDuckSquare = availableUnoccupiedSquares[randomIndex]; //assigning the unoccupiedSquare at index of randomDuckSquare, or duck, to a var
        // console.log(randomDuckSquare);
        if(!dogGenerate){//a duck now occupies that square so push the ID of the square to the duckOccupiedSquares array
            this.duckOccupiedSquares.push(randomDuckSquare);
        }
        else{
            this.dogOccupiedSquares.push(randomDuckSquare);
        }
        var baseTimeWindow = this.turnTime / 5; //1000
        var percentageOfBaseTimeWindow = (Math.floor(Math.random()*(15-5))+5) * 0.1;
        var duckDuration = baseTimeWindow * percentageOfBaseTimeWindow;
        var duckLeaveTime = duckDuration + this.currentTurnTime;
        this.duckDurations[duckLeaveTime] = randomDuckSquare;
        // console.log("Duck created at" + randomDuckSquare + " and will leave at " + duckLeaveTime + "at time" + this.currentTurnTime)
        if(!dogGenerate) {
            $("#" + randomDuckSquare).css("background-image", "assets/p0_duck01.png no-repeat center");
        }
        else{
            $("#" + randomDuckSquare).css("background-image", "assets/dog01.png no-repeat center");
        }
    };

    this.removeRandomGeneratedDuck = function(){
        for(var key in this.duckDurations){ //looking for key in duckDurations object
            // console.log("KEY IS :" + key + " currentTime is :" + this.currentTurnTime);
            if(parseInt(key) <= this.currentTurnTime){ //if the key (time spent in square) is <= the currentTurnTime then remove duck
                var ID = this.duckDurations[key];
                // console.log(ID + "removed at time of " + this.currentTurnTime);
                if(this.duckOccupiedSquares.indexOf(this.duckDurations[key] !== 1)) {
                    var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.duckOccupiedSquares.splice(indexToRemove);
                }
                else{
                    var indexToRemove = this.dogOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.dogOccupiedSquares.splice(indexToRemove);
                }
                $("#" + ID).css("background-image", "none");
            }
        }
    };

    // this.duckAnimation = function(){
    //     var player0animation = ['assets/p0_duck01', 'assets/p0_duck02', 'assets/p0_duck03', ];
    // };

    this.hitDuck = function(squareId) {
        this.duckHit = true; //changing duckHit to true if duck was in div clicked
        this.stopTimer();
        if (ticTacMain.playerTurn === 0) {
            this.player0Score += this.pointPerDuck; //update this.player0Score
            ticTacMain.player0Squares.push(squareId);
        } else {
            this.player1Score += this.pointPerDuck; //update this.player1Score
            ticTacMain.player1Squares.push(squareId);
        }
        this.updateDisplay(); //updates the display
    };

    this.updateDisplay = function() {
        var gameSquareID = [];
        $(".gameSquare").each(function() { //creating object of all elements with class of "gameSquare"
            var tempID = $(this).attr('id');
            gameSquareID.push(tempID);
            // console.log(gameSquareID);
        });
        for (var j = 0; j < gameSquareID.length; j++) { //put dead ducks on squares based on ticTacMain.player0Squares
            for (var p0 = 0; p0 < ticTacMain.player0Squares.length; p0++) {
                if (gameSquareID.indexOf(ticTacMain.player0Squares[p0]) !== -1) {
                    $('.' + gameSquareID[j]).css('background-image', 'assets/p0_duckDead.png');
                }
            }
            for (var p1 = 0; p1 < ticTacMain.player1Squares.length; p1++) { //put dead ducks on squares based on ticTacMain.player1Squares
                if (gameSquareID.indexOf(ticTacMain.player1Squares[p1]) !== -1) {
                    $('.' + gameSquareID[j]).css('background-image', 'assets/p1_duckDead.png');
                }
            }
        }
        if (ticTacMain.playerTurn === 0) { //updateScore in html.index;
            $('.player0ScoreVal').text(this.player0Score);
        } else {
            $('.player1ScoreVal').text(this.player1Score);
        }
        ticTacMain.changePlayerTurn(); //calls ticTacMain.changePlayerTurn
    };
}

