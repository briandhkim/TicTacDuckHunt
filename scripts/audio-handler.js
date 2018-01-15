var audio_start = null;
var audio_hit = null;
var audio_miss = null;

var audio_shoot_array = [];
var audio_quack_array = [];
var audio_dog_array = [];

$(document).ready(function(){
    audio_start = new Audio("assets/audio_start.wav");
    audio_hit = new Audio("assets/audio_hit.wav");
    audio_miss = new Audio("assets/audio_miss.wav");

    for(var i=0; i<3; i++){
        var audio_shoot = new Audio("assets/audio_shoot.wav");
        audio_shoot_array.push(audio_shoot);
        var audio_quack = new Audio("assets/audio_quack.wav");
        audio_quack_array.push(audio_quack);
        var audio_dog = new Audio("assets/audio_dog.wav");
        audio_dog_array.push(audio_dog);
    }
});

function AudioHandler(){
    this.start = function(){
        audio_start.pause();
        audio_start.currentTime = 0;
        audio_start.play();
    };
    this.hit = function(){
        audio_hit.pause();
        audio_hit.currentTime = 0;
        audio_hit.play();
    };
    this.miss = function(){
        audio_miss.pause();
        audio_miss.currentTime = 0;
        audio_miss.play();
    };

    this.shoot = function(){
        for(var i=0; i < audio_shoot_array.length-1; i++){
            if(audio_shoot_array[i].paused){
                audio_shoot_array[i].play();
                return
            }
        }
        var audio_shoot = new Audio("assets/audio_shoot.wav");
        audio_shoot.play();
        audio_shoot_array.push(audio_shoot);
    };
    this.quack = function(){
        for(var i=0; i < audio_quack_array.length-1; i++){
            if(audio_quack_array[i].paused){
                audio_quack_array[i].play();
                return
            }
        }
        var audio_quack = new Audio("assets/audio_quack.wav");
        audio_quack.play();
        audio_quack_array.push(audio_quack);
    };
    this.dog = function(){
        for(var i=0; i < audio_dog_array.length-1; i++){
            if(audio_dog_array[i].paused){
                audio_dog_array[i].play();
                return
            }
        }
        var audio_dog = new Audio("assets/audio_dog.wav");
        audio_dog.play();
        audio_dog_array.push(audio_dog);
    }
}