
import {Howl, Howler} from 'howler';

export default class SoundPlayer{
    paddleSounds = ["paddle1.wav","paddle2.wav","paddle3.wav","paddle4.wav"]
    hitSounds = ["hit1.wav","hit2.wav","hit3.wav","hit4.wav"]
    playPaddleSound(){
        this.playRandSound(this.paddleSounds)
    }
    playHitSound(){
        this.playRandSound(this.hitSounds)
    }
    playRandSound(sounds:string[]){
        console.log("audio/"+sounds[Math.floor(Math.random()*(sounds.length))]);
        var sound = new Howl({
            src: ["audio/"+sounds[Math.floor(Math.random()*(sounds.length))]],
            volume: 1
        });
        sound.play();

    }
    




}
