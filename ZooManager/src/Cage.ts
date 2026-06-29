import {Container, Graphics, Rectangle, Sprite, Text} from "pixi.js";
import {ANIMALS} from "./AnimalData.ts";
import {Placeable} from "./Placeable.ts";
import {World} from "./World.ts";

export class Cage extends Container {
  readonly textureAlias = "cage";
  world: World;
  sprite: Sprite;
  animalType: string;
  currentEnvironmentScore: number;
  environmentScoreToLvlUp: number;
  moneyPerSecond: number;
  locked: boolean = false;
  private lockOverlay: Sprite;
  private level: number = 0;
  
  private background: Graphics;
  public isPointerOver: boolean = false;
  
  // Progress bar UI
  private progressBg!: Graphics;
  private progressFill!: Graphics;
  private levelText!: Text;

  constructor(world: World, posX: number, posY: number, animalType: string) {
    super();

    this.world = world;
    this.sprite = Sprite.from(this.textureAlias);
    this.x = posX;
    this.y = posY;
    this.animalType = animalType;
    this.currentEnvironmentScore = 0;
    this.environmentScoreToLvlUp = ANIMALS[animalType].initialEnvironmentScoreToLvlUp;
    this.moneyPerSecond = ANIMALS[animalType].baseMoneyPerSecond;

    const width = 200;
    const height = 200;

    this.background = new Graphics()
      .rect(-width / 2, -height / 2, width, height)
      .fill({ color: 0x8b4513 });

    this.addChild(this.background);

    this.eventMode = "static";
    this.hitArea = new Rectangle(-width / 2, -height / 2, width, height);

    // lock overlay
    this.lockOverlay = Sprite.from("locked");
    this.lockOverlay.anchor.set(0.5);
    this.lockOverlay.scale.set(3);
    this.lockOverlay.alpha = 0.85;
    this.lockOverlay.visible = false;
    this.addChild(this.lockOverlay);

    this.on("pointerover", () => {
      this.isPointerOver = true;
    });
    this.on("pointerout", () => {
      this.isPointerOver = false;
    });

    this.initProgressBar(width, height);
    this.updateProgressBar();
  }
  
  public addPlaceable(placeable: Placeable)
  {
    if (this.locked)
      return;

    this.addChild(placeable);
    this.currentEnvironmentScore += placeable.environmentScore;   
   
    this.ChecklvlUp();
    this.updateProgressBar();
  }

  public setLocked(flag: boolean) {
    this.locked = flag;
    this.lockOverlay.visible = flag;
  }

  public unlock() {
    this.setLocked(false);
  }

  public lock() {
    this.setLocked(true);
  }
  
  private ChecklvlUp()
  {
    if(this.currentEnvironmentScore < this.environmentScoreToLvlUp)
      return;

    this.level++;    
    this.environmentScoreToLvlUp *= this.currentEnvironmentScore;
    
    const oldMoneyPerSecond = this.moneyPerSecond;
    this.moneyPerSecond *= 2;
    
    this.world.addMoneyPerSecond(this.moneyPerSecond - oldMoneyPerSecond);

    // unlocks next cage
    const idx = this.world.Cages.indexOf(this);
    if (idx >= 0 && idx + 1 < this.world.Cages.length) {
      this.world.Cages[idx + 1].unlock();
    }
  }

  private initProgressBar(cageWidth: number, cageHeight: number) {
    const barWidth = cageWidth * 0.7;
    const barHeight = 10;
    const yOffset = -cageHeight / 2 - 12;

    // Background
    this.progressBg = new Graphics()
      .rect(-barWidth / 2, yOffset - barHeight / 2, barWidth, barHeight)
      .fill({ color: 0x000000, alpha: 0.4 });
    this.addChild(this.progressBg);

    this.progressFill = new Graphics();
    this.addChild(this.progressFill);

    this.levelText = new Text(this.level.toString());
    this.levelText.anchor.set(1, 0.5);
    this.levelText.x = -barWidth / 2 - 8; 
    this.levelText.y = yOffset;
    this.addChild(this.levelText);
  }

  private updateProgressBar() {
    if (!this.progressFill || !this.progressBg) 
      return;

    this.levelText.text = this.level.toString();
    const cageWidth = 200; 
    const cageHeight = 200;
    const barWidth = cageWidth * 0.7;
    const barHeight = 10;
    const yOffset = -cageHeight / 2 - 12;

    const ratio = Math.max(0, Math.min(1, this.currentEnvironmentScore / this.environmentScoreToLvlUp));

    this.progressFill.clear();
    if (ratio > 0) {
      const fillWidth = barWidth * ratio;
      this.progressFill.rect(-barWidth / 2, yOffset - barHeight / 2, fillWidth, barHeight)
                       .fill({ color: 0x33cc33, alpha: 0.9 });
    }
  }
}
