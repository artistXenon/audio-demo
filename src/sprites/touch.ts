import { Sprite, TextSprite } from "artistic-engine/sprite";
import { ResolutionVector2D } from "../helper/resolution-vector2D";
import { Global } from "../global";
import { getTextWidth } from "../helper/fontutil";
import { FontBuilder } from "artistic-engine";
import { EaseFunctions, Modifier } from "artistic-engine/modifiers";
import { Scene } from "../scene";

export class TouchSprite extends Sprite {
    private static readonly channelCount = 4;

    private renderChannel: number = 0;

    private delaySum: number = 0;

    private t: TextSprite;

    // channel properties

    private showPulse = true;

    private ballRadius = 50;

    private barWidth = 3;

    private barCount = 8;

    private barMin = this.barCount;

    private arcEnd = Math.PI * 2;

    private longBarIndex = this.barCount;

    constructor() {
        super();
        this.Position = new ResolutionVector2D(960, 540);
        const t = new TextSprite();
        t.Property.fill = Global.CurrentColor[2];
        t.Property.font = new FontBuilder("sans-serif").setSize("20px").setWeight("500").toString();
        // t.Property.font = Global.FontBuilder.setSize("20px").toString();
        t.Text = "TOUCH";
        
        const mtx = getTextWidth(t.Text, t.Property.font);
        t.W = mtx.width - 1;
        t.X = - t.W / 2;
        t.Y = -10;
        this.attachChildren(t);
        this.t = t;

        // this.Region = () => {
        //     const p = new Path2D();
        //     p.
        //     return p;
        // }
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = Global.CurrentColor[1];
        context.arc(0, 0, this.ballRadius, 0, Math.PI * 2);
        context.fill();
        
        this.delaySum += delay;        

        const timeUnit = Global.loaded ? 1714.28 : 1500;
        const channelUpdate = Math.floor(this.delaySum / timeUnit);
        const channelProgess = this.delaySum % timeUnit;
        let renderProcess: number = 0;

        this.renderChannel = (this.renderChannel + channelUpdate) % TouchSprite.channelCount;
        this.delaySum = channelProgess;

        const easeoutback = EaseFunctions.EaseOutExpo(channelProgess / timeUnit);

        if (this.showPulse) {
            context.globalAlpha = 1 - easeoutback;
            context.fillStyle = Global.CurrentColor[1];
            context.arc(0, 0, 50 + 500 * easeoutback, 0, Math.PI * 2);
            context.fill();
            context.globalAlpha = 1;
        }
        

        switch (this.renderChannel) {
            case 0:
                this.barWidth = 3;
                this.longBarIndex = this.barCount;
                this.barMin = 0;
                this.arcEnd = EaseFunctions.EaseOutExpo(channelProgess / timeUnit) * 2 * Math.PI;
                break;
            case 1: 
                const t1 = (1 - easeoutback) * (this.barCount + 2);
                this.longBarIndex = Math.floor(t1) - 1;
                renderProcess = Math.abs(0.5 - t1 + this.longBarIndex);
                break;
            case 2: 
                const t2 = 3 + EaseFunctions.EaseOutElastic(channelProgess / timeUnit) * 8;
                this.barWidth = t2;
                break;
            case 3: 
                const t3 = (1 - easeoutback) * this.barCount;
                this.barMin = 8 - Math.floor(t3);
        }
        

        context.rotate(- Math.PI / 2);
        for (let i = 0; i < this.barCount; i++) {
            if (i >= this.barMin) {
                context.lineWidth = this.barWidth;
                context.strokeStyle = Global.CurrentColor[1];
                context.beginPath();
                context.moveTo(60, 0);
                if (i > this.longBarIndex) context.lineTo(100, 0);
                else if (i === this.longBarIndex) context.lineTo(110 - renderProcess * 30, 0);
                else context.lineTo(80, 0);
                context.closePath();
                context.stroke();
            }
            context.rotate(this.arcEnd / this.barCount);
        }
        const t = this.t;
        t.Property.fill = Global.CurrentColor[2];
        if ((<Scene>this.parent).State === 1) {
            if (Global.loaded) {
                t.Text = "Tr." + (Global.ActiveAudioTrack + 1);
                t.Y = -10;
            } else {
                const c = Date.now() % 500;
                if (c < 100) t.Text = "⠏⠼";
                else if (c < 200) t.Text = "⠧⠹";
                else if (c < 300) t.Text = "⠮⠝";
                else if (c < 400) t.Text = "⠭⠭";
                else t.Text = "⠫⠵";
                t.Y = -10;
            }
            const mtx = getTextWidth(t.Text, t.Property.font);
            t.W = mtx.width - 1;
            t.X = - t.W / 2;
        }
    }

    public onStart() {
        this.showPulse = false;
        return new Modifier(50, 2000, 1500, (v) => this.ballRadius = v);
        // Global.Engine.registerModifier(new SequentialModifier());
    }
}
