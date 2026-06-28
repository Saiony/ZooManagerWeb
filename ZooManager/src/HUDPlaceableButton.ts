import { Application, Container, FederatedPointerEvent, Sprite } from "pixi.js";
import { World } from "./World";
import { Placeable } from "./Placeable";
import type { PlaceableConfig } from "./PlaceableData";
import { Cage } from "./Cage.ts";
import {sound} from "@pixi/sound";

// HUD button that allows dragging a placeable into the world.
export class HUDPlaceableButton extends Container {
  private placeableConfig: PlaceableConfig;
  private world: World;
  private app: Application;

  private preview: Sprite | null = null;

  constructor(config: PlaceableConfig, world: World, app: Application) {
    super();
    this.placeableConfig = config;
    this.world = world;
    this.app = app;

    const icon = Sprite.from(config.textureAlias);
    icon.anchor.set(0.5);
    icon.scale.set(0.8);
    this.addChild(icon);

    // enable interactivity
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", this.onPointerDown, this);
  }

  private onPointerDown(event: FederatedPointerEvent) {
    // create preview that follows the pointer
    this.preview = Sprite.from(this.placeableConfig.textureAlias);
    this.preview.anchor.set(0.5);
    this.preview.alpha = 0.6;
    this.preview.eventMode = "none";

    this.app.stage.addChild(this.preview);
    this.updatePreviewPosition(event.global);

    const onMove = (e: FederatedPointerEvent) =>
      this.updatePreviewPosition(e.global);
    const onUp = (e: FederatedPointerEvent) => {
      this.app.stage.off("pointermove", onMove);
      this.app.stage.off("pointerup", onUp);
      this.finishDrag(e.global);
    };

    // listen on stage to capture movement outside the button
    this.app.stage.on("pointermove", onMove);
    this.app.stage.on("pointerup", onUp);
  }

  private updatePreviewPosition(globalPos: { x: number; y: number }) {
    if (this.preview) {
      this.preview.position.set(globalPos.x, globalPos.y);
    }
  }

  private finishDrag(globalPos: { x: number; y: number }) {
    if (this.preview) {
      this.app.stage.removeChild(this.preview);
      this.preview.destroy();
      this.preview = null;
    }

    // only allow dropping above the HUD area (assuming HUD height is 100)
    const targetCage = this.world.Cages.find((cage) => cage.isPointerOver);
    if (targetCage) {
      this.spawnPlaceable(globalPos, targetCage);
    }
  }

  private spawnPlaceable(globalPos: { x: number; y: number }, cage: Cage) {
    // convert from screen to CAGE-local coordinates (not world)
    const localPos = cage.toLocal(globalPos);

    const placeable = new Placeable({
      textureAlias: this.placeableConfig.textureAlias,
      placeableType: this.placeableConfig.placeableType,
    });
    placeable.sprite.anchor.set(0.5);
    placeable.position.set(localPos.x, localPos.y);
    cage.addChild(placeable);

    sound.play("placeSfx");

    console.log(
      `Placeable spawned: ${this.placeableConfig.id} at x=${localPos.x}, y=${localPos.y}`,
    );
  }
}
