import { AssetLoader } from "artistic-engine/loader";
import { Modifier } from "artistic-engine/modifiers";
import { Global } from "./global";
import { Scene } from "./scene";

const stateFunctions: ((e: PointerEvent) => boolean)[] = [
    (e: PointerEvent) => {
        switch (e.type) {
            case "pointerup": 
                (<AssetLoader>Global.Engine.AssetLoader).load();
                (<Scene>Global.Engine.Scene).State = 1;
                (<Scene>Global.Engine.Scene).Children[0]
        }
        return true;
    },
    (e: PointerEvent) => {
        
        switch (e.type) {
            case "pointerup": 
            const now = Global.ActiveAudioTrack;
            let next: number;
            next = (now + 1) % 4;

            // (<Scene>Global.Engine.Scene).click(e.x, e.y);
            
            Global.ActiveAudioTrack = next;
            const colorNow = Global.currentColor;
            const colorNext = Global.Color[next];
            Global.Engine.registerModifier(
                new Modifier(0, 1, 500, (v) => {                    
                    Global.AudioGains[now].gain.value = 1 - v;
                    Global.AudioGains[next].gain.value = v;
                    for (let i = 0; i < 9; i++) {
                        Global.currentColor[i] = colorNow[i] + (colorNext[i] - colorNow[i]) * v;                        
                    }
                })
            );
        }
        return true;
    }
];




export default stateFunctions;