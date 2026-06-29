import {
  Application,
  Container,
  Graphics,
  Sprite,
  Text,
  TextStyle,
} from "pixi.js";
import { World } from "./World";
import { DownloadButton } from "./DownloadButton.ts";

export class MoneyHUD extends Container {
  private readonly background: Graphics;
  private app: Application;
  private world: World;
  private readonly icon: Sprite;
  private readonly moneyText: Text;
  private lastMoneyShown: number = -1;

  public static readonly HEIGHT = 75;

  constructor(app: Application, world: World) {
    super();
    this.app = app;
    this.world = world;

    this.background = new Graphics()
      .rect(0, 0, app.screen.width, MoneyHUD.HEIGHT)
      .fill({ color: 0x000000, alpha: 0.6 });
    this.addChild(this.background);

    this.icon = Sprite.from("money");
    this.icon.anchor.set(0.5);
    this.icon.scale.set(0.7);
    this.icon.x = 24;
    this.icon.y = MoneyHUD.HEIGHT / 2;
    this.addChild(this.icon);

    const style = new TextStyle({
      fill: 0xffff66,
      fontSize: 32,
      fontWeight: "bold",
    });

    this.moneyText = new Text({ text: "0", style });
    this.moneyText.x = 55;
    this.moneyText.y = MoneyHUD.HEIGHT / 2 - this.moneyText.height / 2;
    this.addChild(this.moneyText);

    this.eventMode = "static";
    this.app.ticker.add(this.sync, this);
  }

  private sync() {
    if (this.lastMoneyShown !== this.world.Money) {
      this.lastMoneyShown = this.world.Money;
      this.moneyText.text = `${Math.floor(this.world.Money)}`;
    }
  }

  public destroy(options?: Parameters<Container["destroy"]>[0]) {
    this.app.ticker.remove(this.sync, this);
    super.destroy(options);
  }

  showEndGameButton() {
    const downloadButton = new DownloadButton(
      "https://apps.apple.com/br/app/suspects-mystery-mansion/id1546088542",
    );
    downloadButton.x = this.app.screen.width / 2;
    downloadButton.y = MoneyHUD.HEIGHT / 2 + 100;
    this.addChild(downloadButton);
  }
}
