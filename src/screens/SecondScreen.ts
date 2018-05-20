import {Container} from 'pixi.js';
import 'lodash'
import {SampleApp} from "app/sample-app";


export class SecondScreen extends Container {
    private app: SampleApp;

    constructor(app: SampleApp) {
        super();
        this.app = app;
        this.strings = ["We ", "Are ", "Venom! ", "V"];
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
        this.createText();
        setInterval(() => {
            this.strings = _.shuffle(this.strings);
            this.destroyText();
            this.createText();
        }, 2000)
    }

    createText() {
        let startX = parseInt(Math.random() * 1500 + 300);
        let startY = parseInt(Math.random() * (this.app.initialHeight-100) + 100);
        let fontSize = parseInt(Math.random() * 60 + 20);
        let index = 0;
        this.v = new PIXI.Sprite(PIXI.loader.resources.venom.texture);
        this.texts = [];
        let venomIndex = parseInt(Math.random() * this.texts.length + 1);
        for (let i = 0; i < this.strings.length; i++) {
            let obj = this.strings[i];
            if (obj === "V") {
                this.v.anchor.set(.5);
                if (i > 0) {
                    this.v.position.set(this.texts[i - 1].position.x + this.texts[i - 1].width / 2 + this.v.width / 2, startY);
                } else {
                    this.v.position.set(parseInt(Math.random() * (this.app.initialWidth - 500) + this.v.width), startY);
                }
                this.addChild(this.v);
                continue;
            }
            let text = new PIXI.Text(obj, {fontFamily: 'Arial', fontSize: fontSize, fill: "#ff1010", align: 'center'});
            text.anchor.x = 0.5;
            text.anchor.y = 0.5;
            if (i > 0) {
                let target = this.strings[i - 1] === "V" ? this.v : this.texts[index - 1];
                text.position.set(target.position.x + target.width / 2 + text.width / 2, startY);
            } else {
                text.position.set(parseInt(Math.random() * (this.app.initialWidth - 500) + text.width), startY);
            }
            index++;
            this.texts.push(text);
            this.addChild(text);
        }
    }

    destroyText() {
        this.texts[0].destroy();
        this.texts[1].destroy();
        this.texts[2].destroy();
        this.v.destroy()
    }

}
