var DuckLayer = function(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 7500;
    this.currentTurnTime = 0;
    this.interval = 500; //can do math.random this to generate ducks at random time
    this.percentChangeDuckAppears = 0.90;
    this.duckDurations = {};
    this.startTimer = function(){
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
        console.log("Stop timer called")
        clearInterval(this.playerTimer); //stopping duck creation
        //check win
        //updateDisplay
        ticTacMain.changePlayerTurn(); //this.changePlayerTurn
    };

    this.generateRandomDuck = function() {
        console.log("generateDuck ran")
        this.currentTurnTime += this.interval; // adding half a second to currentTime every time the interval runs
        if (this.currentTurnTime >= this.turnTime) { // checking if currentTime === 5 seconds and if it is, stopTimer
            this.stopTimer();
        }

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


        var availableUnoccupiedSquares = [];
        for(var i = 0; i < ticTacMain.availableSquareArray.length; i++){
            if(this.duckOccupiedSquares.indexOf(ticTacMain.availableSquareArray[i]) === -1){
                availableUnoccupiedSquares.push(ticTacMain.availableSquareArray[i])
            }
        }

        var randomIndex = Math.floor(Math.random() * availableUnoccupiedSquares.length);    //test
        var randomDuckSquare = availableUnoccupiedSquares[randomIndex];
        console.log(randomDuckSquare);
        this.duckOccupiedSquares.push(randomDuckSquare);

        var baseTimeWindow = this.turnTime / 5; //1000
        var percentageOfBaseTimeWindow = (Math.floor(Math.random()*(15-5))+5) * 0.1;
        var duckDuration = baseTimeWindow * percentageOfBaseTimeWindow;
        var duckLeaveTime = duckDuration + this.currentTurnTime;
        this.duckDurations[duckLeaveTime] = randomDuckSquare;
        console.log("DUck created at" + randomDuckSquare + " and will leave at " + duckLeaveTime + "at time" + this.currentTurnTime)
        $("#"+randomDuckSquare).css("background", "red");


    };


    this.removeRandomGeneratedDuck = function(){
        for(var key in this.duckDurations){
            console.log("KEY IS :" + key + "      currentTime is :" + this.currentTurnTime);

            if(parseInt(key) <= this.currentTurnTime){

                var ID = this.duckDurations[key];
                console.log(ID + "removed at time of " + this.currentTurnTime);
                var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations[key]);
                this.duckOccupiedSquares.splice(indexToRemove);
                //TEST


                $("#" + ID).css("background", "blue")
            }
        }
    };


    this.hitDuck = function (squareId) {

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


};

