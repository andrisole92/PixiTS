import {Container} from 'pixi.js';
import {SampleApp} from "app/sample-app";
import Emitter = PIXI.particles.Emitter;

export class HomeScreen extends Container {
    private app: SampleApp;
    private renderer: any;

    constructor(app: SampleApp) {
        super();
        this.renderer = app.app.app.renderer;
        this.app = app;
        const first = new PIXI.Sprite(PIXI.loader.resources.first.texture);
        const second = new PIXI.Sprite(PIXI.loader.resources.second.texture);
        const third = new PIXI.Sprite(PIXI.loader.resources.third.texture);
        let buttons = [first,second,third];
        buttons.forEach((b,i)=>{
            Object.assign(b,{
                interactive: true,
                buttonMode: true,
                cursor: 'hover',
                position: new PIXI.Point(this.app.initialWidth / 2, 250 + 100*i),
                anchor: new PIXI.Point(.5,.5)
            })
        });

        first.on("pointerup", () => this.goToScreen(1));
        second.on("pointerup", () => this.goToScreen(2));
        third.on("pointerup", () => this.goToScreen(3));
        this.addChild(first,second,third);
    }

    goToScreen(n:number){
        this.destroy();
        switch (n){
            case 1:
                this.app.onFirstScreen();
                break;
            case 2:
                this.app.onSecondScreen();
                break;
            case 3:
                this.app.onThirdScreen();
                break;
            default:
                break;
        }
    }
}
