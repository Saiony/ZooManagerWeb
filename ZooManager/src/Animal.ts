import { Container, Sprite } from "pixi.js";
import { PlaceablesType } from "./PlaceablesType";
import type { AnimalConfig } from "./AnimalData";

export class Animal extends Container {
  sprite: Sprite;
  needFulfilled: boolean = false;
  readonly id: string;
  readonly likesArray: PlaceablesType[];
  readonly dislikesArray: PlaceablesType[];

  constructor(config: AnimalConfig) {
    super();
    this.id = config.id;
    this.likesArray = [...config.likesArray];
    this.dislikesArray = [...config.dislikesArray];

    this.sprite = Sprite.from(config.textureAlias);
    this.addChild(this.sprite);
  }

  public satisfyNeed() {
    this.needFulfilled = true;
  }
}
