var DuckLayer = function(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;
    this.interval = 500; //can do math.random this to generate ducks at random time
    //added from merge conflict
    this.percentChangeDuckAppears = 0.90;
    this.duckDurations = {};
    //end of merge conflict change
    this.startTimer = function(){
        if (this.duckHit === false){ //check if duckHit === false
            this.playerTimer = setInterval(this.generateDucks, this.interval); // will call generateDucks every half a second and generateDucks will either have the duck or not
        }
    };

    this.stopTimer = function(){
        clearInterval(this.playerTimer); //stopping duck creation
        ticTacMain.changePlayerTurn(); //this.changePlayerTurn
    };

    this.generateRandomDuck = function() {
        this.currentTurnTime += this.interval;
        //added from merge conflict
        this.currentTurnTime += this.interval; // adding half a second to currentTime every time the interval runs
        if (this.currentTurnTime >= this.turnTime) { // checking if currentTime === 5 seconds and if it is, stopTimer
            this.stopTimer();
        }
        //end of merge conflict change

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
  
    this.generateDucks = this.generateDucks.bind(this);

    this.removeRandomGeneratedDuck = function(){
        for(var time in this.duckDurations){
            if(time >= this.currentTurnTime){
                var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations.time);
                this.duckOccupiedSquares.splice(indexToRemove)
            }
        }
    };

    this.hitDuck = function() {
        //duckHit = true
        //TicTacMain.placePiece
        //TicTacMain.changePlayerTurn

        //updates the display
        //stopTimer()

        this.hitDuck = function () {
            this.duckHit = true; //changing duckHit to true if duck was in div clicked
            if (this.duckHit === true) { //stopping timer once duckHit === true
                this.stopTimer();
            }
            this.updateDisplay(); //updates the display
            this.player0Score += 10; //update this.player0Score and this.player1Score
            this.player1score += 10;
        };

        this.updateDisplay = function () {
            //put dead ducks on squares based on TicTacMain.player0Squares and TicTacMain.player1Squares

            //updateScore in html.index;

        }

    }
};