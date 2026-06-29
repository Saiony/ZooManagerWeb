import { Container, Sprite } from "pixi.js";
import { PlaceablesType } from "./PlaceablesType";

export class Placeable extends Container {
  sprite: Sprite;
  readonly placeableType: PlaceablesType;
  environmentScore: number;

  constructor(opts: {
    textureAlias: string;
    placeableType: PlaceablesType;
    environmentScore: number;
  }) {
    super();

    this.placeableType = opts.placeableType;
    this.sprite = Sprite.from(opts.textureAlias);
    this.environmentScore = opts.environmentScore;

    this.addChild(this.sprite);
  }
}
