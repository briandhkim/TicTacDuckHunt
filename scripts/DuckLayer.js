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
        this.removeRandomGeneratedDuck();
        this.generateRandomDuck();

    }.bind(this);

    this.stopTimer = function(){
        this.currentTurnTime = 0;
        clearInterval(this.playerTimer); //stopping duck creation
        clearInterval(this.timer);
        this.updateDisplay(); //updateDisplay
        this.resetDuckVar();    //may need to be moved
        // ticTacMain.changePlayerTurn(); //this.changePlayerTurn
        this.timeRemaining = 5000;
        $(".timer").css('width', "100%");

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
        $(".gameSquare").each(function() { //creating object of all elements with class of "gameSquare"
            var id = $(this).attr("id");
            if(ticTacMain.player0Squares.indexOf(id) === -1 && ticTacMain.player1Squares.indexOf(id) === -1) {
                $(this).css("background-image", "none");
            }
        });
    };

    this.generateRandomDuck = function() {
        this.currentTurnTime += this.interval; //adding half a second to currentTurnTime every time the interval runs
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
        if(!dogGenerate){//a duck now occupies that square so push the ID of the square to the duckOccupiedSquares array
            this.duckOccupiedSquares.push(randomDuckSquare);
            console.log("DUCK OCCUPIED SQUARES = " + this.duckOccupiedSquares)
        }
        else{
            this.dogOccupiedSquares.push(randomDuckSquare);
        }
        var baseTimeWindow = this.turnTime / 5; //1000
        var percentageOfBaseTimeWindow = (Math.floor(Math.random()*(15-5))+5) * 0.1;
        var duckDuration = baseTimeWindow * percentageOfBaseTimeWindow;
        var duckLeaveTime = duckDuration + this.currentTurnTime;
        this.duckDurations[duckLeaveTime] = randomDuckSquare;
        if(!dogGenerate) {
            if(ticTacMain.playerTurn === 0){
                $("#" + randomDuckSquare).css("background", "url(assets/p0_duck01.png) no-repeat center");
                // if(this.currentTurnTime < this.turnTime * .7) {
                    audioHandler.quack();
                // }
            }
            else{
                $("#" + randomDuckSquare).css("background", "url(assets/p1_duck01.png) no-repeat center");
                // if(this.currentTurnTime < this.turnTime * .7) {
                    audioHandler.quack();
                // }
            }
        }
        else{
            $("#" + randomDuckSquare).css("background", "url(assets/dog01.png) no-repeat center");
            audioHandler.dog();
        }
    };

    this.removeRandomGeneratedDuck = function(){
        for(var key in this.duckDurations){ //looking for key in duckDurations object
            if(parseInt(key) <= this.currentTurnTime){ //if the key (time spent in square) is <= the currentTurnTime then remove duck
                var ID = this.duckDurations[key];
                if(this.duckOccupiedSquares.indexOf(ID) !== -1) {
                    var indexToRemove = this.duckOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.duckOccupiedSquares.splice(indexToRemove, 1);
                }
                else{
                    var indexToRemove = this.dogOccupiedSquares.indexOf(this.duckDurations[key]);
                    this.dogOccupiedSquares.splice(indexToRemove, 1);
                    console.log("DOG REMOVED")
                }
                $("#" + ID).css("background-image", "none");
            }
        }
    };

    this.duckAnimation = function(){
        var player0animation = ['assets/p0_duck01', 'assets/p0_duck02', 'assets/p0_duck03', ];

        this.timer = setInterval(function(){
            $(".gameSquare").each(function() { //creating object of all elements with class of "gameSquare"
                if($(this).css('background-image').indexOf('assets/p0_duck01.png') !== -1){
                    $(this).css('background-image', 'url(assets/p0_duck02.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p0_duck02.png') !== -1){
                    $(this).css('background-image', 'url(assets/p0_duck03.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p0_duck03.png') !== -1){
                    $(this).css('background-image', 'url(assets/p0_duck04.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p0_duck04.png') !== -1){
                    $(this).css('background-image', 'url(assets/p0_duck01.png)')
                }
                if($(this).css('background-image').indexOf('assets/p1_duck01.png') !== -1){
                    $(this).css('background-image', 'url(assets/p1_duck02.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p1_duck02.png') !== -1){
                    $(this).css('background-image', 'url(assets/p1_duck03.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p1_duck03.png') !== -1){
                    $(this).css('background-image', 'url(assets/p1_duck04.png)')
                }
                else if($(this).css('background-image').indexOf('assets/p1_duck04.png') !== -1){
                    $(this).css('background-image', 'url(assets/p1_duck01.png)')
                }
                else if($(this).css('background-image').indexOf('assets/dog01.png') !== -1){
                    $(this).css('background-image', 'url(assets/dog02.png)')
                }
                else if($(this).css('background-image').indexOf('assets/dog02.png') !== -1){
                    $(this).css('background-image', 'url(assets/dog03.png)')
                }
                else if($(this).css('background-image').indexOf('assets/dog03.png') !== -1){
                    $(this).css('background-image', 'url(assets/dog04.png)')
                }
                else if($(this).css('background-image').indexOf('assets/dog04.png') !== -1){
                    $(this).css('background-image', 'url(assets/dog01.png)')
                }

            });



        }, 250)

    };

    this.hitDuck = function(squareId) {
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
            $("#" + squareId).addClass("player0Sq")
        }
        else{
            $("#" +squareId).addClass("player1Sq")
        }
        this.checkWinCondition(); //check win
    };

    this.hitDog = function(squareID){
        this.dogHit = true;
        this.stopTimer();
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

