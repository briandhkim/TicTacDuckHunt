var DuckLayer = function(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.duckHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;
    this.playerTimer = null;
    this.interval = 500; //can do math.random this to generate ducks at random times

    this.currentTurnTime += this.interval; // adding half a second to currentTime every time the interval runs
    if (this.currentTurnTime >= this.turnTime) { // checking if currentTime === 5 seconds and if it is, stopTimer
        this.stopTimer();
    }


    this.startTimer = function(){
        if (this.duckHit === false){ //check if duckHit === false
            this.playerTimer = setInterval(this.generateDucks, this.interval); // will call generateDucks every half a second and generateDucks will either have the duck or not
        }
    };

    this.stopTimer = function(){
        clearInterval(this.playerTimer); //stopping duck creation
        ticTacMain.changePlayerTurn(); //this.changePlayerTurn
    };

    this.generateDucks = function(){
    };

    this.generateDucks = this.generateDucks.bind(this);

    this.hitDuck = function(){
        this.duckHit = true; //changing duckHit to true if duck was in div clicked
        if (this.duckHit === true) { //stopping timer once duckHit === true
            this.stopTimer();
        }
        this.updateDisplay(); //updates the display
        this.player0Score += 10; //update this.player0Score and this.player1Score
        this.player1score += 10;
    };

    this.updateDisplay = function(){
        //put dead ducks on squares based on TicTacMain.player0Squares and TicTacMain.player1Squares

        //updateScore in html.index;

    }


};


var tic = new DuckLayer();