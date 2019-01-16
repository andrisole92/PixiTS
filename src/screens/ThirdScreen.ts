import {Container} from 'pixi.js';
import {SampleApp} from "app/sample-app";
import Emitter = PIXI.particles.Emitter;

export class ThirdScreen extends Container {
    private app: SampleApp;
    private emitter: Emitter;




    constructor(app: SampleApp) {
        super();
        const home = new PIXI.Sprite(PIXI.loader.resources.home.texture);
        this.app = app;
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
        this.createParticles();
    }

    createParticles() {
        let emitterCount = 10;
        let emitters: Emitter[] = [];
        for (let i = 0; i < emitterCount; i++) {
            emitters.push(this.buildEmitter());
            emitters[i].spawnPos.set(this.app.initialWidth * Math.random(), this.app.initialHeight * Math.random());
        }
        let elapsed = Date.now();
        this.app.ticker.add(() => {
            let now = Date.now();
            emitters.forEach((e) => {
                e.update((now - elapsed) * 0.001);
            });
            elapsed = now;
        });
        emitters.forEach((e) => {
            e.emit = true
        })
    }

    buildEmitter(): Emitter {
        const conf = {
            alpha: {
                list: [
                    {
                        value: 0.8,
                        time: 0
                    },
                    {
                        value: 0.1,
                        time: 1
                    }
                ],
                isStepped: false
            },
            scale: {
                list: [
                    {
                        value: 1,
                        time: 0
                    },
                    {
                        value: 0.3,
                        time: 1
                    }
                ],
                isStepped: false
            },
            color: {
                list: [
                    {
                        value: "#fb1010",
                        time: 0
                    },
                    {
                        value: "#f5b830",
                        time: 1
                    }
                ],
                isStepped: false
            },
            speed: {
                list: [
                    {
                        value: 500,
                        time: 0
                    },
                    {
                        value: 500,
                        time: 1
                    }
                ],
                isStepped: false
            },
            startRotation: {
                min: 265,
                max: 275
            },
            rotationSpeed: {
                min: 50,
                max: 50
            },
            lifetime: {
                min: 0.1,
                max: 0.75
            },
            blendMode: "normal",
            frequency: 0.001,
            emitterLifetime: 0,
            maxParticles: 10,
            pos: {
                x: 500,
                y: 500
            },
            addAtBack: false,
            spawnType: "circle",
            spawnCircle: {
                x: 0,
                y: 0,
                r: 10
            }
        };
        return new PIXI.particles.Emitter(
            this,
            [PIXI.loader.resources.particle.texture, PIXI.loader.resources.fire.texture],conf

        );
    }

}
