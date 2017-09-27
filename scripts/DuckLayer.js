var DuckLayer = function(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;

    // this.duckSquareIDs = [];
    // this.startTimeOfDuckSquares = [];
    // this.stopTimeOfDuckSquares = [];

    this.percentChangeDuckAppears = 0.90;
    this.duckDurations = {};

    this.startTimer = function(){
        //set duckHit to false
        //this.generateDucks
        //initiates timer as long as ducHit = false
            //otherwise, stop timer
    };

    this.stopTimer = function(){
        //this.changePlayerTurn
    };

    this.generateRandomDuck = function() {
        this.currentTurnTime += this.interval;

        //determine percentage change of generation
        if (this.duckOccupiedSquares.length === 3) {
            return
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

        var checkToProceed = Math.random();
        if(checkToProceed > this.percentChangeDuckAppears){
            return
        }

        //Generate Random Duck
        //called by TicTacMain.
        //randomly determines number of remaining squares from availableSquareArray
        // var percentOfAvailSquares = (Math.floor(Math.random()*(7-4))+4) * 0.1;
        // var numberOfDuckSquares = Math.floor(ticTacMain.availableSquareArray.length * percentOfAvailSquares);
        // if(numberOfDuckSquares < 1){
        //     numberOfDuckSquares = 1;
        // }

        var availableUnoccupiedSquares = [];
        for(var i = 0; i < ticTacMain.availableSquareArray.length; i++){
            if(this.duckOccupiedSquares.indexOf(ticTacMain.availableSquareArray[i]) === -1){
                availableUnoccupiedSquares.push(ticTacMain.availableSquareArray[i])
            }
        }

        var randomIndex = Math.floor(Math.random() * availableUnoccupiedSquares.length) + 1;    //test
        var randomDuckSquare = availableUnoccupiedSquares[randomIndex];

        this.duckOccupiedSquares.push(randomDuckSquare);

        var baseTimeWindow = this.turnTime / 5;
        var percentageOfBaseTimeWindow = (Math.floor(Math.random()*(15-5))+5) * 0.1;
        var duckDuration = baseTimeWindow * percentageOfBaseTimeWindow;
        var duckLeaveTime = duckDuration + this.currentTurnTime;
        this.duckDurations.duckDuration = randomDuckSquare;
        //
        // var duckSquareIDs = [];
        // for(var i = 0; i <numberOfDuckSquares; i++){
        //     var randomIndex = Math.floor(Math.random() * cloneOfAvailableDuckSquareIDs.length) + 1;
        //     this.duckSquareIDs.push(cloneOfAvailableDuckSquareIDs[i].splice(randomIndex, 1))
        // }
        //
        // var startTimeOfDuckSquares = [];
        //
        // var baseTimeWindow = totalDuration / numberOfDuckSquares;
        // for(var i = 0; i <numberOfDuckSquares; i++){
        //     var currentTimeWindow = (i+1) * baseTimeWindow;
        //     var percentOfTimeWindow = (Math.floor(Math.random()*(9-1))+1) * 0.1;
        //     this.startTimeOfDuckSquares.push(currentTimeWindow * percentOfTimeWindow);
        // }
        //
        // var stopTimeOfDuckSquares = [];
        // for(var i = 0; i <numberOfDuckSquares; i++){
        //     var percentOfTimeWindow = (Math.floor(Math.random()*(16-2))+2) * 0.1;
        //     var duration = baseTimeWindow[i] * percentOfTimeWindow;
        //     this.stopTimeOfDuckSquares[i] = stopTimeOfDuckSquares[i] + duration;
        // }
        //
        // console.log("duckSquareIDs", duckSquareIDs);
        // console.log("startTimeOfDuckSquares", startTimeOfDuckSquares);
        // console.log("stopTimeOfDuckSquares", stopTimeOfDuckSquares);

        //randomly determine time ducks will appear and disappear
        //generate them, and put the ID of divs in duckOccupiedSquares while they are there
        //if click on div where id of div is in duckOccupiedSquares
            //run duckHit()

    };

    this.removeRandomGeneratedDuck = function(){
        for(var time in this.duckDurations){
            if(time >= this.currentTurnTime){
                var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations.time);
                this.duckOccupiedSquares.splice(indexToRemove)
            }
        }
    };

    this.hitDuck = function(){
        //duckHit = true
        //TicTacMain.placePiece
        //TicTacMain.changePlayerTurn

        //updates the display
        //stopTimer()

        //update this.player0Score and this.player1Score
    }

    this.updateDisplay = function(){
        //put dead ducks on squares based on TicTacMain.player0Squares and TicTacMain.player1Squares

        //updateScore in html.index;
    }


};