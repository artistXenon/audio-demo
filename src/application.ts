import { Global } from "./global";
import { AssetLoader } from "artistic-engine/loader";
import { Modifier } from "artistic-engine/modifiers";

export async function onLoad() {
    // const data1: Blob = Global.Engine.AssetLoader.getImage("inanis");
    // const data2: Blob = Global.Engine.AssetLoader.getImage("inanis_s");
    // Promise.all([
    //     createImageBitmap(data1),
    //     createImageBitmap(data2)
    // ]).then((textures) => {
    //     const ina = new Inanis(...textures);
    //     ina.X = 200;
    //     ina.Y = 100;
    //     Global.Engine.Scene.attachChildren(ina);
    // });

    const audios: AudioBufferSourceNode[] = [];
    const audioGains: GainNode[] = [];
    audios.length = 4;
    audioGains.length = 4;
    Global.AudioTracks = audios;
    Global.AudioGains = audioGains;

    const audioBufferLoader = [];

    for (let i = 0; i < 4; i++) {
        const audio = (<AssetLoader>Global.Engine.AssetLoader).getAudio("sss" + i);

        audio.src
        const audioContext = (<AssetLoader>Global.Engine.AssetLoader).AudioContext!;
        const audioSource = audioContext.createBufferSource();
        audioBufferLoader.push(fetch(audio.src)
            .then((res) => res.arrayBuffer())
            .then((buf) => audioContext.decodeAudioData(buf))
            .then((data) => {
                audioSource.buffer = data;
                audioSource.loop = true;
                audios[i] = audioSource;

                const gainNode = new GainNode(audioContext);
                gainNode.gain.value = 0;
                audioGains[i] = gainNode;

                audioSource
                    .connect(gainNode)
                    .connect(audioContext.destination);
            }));
    }

    Promise.all(audioBufferLoader)
        .then(() => {
            for (const audio of audios) {
                audio.start(1, 0);
            }
            setTimeout(() => {
                Global.loaded = true;
                const colorNow = Global.currentColor;
                const colorNext = Global.Color[0];
                
                Global.Engine.registerModifier(new Modifier(
                    0, 1, 500, 
                    (v) => {
                        if (Global.ActiveAudioTrack === 0) audioGains[0].gain.value = v
                        
                        for (let i = 0; i < 9; i++) {
                            Global.currentColor[i] = colorNow[i] + (colorNext[i] - colorNow[i]) * v;                        
                        }
                    }
                ));
            }, 1000);

        }); 

    // Global.Engine.Canvas.requestFullscreen();
}
