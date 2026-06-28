import { Container, Sprite } from "pixi.js";
import { PlaceablesType } from "./PlaceablesType";

export class Placeable extends Container {
  sprite: Sprite;
  readonly placeableType: PlaceablesType;

  constructor(opts: { textureAlias: string; placeableType: PlaceablesType }) {
    super();
    this.placeableType = opts.placeableType;
    this.sprite = Sprite.from(opts.textureAlias);
    this.addChild(this.sprite);
  }
}
