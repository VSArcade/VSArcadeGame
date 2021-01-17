
import { Howl, Howler } from 'howler';

const paddleSounds = ["paddle1.wav","paddle2.wav","paddle3.wav","paddle4.wav"]
const hitSounds = ["hit1.wav","hit2.wav","hit3.wav","hit4.wav"]
const deathSounds = ["death.wav"]
const wallSounds = ["wall1.wav","wall2.wav","wall3.wav"]

export const playPaddleSound = () => {
    playRandSound(paddleSounds);
}
export const playHitSound = () => {
    playRandSound(hitSounds);
}
export const playDeathSound = () => {
    playRandSound(deathSounds);
}
export const playWallSound = () => {
    playRandSound(wallSounds);
}
export const playRandSound = (sounds: string[]) => {
    // console.log("audio/"+sounds[Math.floor(Math.random()*(sounds.length))]);
    var sound = new Howl({
        src: ["audio/"+sounds[Math.floor(Math.random()*(sounds.length))]],
        volume: 1
    });
    sound.play();
}

