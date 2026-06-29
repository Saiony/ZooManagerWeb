import { Container, Sprite, Ticker } from "pixi.js";
import type { AnimalConfig } from "./AnimalData";
import type { Cage } from "./Cage";

export class Animal extends Container {
  sprite: Sprite;
  needFulfilled: boolean = false;
  readonly id: string;

  private speed = 0.5;
  private targetX = 0;
  private targetY = 0;
  private boundsWidth = 100;
  private boundsHeight = 100;
  private currentWaitTime = 0;
  private totalWaitTime = 3; //seconds

  constructor(config: AnimalConfig) {
    super();
    this.id = config.id;
    this.sprite = Sprite.from(config.textureAlias);
    this.sprite.anchor.set(0.5);
    this.addChild(this.sprite);

    this.on("added", this.onAddedToCage, this);

    Ticker.shared.add(this.update, this);
  }

  private onAddedToCage() {
    const cage = this.parent as Cage;
    this.boundsWidth = cage.width;
    this.boundsHeight = cage.height;
    this.pickNewTarget();
  }

  private pickNewTarget() {
    const margin = 20;
    this.targetX = (Math.random() - 0.5) * (this.boundsWidth - margin * 2);
    this.targetY = (Math.random() - 0.5) * (this.boundsHeight - margin * 2);
  }

  private update() {
    if (this.currentWaitTime > 0) {
      this.currentWaitTime--;
      return;
    }    

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1) {
      this.currentWaitTime = this.totalWaitTime * 60;
      this.pickNewTarget();
      return;
    }

    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;

    this.sprite.scale.x = dx < 0 ? Math.abs(this.sprite.scale.x) : -Math.abs(this.sprite.scale.x);
  }

  public satisfyNeed() {
    this.needFulfilled = true;
  }

  public destroy(options?: Parameters<Container["destroy"]>[0]) {
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}