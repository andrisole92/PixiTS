import {Container, Sprite} from 'pixi.js';
import {SampleApp} from "app/sample-app";
import {TweenLite} from 'gsap';


/**
 * Main Display Object
 *
 * @exports Example
 * @extends Container
 */
export class FirstScreen extends Container {
    private app: SampleApp;
    private thingies: Sprite[];
    private thingiesAreOnLeft: boolean = false;

    constructor(app: SampleApp) {
        super();
        this.app = app;
        this.createThingies(144);
        this.interactive = true;
        const home = new PIXI.Sprite(PIXI.loader.resources.home.texture);
        home.interactive = true;
        home.buttonMode = true;
        home.anchor.set(.5);
        home.position.set(this.app.initialWidth - home.width, this.app.initialHeight - home.height);
        home.on("pointerup", () => {
            this.destroy();
            this.app.onHome();
        });
        this.addChild(home);
    }

    createThingies(n: number) {
        this.thingies = [];
        for (let i = 0; i < n; i++) {
            const thingie = new PIXI.Sprite(PIXI.loader.resources.bunny.texture);
            thingie.position.set(
                this.app.initialWidth / 2.5,
                this.thingies.length === 0 ? this.app.initialHeight - thingie.height : (this.thingies[i - 1].position.y - this.thingies[i - 1].height * .1)
            );
            this.thingies.push(thingie);
            this.addChild(thingie);
        }
        this.thingiesAreOnLeft = true;
        this.thingies.reverse();
        setTimeout(() => {
            this.startSwapping();
        }, 1000)
    }

    startSwapping() {
        for (let i = 0; i < this.thingies.length; i++) {
            const t = this.thingies[i];
            let pointX = this.thingiesAreOnLeft ? this.app.initialWidth / 1.5 : this.app.initialWidth / 2.5
            if (i === this.thingies.length - 1) {
                TweenLite.to(t, 2, {
                    x: pointX,
                    y: this.app.initialHeight - t.height - t.height * .1 * i,
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
                TweenLite.to(t, 2, {
                    x: pointX,
                    y: this.app.initialHeight - t.height - t.height * .1 * i,
                    delay: 2 / 144 * i
                });
            }
        }

    }

}
