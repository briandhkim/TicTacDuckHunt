var DuckLayer = function(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;
    this.interval = 500;
    this.percentChangeDuckAppears = 0.90;
    this.duckDurations = {}; //key = time spent in square, value = ID of square
    this.pointPerDuck = 10;

    this.startTimer = function(){ //Clicking on player gun starts turn = starts timer
        if (this.duckHit === false){ //check if duckHit === false
            this.playerTimer = setInterval(this.intervalFunction, this.interval); // will call generateDucks every half a second and generateDucks will either have the duck or not
        }
    };

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

        var availableUnoccupiedSquares = [];
        for(var i = 0; i < ticTacMain.availableSquareArray.length; i++){ //looping through array in ticTacMain.js containing all available div IDs
            if(this.duckOccupiedSquares.indexOf(ticTacMain.availableSquareArray[i]) === -1){ //checking if duckOccupied squares array contains the same ID in the availableSquareArray
                availableUnoccupiedSquares.push(ticTacMain.availableSquareArray[i]) //if there is no match, push those IDs to newly made array
            }
        }

        var randomIndex = Math.floor(Math.random() * availableUnoccupiedSquares.length); //making random index based on availableUnoccupiedSquares length
        var randomDuckSquare = availableUnoccupiedSquares[randomIndex]; //assigning the unoccupiedSquare at index of randomDuckSquare, or duck, to a var
        // console.log(randomDuckSquare);
        this.duckOccupiedSquares.push(randomDuckSquare); //a duck now occupies that square so push the ID of the square to the duckOccupiedSquares array

        var baseTimeWindow = this.turnTime / 5; //1000
        var percentageOfBaseTimeWindow = (Math.floor(Math.random()*(15-5))+5) * 0.1;
        var duckDuration = baseTimeWindow * percentageOfBaseTimeWindow;
        var duckLeaveTime = duckDuration + this.currentTurnTime;
        this.duckDurations[duckLeaveTime] = randomDuckSquare;
        // console.log("Duck created at" + randomDuckSquare + " and will leave at " + duckLeaveTime + "at time" + this.currentTurnTime)
        $("#"+randomDuckSquare).css("background", "red");
    };

    this.removeRandomGeneratedDuck = function(){
        for(var key in this.duckDurations){ //looking for key in duckDurations object
            // console.log("KEY IS :" + key + " currentTime is :" + this.currentTurnTime);
            if(parseInt(key) <= this.currentTurnTime){ //if the key (time spent in square) is <= the currentTurnTime then remove duck
                var ID = this.duckDurations[key];
                // console.log(ID + "removed at time of " + this.currentTurnTime);
                var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations[key]);
                this.duckOccupiedSquares.splice(indexToRemove);
                $("#" + ID).css("background", "blue")
            }
        }
    };


    this.hitDuck = function(squareId) {
        this.duckHit = true; //changing duckHit to true if duck was in div clicked
        this.stopTimer();
        if (ticTacMain.playerTurn === 0) { //update this.player0Score and this.player1Score
            this.player0Score += this.pointPerDuck;
        } else {
            this.player1Score += this.pointPerDuck;
        }
        this.updateDisplay(); //updates the display
    };

    this.updateDisplay = function() {
        //put dead ducks on squares based on ticTacMain.player0Squares and ticTacMain.player1Squares
        //updateScore in html.index;
        if ('.gameScore')//add duck to screen
        ticTacMain.changePlayerTurn(); //calls ticTacMain.changePlayerTurn
    };
};

