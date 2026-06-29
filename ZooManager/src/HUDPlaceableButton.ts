import {
  Application,
  Container,
  FederatedPointerEvent,
  Sprite,
  Text,
  TextStyle,
} from "pixi.js";
import { World } from "./World";
import { Placeable } from "./Placeable";
import type { PlaceableConfig } from "./PlaceableData";
import { Cage } from "./Cage.ts";
import { sound } from "@pixi/sound";

// HUD button that allows dragging a placeable into the world.
export class HUDPlaceableButton extends Container {
  private placeableConfig: PlaceableConfig;
  private world: World;
  private app: Application;

  private preview: Sprite | null = null;
  private locked: boolean = false;
  private lockOverlay: Sprite | null = null;

  constructor(config: PlaceableConfig, world: World, app: Application) {
    super();
    this.placeableConfig = config;
    this.world = world;
    this.app = app;

    const icon = Sprite.from(config.textureAlias);
    icon.anchor.set(0.5);
    icon.scale.set(1.5);
    this.addChild(icon);

    const priceContainer = new Container();
    priceContainer.y = icon.height * 0.5;
    this.addChild(priceContainer);

    const moneyIcon = Sprite.from("money");
    moneyIcon.anchor.set(0.5);
    moneyIcon.scale.set(0.4);
    moneyIcon.x = -12;
    priceContainer.addChild(moneyIcon);

    const style = new TextStyle({
      fill: 0xffff66,
      fontSize: 32,
      fontWeight: "bold",
    });

    const priceText = new Text({
      text: `${this.placeableConfig.price}`,
      style,
    });

    // align vertically with money icon
    priceText.x = 0;
    priceText.y = -priceText.height / 2;
    priceContainer.addChild(priceText);

    // enable interactivity
    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", this.onPointerDown, this);
    this.app.ticker.add(this.sync, this);
  }

  private onPointerDown(event: FederatedPointerEvent) {
    if (this.locked) return;

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
    if (targetCage && !targetCage.locked) {
      this.world.removeMoney(this.placeableConfig.price);
      this.spawnPlaceable(globalPos, targetCage);
    }
  }

  private spawnPlaceable(globalPos: { x: number; y: number }, cage: Cage) {
    const localPos = cage.toLocal(globalPos);

    const placeable = new Placeable({
      textureAlias: this.placeableConfig.textureAlias,
      placeableType: this.placeableConfig.placeableType,
      environmentScore: this.placeableConfig.environmentScore,
    });

    placeable.sprite.anchor.set(0.5);
    placeable.position.set(localPos.x, localPos.y);
    cage.addPlaceable(placeable);

    sound.play("placeSfx");

    console.log(
      `Placeable spawned: ${this.placeableConfig.placeableType} at x=${localPos.x}, y=${localPos.y}`,
    );
  }

  public setLocked(locked: boolean) {
    this.locked = locked;
    this.cursor = locked ? "not-allowed" : "pointer";
    if (!this.lockOverlay) {
      const overlay = Sprite.from("locked");
      overlay.anchor.set(0.5);
      overlay.alpha = 0.9;
      overlay.scale.set(0.4);
      this.addChild(overlay);
      this.lockOverlay = overlay;
    }
    this.lockOverlay!.visible = locked;
  }

  private sync() {
    const purchasable = this.world.Money >= this.placeableConfig.price;
    this.setLocked(!purchasable);
  }
}
