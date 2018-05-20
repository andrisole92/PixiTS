import {Container} from 'pixi.js';
import {SampleApp} from "app/sample-app";

export class HomeScreen extends Container {
    private app: SampleApp;

    constructor(app: SampleApp) {
        super();
        this.app = app;
        const first = new PIXI.Sprite(PIXI.loader.resources.first.texture);
        first.anchor.set(.5);
        first.position.set(this.app.initialWidth / 2, 100);
        const second = new PIXI.Sprite(PIXI.loader.resources.second.texture);
        second.anchor.set(.5);
        second.position.set(this.app.initialWidth / 2, 200);
        const third = new PIXI.Sprite(PIXI.loader.resources.third.texture);
        third.anchor.set(.5);
        third.position.set(this.app.initialWidth / 2, 300);
        first.interactive = true;
        first.buttonMode = true;
        second.interactive = true;
        second.buttonMode = true;
        third.interactive = true;
        third.buttonMode = true;
        first.on("pointerup", () => {
            console.log('onFirst');
            this.destroy();
            this.app.onFirstScreen();
        });
        second.on("pointerup", () => {
            console.log('onSecond');
            this.destroy();
            this.app.onSecondScreen();

        });
        third.on("pointerup", () => {
            console.log('onThird')
            this.destroy();
            this.app.onThirdScreen();

        });
        this.addChild(first)
        this.addChild(second)
        this.addChild(third)

    }
}
