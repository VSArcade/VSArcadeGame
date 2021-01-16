import { Bodies, Body } from 'matter-js'

export class GameWord {

    text: string;
    body: Body;

    constructor(text: string, x: number, y: number, width: number, height: number){
        
        this.text = text;
        this.body = Bodies.rectangle(x,y, width,height);
        
    }

}