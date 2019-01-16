import {RotatingSprite} from "app/rotating-sprite";
import {TweenLite} from "gsap";
import "howler";
import {
    Dom,
    PixiAppWrapper as Wrapper,
    pixiAppWrapperEvent as WrapperEvent,
    PixiAppWrapperOptions as WrapperOpts,
} from "pixi-app-wrapper";
import {
    AsciiFilter,
    CRTFilter,
    GlowFilter,
    OldFilmFilter,
    OutlineFilter,
    ShockwaveFilter,
} from "pixi-filters";
import "pixi-particles";
import "pixi-spine";

import {HomeScreen} from "../../screens/HomeScreen";
import {FirstScreen} from "../../screens/FirstScreen";
import {SecondScreen} from "../../screens/SecondScreen";
import {ThirdScreen} from "../../screens/ThirdScreen";

/**
 * Showcase for PixiAppWrapper class.
 */
export class SampleApp {
    public app: Wrapper;
    private particlesEmitter: PIXI.particles.Emitter;
    private spineBoy: PIXI.spine.Spine;

    private textStyle = new PIXI.TextStyle({
        fontFamily: "Verdana",
        fontSize: 18,
        fill: "#FFFFFF",
        wordWrap: true,
        wordWrapWidth: 440,
    });

    constructor() {

        const canvas = Dom.getElementOrCreateNew<HTMLCanvasElement>("app-canvas", "canvas", document.getElementById("app-root"));

        // if no view is specified, it appends canvas to body
        const appOptions: WrapperOpts = {
            width: 1280,
            height: 720,
            scale: "keep-aspect-ratio",
            align: "middle",
            resolution: window.devicePixelRatio,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: canvas,
            showFPS: true,
            showMediaInfo: true,
        };

        this.app = new Wrapper(appOptions);
        this.app.on(WrapperEvent.RESIZE_START, this.onResizeStart.bind(this));
        this.app.on(WrapperEvent.RESIZE_END, this.onResizeEnd.bind(this));

        let defaultIcon: any = "url('assets/gfx/explorer.png'),auto";
        let hoverIcon: any = "url('assets/gfx/explorer.png'),auto";
        this.app.app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
        this.app.app.renderer.plugins.interaction.cursorStyles['hover'] = hoverIcon;

        PIXI.loader
            .add("explorer", "assets/gfx/explorer.png")
            .add("bunny", "assets/gfx/bunny.png")
            .add("wand", "assets/gfx/wand.png")
            .add("bubble", "assets/gfx/Bubbles99.png")
            .add("spineboy", "assets/gfx/spineboy.json")
            .add("play", "assets/gfx/play.png")
            .add("stop", "assets/gfx/stop.png")
            .add("first", "assets/gfx/first.png")
            .add("second", "assets/gfx/second.png")
            .add("third", "assets/gfx/third.png")
            .add("venom", "assets/gfx/venom2.png")
            .add("home", "assets/gfx/home.png")
            .add("fullScreen", "assets/gfx/fullScreen.png")
            .add("fire", "assets/particles/Fire.png")
            .add("particle", "assets/particles/particle.png")
            .load(this.onAssetsLoaded.bind(this));


        this.app.ticker.add(() => {
        });


    }


    public drawFullScreen(x = 0, y = 0, w = 50, h = 50, r = 10): void {
        const fullScreen = new PIXI.Sprite(PIXI.loader.resources.fullScreen.texture);
        fullScreen.interactive = true;
        fullScreen.buttonMode = true;
        fullScreen.anchor.set(.5);
        fullScreen.position.set(this.app.initialWidth - fullScreen.width / 2 - 20, fullScreen.height);
        fullScreen.on("pointerup", () => {
            Wrapper.toggleFulscreen(document.getElementById("app-root"));

        });

        this.app.stage.addChild(fullScreen);
    }


    public drawScreenBorder(width = 4): void {
        const halfWidth = width / 2;

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(width, 0xFF00FF, 1);
        graphics.drawRect(halfWidth, halfWidth, this.app.initialWidth - width, this.app.initialHeight - width);

        this.app.stage.addChild(graphics);
    }

    private onResizeStart(): void {
        window.console.log("RESIZE STARTED!");
        this.stopEmittingParticles();

        if (this.spineBoy) {
            this.spineBoy.visible = false;
        }
    }

    private onResizeEnd(args: any): void {
        window.console.log("RESIZE ENDED!", args);
        this.startEmittingParticles();

        if (this.spineBoy) {
            this.spineBoy.visible = true;
        }
    }

    private stopEmittingParticles(): void {
        if (this.particlesEmitter) {
            this.particlesEmitter.emit = false;
            this.particlesEmitter.cleanup();
        }
    }

    private startEmittingParticles(): void {
        if (this.particlesEmitter) {
            this.particlesEmitter.emit = true;
        }
    }

    private addFullscreenText(x: number, y: number): void {

    }

    private onAssetsLoaded(): void {
        this.drawFullScreen();
        this.onHome();

    }

    onFirstScreen() {
        console.warn('onFirstScreen');
        const firstScreen = new FirstScreen(this);
        this.app.stage.addChild(firstScreen)

    }

    onSecondScreen() {
        console.warn('onSecondScreen')
        const secondScreen = new SecondScreen(this);
        this.app.stage.addChild(secondScreen)
    }

    onThirdScreen() {
        console.warn('onThirdScreen')
        const thirdScreen = new ThirdScreen(this);
        this.app.stage.addChild(thirdScreen)
    }

    onHome() {
        console.warn('onHome')
        let homeScreen = new HomeScreen(this);
        this.app.stage.addChild(homeScreen)
    }

    private drawRotatingExplorer(): void {
        // This creates a texture from a "explorer.png" image
        const explorer: RotatingSprite = new RotatingSprite(PIXI.loader.resources.explorer.texture);

        // Setup the position of the explorer
        const maxEdge = Math.max(explorer.width, explorer.height);
        explorer.position.set(Math.ceil(maxEdge / 2) + 10, Math.ceil(maxEdge / 2) + 10);

        // Rotate around the center
        explorer.anchor.set(0.5, 0.5);

        explorer.interactive = true;
        explorer.buttonMode = true;
        explorer.rotationVelocity = 0.02;

        explorer.on("pointerdown", () => {
            explorer.rotationVelocity *= -1;
        });

        // Add the explorer to the scene we are building
        this.app.stage.addChild(explorer);

        // Listen for frame updates
        this.app.ticker.add(() => {
            // each frame we spin the explorer around a bit
            explorer.rotation += explorer.rotationVelocity;
        });

        TweenLite.to(explorer, 2, {y: this.app.initialHeight / 2});
    }

    get initialWidth() {
        return this.app.initialWidth;
    }

    get initialHeight() {
        return this.app.initialHeight;
    }

    get ticker() {
        return this.app.ticker;
    }
}
