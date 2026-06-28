import { Container, FederatedPointerEvent } from "pixi.js";

export class Camera {
  private target: Container;
  private screenWidth: number;
  private worldWidth: number;

  private isDragging: boolean = false;
  private startX: number = 0;
  private targetStartX: number = 0;

  constructor(target: Container, screenWidth: number, worldWidth: number) {
    this.target = target;
    this.screenWidth = screenWidth;
    this.worldWidth = worldWidth;

    // Tornar o target interativo para capturar o arraste em qualquer lugar dele
    // Ou melhor, capturar no palco (stage) via app, mas vamos tentar no target primeiro
    // se o target ocupar o mundo todo.
    this.target.eventMode = "static";
    this.target.on("pointerdown", this.onPointerDown, this);
    window.addEventListener("pointermove", this.onPointerMove.bind(this));
    window.addEventListener("pointerup", this.onPointerUp.bind(this));
  }

  private onPointerDown(event: FederatedPointerEvent) {
    this.isDragging = true;
    this.startX = event.client.x; // only uses x input
    this.targetStartX = this.target.x;
  }

  private onPointerMove(event: PointerEvent) {
    if (!this.isDragging) return;

    const currentX = event.clientX;
    const diffX = currentX - this.startX;

    let newX = this.targetStartX + diffX;

    const minX = Math.min(0, this.screenWidth - this.worldWidth);
    const maxX = 0;

    if (newX < minX) newX = minX;

    if (newX > maxX) newX = maxX;

    this.target.x = newX;
  }

  private onPointerUp() {
    this.isDragging = false;
  }

  public updateBounds(screenWidth: number, worldWidth: number) {
    this.screenWidth = screenWidth;
    this.worldWidth = worldWidth;

    // adjust position if bounds change
    const minX = Math.min(0, this.screenWidth - this.worldWidth);
    if (this.target.x < minX) this.target.x = minX;
    if (this.target.x > 0) this.target.x = 0;
  }
}
