import { Container, Graphics } from "pixi.js";
import { Animal } from "./Animal";
import { ANIMALS } from "./AnimalData";
import { Cage } from "./Cage.ts";

export class World extends Container {
  public readonly worldWidth: number;
  public readonly worldHeight: number;
  public readonly animalScreenWidth: number;

  public readonly Animals: string[] = ["fox", "monkey", "lion", "elephant"];
  public Cages: Cage[] = [];

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.animalScreenWidth = screenWidth;
    this.worldWidth = screenWidth * this.Animals.length;
    this.worldHeight = screenHeight;

    const background = new Graphics()
      .rect(0, 0, this.worldWidth, this.worldHeight)
      .fill({ color: 0x1099bb, alpha: 0.001 });

    this.addChild(background);

    // Create one animal per screen segment, spaced horizontally
    for (let i = 0; i < this.Animals.length; i++) {
      const animal = this.createAnimal(this.Animals[i]);

      if (animal) {
        const cage = this.createCage(i, animal);
        this.Cages.push(cage);
      }
    }
  }

  private createAnimal(animalAlias: string): Animal | undefined {
    const cfg = ANIMALS[animalAlias];
    if (!cfg) return undefined;

    const animal = new Animal(cfg);
    animal.sprite.anchor.set(0.5);

    animal.x = 0;
    animal.y = 0;

    return animal;
  }

  private createCage(index: number, animal: Animal): Cage {
    const posX = this.animalScreenWidth * index + this.animalScreenWidth / 2;
    const posY = this.worldHeight / 2;

    const cage = new Cage(posX, posY);
    cage.addChild(animal);

    this.addChild(cage);
    return cage;
  }

  public playSfx(src: string, volume = 1) {
    const sfx = new Audio(src);
    sfx.volume = volume;
    sfx.play();
  }
}
