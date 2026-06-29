import { Container, Graphics, Application } from "pixi.js";
import { HUDPlaceableButton } from "./HUDPlaceableButton";
import { World } from "./World";
import { PLACEABLES } from "./PlaceableData";
import { PlaceablesTypeArray } from "./PlaceablesType.ts";

export class HUD extends Container {
  private readonly background: Graphics;
  private readonly world: World;
  private readonly app: Application;
  private readonly buttonsContainer: Container;
  private readonly PlaceablesButtons: string[] = [
    "tree",
    "tree2",
    "rock",
    "flower",
    "banana",
    "meat",
  ];

  public static readonly HEIGHT = 150;

  constructor(app: Application, world: World) {
    super();
    this.app = app;
    this.world = world;

    this.background = new Graphics()
      .rect(0, 0, app.screen.width, HUD.HEIGHT)
      .fill({ color: 0x000000, alpha: 0.7 });
    this.addChild(this.background);

    this.buttonsContainer = new Container();
    this.addChild(this.buttonsContainer);

    this.y = app.screen.height - HUD.HEIGHT;

    this.eventMode = "static"; // block input "raycast"
  }

  public Init() {
    this.rebuildButtons(this.PlaceablesButtons);
  }

  public setButtonsByTypes(types: PlaceablesTypeArray) {
    const aliases = types.map((t) => t as unknown as string);
    this.rebuildButtons(aliases);
  }

  private rebuildButtons(aliases: string[]) {
    // clean old buttons
    this.buttonsContainer.removeChildren().forEach((c) => c.destroy());

    const filtered = aliases.map((a) => PLACEABLES[a]).filter((cfg) => !!cfg);

    const total = filtered.length;
    if (total === 0) return;

    const buttonSpacing = this.app.screen.width / (total + 1);

    filtered.forEach((cfg, i) => {
      const button = new HUDPlaceableButton(cfg!, this.world, this.app);
      button.x = buttonSpacing * (i + 1);
      button.y = HUD.HEIGHT / 2;
      this.buttonsContainer.addChild(button);
    });
  }

  public setButtonsLocked(locked: boolean) {
    this.buttonsContainer.children.forEach((child) => {
      const btn = child as unknown as HUDPlaceableButton;
      if (btn && typeof btn.setLocked === "function") {
        btn.setLocked(locked);
      }
    });
  }
}
