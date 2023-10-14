import { Engine, FontBuilder } from "artistic-engine";

export class Global {
    private static colors: number[][] = [
        [0x64, 0xCC, 0xC5, 0x17, 0x6B, 0x87, 0xDA, 0xFF, 0xFB], 
        [0xFF, 0xF5, 0xE0, 0xFF, 0x69, 0x69, 0x14, 0x1E, 0x46], 
        [0x0C, 0x13, 0x4F, 0x5C, 0x46, 0x9C, 0xD4, 0xAD, 0xFC], 
        [0x3C, 0x48, 0x6B, 0xF4, 0x50, 0x50, 0xF9, 0xD9, 0x49]
    ];

    public static currentColor: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    public static readonly BEAT_MILLISECOND = 3000 / 7;

    public static Engine: Engine;

    public static loaded: boolean = false;

    public static AudioTracks: AudioBufferSourceNode[];

    public static AudioGains: GainNode[];

    public static ActiveAudioTrack = 0;

    public static AudioContextZeroTime = 0;
    
    public static FontBuilder = new FontBuilder("AppliMincho");

    public static get Color() {
        return Global.colors;
    }
    
    public static get CurrentColor() {
        return [
            `rgb(${Global.currentColor[0]}, ${Global.currentColor[1]}, ${Global.currentColor[2]})`, 
            `rgb(${Global.currentColor[3]}, ${Global.currentColor[4]}, ${Global.currentColor[5]})`, 
            `rgb(${Global.currentColor[6]}, ${Global.currentColor[7]}, ${Global.currentColor[8]})`
        ];
    }

    public static get Scene() {
        return Global.Engine.Scene;
    }

    public static get Beat() {
        const seekNow = Date.now() - this.AudioContextZeroTime;
        const beatCount = Math.floor(seekNow / Global.BEAT_MILLISECOND);
        const beatTime = seekNow - Global.BEAT_MILLISECOND * beatCount;
        return { count: beatCount % 64, time: beatTime };
    }
}