import { Sprite } from "artistic-engine/sprite";
import { ResolutionVector2D } from "../helper/resolution-vector2D";

export class TransitionSprite extends Sprite {
    constructor() {
        super();
    }

    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.translate(ResolutionVector2D.reconX(960), ResolutionVector2D.reconY(540));
        context.fillStyle = "black";
        context.arc(0, 0, 50, 0, Math.PI * 2);
    }
}
