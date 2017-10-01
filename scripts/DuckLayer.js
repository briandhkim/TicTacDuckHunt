function DuckLayer(){
    this.player0Score = 0;
    this.player1Score = 0;
    this.duckOccupiedSquares = [];
    this.dogOccupiedSquares = [];
    this.duckHit = false;
    this.dogHit = false;
    this.turnTime = 5000;
    this.currentTurnTime = 0;
    this.interval = 250;
    this.duckDurations = {}; //key = time spent in square, value = ID of square
    this.pointPerDuck = 20;
    this.timerTimeRemaining = 5000;
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
        if(this.timerTimeRemaining / this.turnTime <= .33){
            $(".timer").css("background-color", "red");
        }
        this.timerTimeRemaining -= 10;
        if(this.timerTimeRemaining <= 0){
            this.timerTimeRemaining = 0;
            clearInterval(this.timer);
            // console.log('time ran out');

        }
        var percentRemaining = this.timerTimeRemaining / this.turnTime * 100;

        if(percentRemaining >= 80){
            this.pointPerDuck = 20;
        }
        else if(percentRemaining <=20){
            this.pointPerDuck = 5;
        }
        else{
            var middleTime = this.timerTimeRemaining - 1000;
            var percentOfMiddleTime = middleTime / 3000;
            this.pointPerDuck = 5 + Math.round(15 * percentOfMiddleTime);
        }
        // console.log(this.pointPerDuck);
        $(".timer").css('width', percentRemaining + '%');
    }.bind(this);
    this.intervalFunction = function(){
        this.currentTimeUpdater();
        this.removeRandomGeneratedDuck();
        this.generateRandomDuck();
    }.bind(this);

    this.currentTimeUpdater = function(){
        this.currentTurnTime += this.interval; //adding half a second to currentTurnTime every time the interval runs
    };

    this.stopTimer = function(){
        $(".timer").css("background-color", "gray");
        this.currentTurnTime = 0;
        clearInterval(this.playerTimer); //stopping duck creation
        clearInterval(this.timer);
        this.updateDisplay(); //updateDisplay
        this.resetDuckVar();    //may need to be moved
        // ticTacMain.changePlayerTurn(); //this.changePlayerTurn
        this.timerTimeRemaining = 5000;
        $(".timer").css('width', "100%");
        this.pointPerDuck = 10;
    };   //bind this?

    this.checkWinCondition = function(){
        ticTacMain.checkWinCol();
        ticTacMain.checkWinRow();
        ticTacMain.checkWinDiag();
        ticTacMain.changePlayerTurn();
    };

    this.resetDuckVar = function(){
        this.duckOccupiedSquares = [];
        this.dogOccupiedSquares = [];
        this.duckHit = false;
        this.currentTurnTime = 0;
        this.duckDurations = {};
        $(".gameSquare").each(function() { //removing background images at the end of the player turn"
            var duckAnimateSelection = $(this)[0].children[0];
            if (ticTacMain.playerTurn === 0) {
                // $(this).removeClass('animateDuck0');
                $(duckAnimateSelection).removeClass('animateDuck0');
            } else {
                // $(this).removeClass('animateDuck1');
                $(duckAnimateSelection).removeClass('animateDuck1');
            }
            // $(this).removeClass('animateDog');
            $(duckAnimateSelection).removeClass('animateDog');
        });
    };

    this.generateRandomDuck = function() {
        var percentChanceDuckAppears = 0.90;
        if (this.currentTurnTime >= this.turnTime) { //checking if currentTime === 5 seconds and if it is, stopTimer
            this.stopTimer();
            ticTacMain.changePlayerTurn();
            audioHandler.miss();
        }
        if(this.currentTurnTime === 0){
            return
        }
        if (this.duckOccupiedSquares.length === 3) {            //determine percentage change of duck creation
            return                                              //looking at the length of duckOccupiedSquares array to determine the percentChange
        } else if (this.duckOccupiedSquares.length === 2) {
            percentChanceDuckAppears = 0.33
        } else if (this.duckOccupiedSquares.length === 1) {
            percentChanceDuckAppears = 0.75
        } else if (this.duckOccupiedSquares.length === 0) {
            percentChanceDuckAppears = 0.9
        }
        var checkToProceed = Math.random();
        if(checkToProceed > percentChanceDuckAppears){ //if random number > percent given above
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
        if(!dogGenerate){ //a duck now occupies that square so push the ID of the square to the duckOccupiedSquares array
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
        var duckAnimateSelection = $('#' + randomDuckSquare)[0].children[0];
        if(!dogGenerate) {
            audioHandler.quack();
            if(ticTacMain.playerTurn === 0){
                $(duckAnimateSelection).addClass('animateDuck0'); //adding animations via class
                // $("#" + randomDuckSquare).css("background", "url(assets/p0_duck01.png) no-repeat center");
                audioHandler.quack();
            } else{
                $(duckAnimateSelection).addClass('animateDuck1'); //adding animations via class
                // $("#" + randomDuckSquare).css("background", "url(assets/p1_duck01.png) no-repeat center");
                audioHandler.quack();
            }
        } else{
            $(duckAnimateSelection).addClass('animateDog'); //adding animations via class
            // $("#" + randomDuckSquare).css("background", "url(assets/dog01.png) no-repeat center");
            audioHandler.dog();
        }
    };

    this.removeRandomGeneratedDuck = function(){
        for (var key in this.duckDurations) { //looking for key in duckDurations object
            if (parseInt(key) <= this.currentTurnTime){ //if the key (time spent in square) is <= the currentTurnTime then remove duck
                var ID = this.duckDurations[key];
                var duckAnimateSelection = $('#' + ID)[0].children[0];
                if (this.duckOccupiedSquares.indexOf(ID) !== -1) {
                    var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.duckOccupiedSquares.splice(indexToRemove, 1);
                    $(duckAnimateSelection).removeClass('animateDuck0').removeClass('animateDuck1');
                } else {
                    var indexToRemove = this.dogOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.dogOccupiedSquares.splice(indexToRemove, 1);
                    $(duckAnimateSelection).removeClass('animateDog');
                    console.log("DOG REMOVED")
                }
            }
        }
    };

    this.hitDuck = function(squareId) {
        var duckAnimateSelection = $('#' + squareId)[0].children[0];
        audioHandler.hit();
        this.duckHit = true; //changing duckHit to true if duck was in div clicked
        if (ticTacMain.playerTurn === 0) {
            this.player0Score += this.pointPerDuck; //update this.player0Score
            ticTacMain.player0Squares.push(squareId);
        } else {
            this.player1Score += this.pointPerDuck; //update this.player1Score
            ticTacMain.player1Squares.push(squareId);
        }
        ticTacMain.availableSquareArray.splice(ticTacMain.availableSquareArray.indexOf(squareId), 1 );
        this.stopTimer();
        if(ticTacMain.playerTurn === 0){
            $("#" + squareId).addClass("player0Sq");
            $(duckAnimateSelection).removeClass('animateDuck0'); //removing animations
        } else{
            $("#" +squareId).addClass("player1Sq");
            $(duckAnimateSelection).removeClass('animateDuck1'); //removing animations
        }
        $(duckAnimateSelection).removeClass('animateDog');
        this.checkWinCondition(); //check win
    };

    this.hitDog = function(squareID){
        this.dogHit = true;
        this.stopTimer();
        this.checkWinCondition();
        $("#" + squareID).css("background", "url(assets/dog_shot.png) no-repeat center");
    };

    this.updateDisplay = function(){
        for(var i = 0; i < ticTacMain.player0Squares.length; i++){
            $("#" + ticTacMain.player0Squares[i]).css("background", "url(assets/p0_duckDead.png) no-repeat center");
        }
        for(var i = 0; i < ticTacMain.player1Squares.length; i++){
            $("#" + ticTacMain.player1Squares[i]).css("background", "url(assets/p1_duckDead.png) no-repeat center");
        }

        if (ticTacMain.playerTurn === 0) { //updateScore in html.index;
            $('.player0ScoreVal').text(this.player0Score);
        } else {
            $('.player1ScoreVal').text(this.player1Score);
        }
    };
}

