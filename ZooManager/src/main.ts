import { Application, Assets } from "pixi.js";
import { sound } from "@pixi/sound"
import { World } from "./World";
import { Camera } from "./Camera";
import { HUD } from "./HUD";

//images
import foxImg from "./assets/Animals/fox.png";
import monkeyImg from "./assets/Animals/monkey.png";
import lionImg from "./assets/Animals/lion.png";
import elephantImg from "./assets/Animals/elephant.png";
import treeImg from "./assets/Placeables/tree.png";

import bgmMusic from './assets/sfx/bgmlofi.mp3';
import placeSfx from './assets/sfx/place.mp3';

async function bootstrap() {
  const app = new Application();

  async function setup() {
    await app.init({
      background: "#1099bb",
      width: 375,
      height: 667,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });

    const container = document.getElementById("pixi-container");
    if (container) container.appendChild(app.canvas);

    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
  }

  async function preload() {
    const assets = [
      { alias: "fox", src: foxImg },
      { alias: "monkey", src: monkeyImg },
      { alias: "lion", src: lionImg },
      { alias: "elephant", src: elephantImg },
      { alias: "tree", src: treeImg },
      { alias: "bgm", src: bgmMusic},
      { alias: "placeSfx", src: placeSfx},
    ];

    // Load the assets defined above.
    await Assets.load(assets);
  }

  await (async () => {
    await setup();
    await preload();

    // World
    const world = new World(app.screen.width, app.screen.height);
    app.stage.addChild(world);

    //Camera
    new Camera(world, app.screen.width, world.worldWidth);

    // HUD
    const hud = new HUD(app, world);
    app.stage.addChild(hud);
    hud.Init();

    sound.play("bgm", { loop: true, volume: 0.4 });
  })();
}

bootstrap().catch((err) => {
  console.error("Falha ao iniciar o jogo:", err);
});
