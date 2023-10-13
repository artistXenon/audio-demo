import { Modifier } from "artistic-engine/modifiers";
import { Sprite } from "artistic-engine/sprite";
import { ResolutionVector2D } from "../helper/resolution-vector2D";

export class TransitionSprite extends Sprite {
    constructor() {
        super();
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.translate(ResolutionVector2D.reconX(960), ResolutionVector2D.reconY(540));
        context.fillStyle = "black";
        context.arc(0, 0, 50, 0, Math.PI * 2);
    }

    public startTransition() {
        return new Modifier(0, 1, 2000, (v) => {
            
        });
    }

}
