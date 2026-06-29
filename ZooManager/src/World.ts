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

  // Economy variables
  public Money: number = 4;
  public MoneyPerSecond: number = 0;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.animalScreenWidth = screenWidth;
    this.worldWidth = screenWidth * this.Animals.length;
    this.worldHeight = screenHeight;

    const background = new Graphics()
      .rect(0, 0, this.worldWidth, this.worldHeight)
      .fill({ color: 0x8ccf57, alpha: 0.001 });

    this.addChild(background);

    for (let i = 0; i < this.Animals.length; i++) {
      const posX =
        (this.animalScreenWidth / 1.5) * i + this.animalScreenWidth / 2;
      const posY = this.worldHeight / 2;

      const animal = this.createAnimal(this.Animals[i]);

      if (animal) {
        const cage = this.createCage({ x: posX, y: posY }, animal);
        this.Cages.push(cage);

        //first cage starts unlocked
        if (i === 0) cage.unlock();
        else cage.lock();
      }
    }
  }

  private createAnimal(animalAlias: string): Animal | undefined {
    const animalConfig = ANIMALS[animalAlias];

    if (!animalConfig) return undefined;

    const animal = new Animal(animalConfig);
    animal.sprite.anchor.set(0.5);

    animal.x = 0;
    animal.y = 0;

    return animal;
  }

  private createCage(
    globalPos: { x: number; y: number },
    animal: Animal,
  ): Cage {
    const posX = globalPos.x;
    const posY = globalPos.y;

    const cage = new Cage(this, posX, posY, animal.id);
    cage.addChild(animal);
    this.addChild(cage);
    return cage;
  }

  public addMoney(amount: number) {
    this.Money += amount;
  }

  public removeMoney(amount: number) {
    this.Money -= amount;
    if (this.Money < 0) this.Money = 0;
  }

  public addMoneyPerSecond(amount: number) {
    this.MoneyPerSecond += amount;
  }

  unlockNextCage(cage: Cage) {
    if (cage.level != 1)
      //we only unlock cages the first time it levels up
      return;

    const nextCageIndex = this.Cages.indexOf(cage) + 1;

    if (nextCageIndex <= 0) return;

    if (nextCageIndex >= this.Cages.length) this.emit("gameEnded");
    else {
      this.Cages[nextCageIndex].unlock();
    }
  }
}
