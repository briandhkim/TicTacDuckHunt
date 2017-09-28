function AudioHandler(){
    this.flap = function(){
        var audio = new Audio("assets/audio_flap.wav");
        audio.play();
    };
    this.hit = function(){
        var audio = new Audio("assets/audio_hit.wav");
        audio.play();
    };
    this.miss = function(){
        var audio = new Audio("assets/audio_miss.wav");
        audio.play();
    };
    this.quack = function(){
        var audio = new Audio("assets/audio_quack.wav");
        audio.play();
    };
    this.dog = function(){
        var audio = new Audio("assets/audio_dog.wav");
        audio.play();
    };
    this.shoot = function(){
        var audio = new Audio("assets/audio_shoot.wav");
        audio.play();
    };
    this.start = function(){
        var audio = new Audio("assets/audio_start.wav");
        audio.play();
    }
}