function AudioHandler(){
    this.flap = function(){
        var audio = new Audio("audio/flip.wav");
        audio.play();
    };
    this. = function(){
        var audio = new Audio("audio/match.wav");
        audio.play();
    };
    this. = function(){
        var radiationSounds = ["audio/radiation01.wav", "audio/radiation02.wav", "audio/radiation03.wav"];
        var randomSoundIndex = Math.floor(Math.random()*(radiationSounds.length));
        var audio = new Audio(radiationSounds[randomSoundIndex]);
        audio.play();
    };
    this. = function(){
        var audio = new Audio("audio/restart.wav");
        audio.play();
    };
    this. = function(){
        var audio = new Audio("audio/win.wav");
        audio.play();
    };
    this. = function(){
        var audio = new Audio("audio/lose.wav");
        audio.play();
    }
}