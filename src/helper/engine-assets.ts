import { AssetLoader } from "artistic-engine/loader";

import sss0 from "../assets/sss-0.mp3"
import sss1 from "../assets/sss-1.mp3"
import sss2 from "../assets/sss-2.mp3"
import sss3 from "../assets/sss-3.mp3"

import inanis from "../assets/inanis.png"
import inanis_silhouette from "../assets/inanis-silhouette .png"

import AppliMincho from "../assets/AppliMincho.otf"

export class EngineAssets {
    private assetLoader: AssetLoader;

    private fonts = [
        { name: "AppliMincho", source: `url(${AppliMincho})` },
    ];
    
    private images = [
        { name: "inanis", source: inanis },
        { name: "inanis_s", source: inanis_silhouette },
    ];
    
    private audios = [
        { name: "sss0", source: sss0 },
        { name: "sss1", source: sss1 },
        { name: "sss2", source: sss2 },
        { name: "sss3", source: sss3 }
    ];

    constructor(assetLoader: AssetLoader) {
        this.assetLoader = assetLoader;

        this.registerFonts();
        this.registerImages();
        this.registerAudios();        

        this.assetLoader.onLoad = () => {
            this.onLoad();
        }
    }

    public load() {
        this.assetLoader.load();
    }

    private registerFonts() {
        for (const { name, source } of this.fonts) {
            this.assetLoader.addFont(name, source);    
        }
    }

    public registerImages() {
        for (const { name, source } of this.images) {
            this.assetLoader.addImages(name, source);    
        }
    }
    
    public registerAudios() {
        for (const { name, source } of this.audios) {
            this.assetLoader.addAudios(name, source);    
        }
    }

    public onLoad() {
        // TODO: whatever that is to be done after assets are loaded
    }
}
