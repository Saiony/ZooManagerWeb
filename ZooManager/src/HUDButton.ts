import { Container, Sprite, FederatedPointerEvent, Application } from 'pixi.js';
import { World } from './World';
import {Placeable} from "./Placeable.ts";

export class HUDButton extends Container {
    private textureAlias: string;
    private world: World;
    private app: Application;
    
    private preview: Sprite | null = null;

    constructor(textureAlias: string, world: World, app: Application) {
        super();
        this.textureAlias = textureAlias;
        this.world = world;
        this.app = app;

        const icon = Sprite.from(textureAlias);
        icon.anchor.set(0.5);
        icon.scale.set(0.8);
        this.addChild(icon);

        // enables interactivity
        this.eventMode = 'static';
        this.cursor = 'pointer';
        
        this.on('pointerdown', this.onPointerDown, this);
    }

    private onPointerDown(event: FederatedPointerEvent) {
        // image that follows mouse
        this.preview = Sprite.from(this.textureAlias);
        this.preview.anchor.set(0.5);
        this.preview.alpha = 0.6;
        
        this.app.stage.addChild(this.preview);
        this.updatePreviewPosition(event.global);

        const onMove = (e: FederatedPointerEvent) => {
            this.updatePreviewPosition(e.global);
        };

        const onUp = (e: FederatedPointerEvent) => {
            this.app.stage.off('pointermove', onMove);
            this.app.stage.off('pointerup', onUp);
            this.finishDrag(e.global);
        };

        // Listeners no stage para capturar movimento mesmo fora do botão
        this.app.stage.on('pointermove', onMove);
        this.app.stage.on('pointerup', onUp);
    }

    private updatePreviewPosition(globalPos: { x: number, y: number }) {
        if (this.preview) {
            this.preview.position.set(globalPos.x, globalPos.y);
        }
    }

    private finishDrag(globalPos: { x: number, y: number }) {
        if (this.preview) {
            this.app.stage.removeChild(this.preview);
            this.preview.destroy();
            this.preview = null;
        }

        if (globalPos.y < this.app.screen.height - 100) {
            this.spawnPlaceable(globalPos);
        }
    }

    private spawnPlaceable(globalPos: { x: number, y: number }) {
        // converts screen to world position
        const localPos = this.world.toLocal(globalPos);
        
        const placeable = new Placeable(this.textureAlias);
        placeable.sprite.anchor.set(0.5);
        placeable.position.set(localPos.x, localPos.y);
        this.world.addChild(placeable);
        
        console.log(`Placeable spawned: x=${localPos.x}, y=${localPos.y}`);
    }
}
