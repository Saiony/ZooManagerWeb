import { Container, Graphics, Application } from "pixi.js";
import { HUDPlaceableButton } from "./HUDPlaceableButton";
import { World } from "./World";
import { PLACEABLES } from "./PlaceableData";

export class HUD extends Container {
  private background: Graphics;
  private world: World;
  private app: Application;
  // List of placeable aliases to spawn buttons for (pre-registered in PLACEABLES)
  public readonly PlaceablesButtons: string[] = ["tree", "tree2", "rock", "flower", "banana", "meat"];

  public static readonly HEIGHT = 100;

  constructor(app: Application, world: World) {
    super();
    this.app = app;
    this.world = world;

    this.background = new Graphics()
      .rect(0, 0, app.screen.width, HUD.HEIGHT)
      .fill({ color: 0x000000, alpha: 0.7 });
    this.addChild(this.background);

    this.y = app.screen.height - HUD.HEIGHT;

    this.eventMode = "static"; // block input "raycast"
  }

  public Init() {
    const total = this.PlaceablesButtons.length;
    const buttonSpacing = this.app.screen.width / (total + 1);

    // Create a button for each placeable alias registered in PlaceablesButtons
    for (let i = 0; i < total; i++) {
      const alias = this.PlaceablesButtons[i];
      const cfg = PLACEABLES[alias];
      
      if (!cfg)
        continue;

      const button = new HUDPlaceableButton(cfg, this.world, this.app);

      // evenly distribute horizontally
      button.x = buttonSpacing * (i + 1);
      button.y = HUD.HEIGHT / 2;
      this.addChild(button);
    }
  }
}
