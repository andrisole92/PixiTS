import {Container} from 'pixi.js';

import particles from 'pixi-particles';
import {SampleApp} from "app/sample-app";

export class ThirdScreen extends Container {
    private app: SampleApp;

    constructor(app: SampleApp) {
        super();
        this.app = app;
        this.createParticles();

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

    createParticles() {
        this.emitter = new PIXI.particles.Emitter(
            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            this,

            // The collection of particle images to use
            [PIXI.loader.resources.particle.texture, PIXI.loader.resources.fire.texture],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
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
            }
        );

        let elapsed = Date.now();
        this.app.ticker.add(() => {
            let now = Date.now();
            // The emitter requires the elapsed
            // number of seconds since the last update
            this.emitter.update((now - elapsed) * 0.001);
            elapsed = now;
        })
        this.emitter.emit = true;
    }

}
