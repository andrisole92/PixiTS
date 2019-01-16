import {Container, Sprite} from 'pixi.js';
import {SampleApp} from "app/sample-app";
import {TweenLite} from 'gsap';

export class FirstScreen extends Container {
    private app: SampleApp;
    private thingies: Sprite[];
    private thingiesAreOnLeft: boolean = false;

    constructor(app: SampleApp) {
        super();
        this.app = app;
        const home = new PIXI.Sprite(PIXI.loader.resources.home.texture);
        Object.assign(this,{
            interactive: true
        });
        Object.assign(home,{
            interactive: true,
            buttonMode:true,
            position: new PIXI.Point(this.app.initialWidth - home.width, this.app.initialHeight - home.height),
            anchor: new PIXI.Point(.5,.5)
        });
        home.on("pointerup", () => {
            this.destroy();
            this.app.onHome();
        });
        this.addChild(home);
        this.createThingies(144);

    }

    createThingies(n: number) {
        this.thingies = [];
        for (let i = 0; i < n; i++) {
            const thingie = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            Object.assign(thingie,{
                position: new PIXI.Point(
                    this.app.initialWidth / 2.5,
                    this.thingies.length === 0 ? this.app.initialHeight - thingie.height : (this.thingies[i - 1].position.y - this.thingies[i - 1].height * .1)
                )
            });
            this.thingies.push(thingie);
            this.addChild(thingie);
        }
        this.thingiesAreOnLeft = true;
        this.thingies.reverse();
        setTimeout(() => {
            this.startSwapping();
        }, 300)
    }

    startSwapping() {
        for (let i = 0; i < this.thingies.length; i++) {
            const thng = this.thingies[i];
            let pointX = this.thingiesAreOnLeft ? this.app.initialWidth / 1.5 : this.app.initialWidth / 2.5;
            let pointY = this.thingiesAreOnLeft ? this.app.initialWidth / 1.5 : this.app.initialWidth / 2.5;
            if (i === this.thingies.length - 1) {
                TweenLite.to(thng, 2, {
                    x: pointX,
                    y: this.app.initialHeight - thng.height - thng.height * .1 * i,
                    delay: 2 / 144 * i,
                    onComplete: () => {
                        this.thingies.reverse();
                        this.thingiesAreOnLeft = !this.thingiesAreOnLeft;
                        setTimeout(() => {
                            this.startSwapping();
                        }, 1000)
                    }
                });

            } else {
                TweenLite.to(thng, 2, {
                    x: pointX,
                    y: this.app.initialHeight - thng.height - thng.height * .1 * i,
                    delay: 2 / 144 * i
                });
            }
        }

    }

}
