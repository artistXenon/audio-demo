import { TextureSprite } from "artistic-engine/sprite";
import { Global } from "../global";

export class AnimatedTextureSprite extends TextureSprite {
    protected textures: ImageBitmap[];

    protected frame: number = 0;

    protected fps: number = 0;

    protected delaySum: number = 0;

    constructor(...textures: ImageBitmap[]) {
        super({ texture: textures[0] });
        this.textures = textures;
    }

    public setLoop(fps: number) {
        this.fps = fps;
        this.delaySum = 0;
    }

    public setFrame(index: number) {
        this.texture = this.textures[index % this.textures.length] ;
    }

    beforeClip(context: CanvasRenderingContext2D, delay: number): void {
        if (this.fps === 0) return;
        this.delaySum += delay;
        const pastFrmae = Math.floor(this.delaySum / (1000 / this.fps));
        this.setFrame(this.frame + pastFrmae);
    }

    //#50435E
}