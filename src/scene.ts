import { Sprite } from "artistic-engine/sprite";
import { IPointerListener } from "artistic-engine/event";
import stateFunctions from "./scene-state-action";
import { TouchSprite } from "./sprites/touch";
import { Modifier, SequentialModifier } from "artistic-engine/modifiers";
import { Global } from "./global";
import { TransitionSprite } from "./sprites/transition";

export class Scene extends Sprite implements IPointerListener {
    private state = 0;

    // SPRITES
    private touchSprite: TouchSprite;

    private transitionSprite: TransitionSprite | undefined;

    constructor() {
        super();
        this.touchSprite = new TouchSprite();
        this.attachChildren(this.touchSprite);
         
        Global.Engine.registerModifier(new Modifier(
            0, 1, 500, 
            (v) => {                    
                for (let i = 3; i < 6; i++) {
                    Global.currentColor[i] = 255 * v;
                }
            }
        ));
    }

    get PointerRegistered(): boolean {
        return true;
    }

    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    
    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.fillStyle = Global.CurrentColor[0];
        context.fillRect(0, 0, this.W, this.H);

        if (this.state === 1) {

        }
    }

    onPointer(e: PointerEvent): boolean {
        return stateFunctions[this.state](e);
    }

    public get State() {
        return this.state;
    }
    
    public set State(state: number) {
        
        switch (state) {
            case 1:
                if (this.state === 0) {
                    
                }
                break;
        }
        this.state = state;
    }

    public onTouchStart() {
        
        Global.Engine.registerModifier(new SequentialModifier(
            this.touchSprite.onStart(),
            new Modifier(0, 1, 1500, () => {
                if (this.touchSprite.Parent === this) {
                    this.detachChildren(this.touchSprite);
                    this.transitionSprite = new TransitionSprite();
                    this.attachChildren(this.transitionSprite);
                }
            })
        ));
    }    
}
