import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class DownloadButton extends Container {
  private readonly background: Graphics;
  private readonly text: Text;
  private readonly url: string;

  constructor(url: string) {
    super();
    this.url = url;

    const width = 220;
    const height = 60;

    this.background = new Graphics()
      .roundRect(-width / 2, -height / 2, width, height, 12)
      .fill({ color: 0x2ecc71 });
    this.addChild(this.background);

    const style = new TextStyle({
      fontSize: 20,
      fill: 0xffffff,
      fontWeight: "bold",
    });

    this.text = new Text({ text: "Download Now!", style });
    this.text.anchor.set(0.5);
    this.addChild(this.text);

    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", this.onClick, this);
  }

  private onClick() {
    window.open(this.url, "_blank");
  }
}
