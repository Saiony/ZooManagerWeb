import { Application, Assets } from "pixi.js";
import { sound } from "@pixi/sound"
import { World } from "./World";
import { Camera } from "./Camera";
import { HUD } from "./HUD";
import { MoneyHUD } from "./MoneyHUD";
import { ANIMALS } from "./AnimalData";
import type { Cage } from "./Cage";

//images
import foxImg from "./assets/Animals/fox.png";
import monkeyImg from "./assets/Animals/monkey.png";
import lionImg from "./assets/Animals/lion.png";
import elephantImg from "./assets/Animals/elephant.png";

import treeImg from "./assets/Placeables/tree.png";
import tree2Img from "./assets/Placeables/tree2.png";
import bananaImg from "./assets/Placeables/banana.png";
import meatImg from "./assets/Placeables/meat.png";
import rockImg from "./assets/Placeables/rock.png";
import flowerImg from "./assets/Placeables/flower.png";

import bgmMusic from './assets/sfx/bgmlofi.mp3';
import placeSfx from './assets/sfx/place.mp3';

import money from './assets/UI/money.png';
import locked from './assets/UI/locked.png';


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
      { alias: "tree2", src: tree2Img },
      { alias: "banana", src: bananaImg },
      { alias: "meat", src: meatImg },
      { alias: "rock", src: rockImg },
      { alias: "flower", src: flowerImg },
      { alias: "bgm", src: bgmMusic},
      { alias: "placeSfx", src: placeSfx},
      { alias: "placeSfx", src: placeSfx},
      { alias: "money", src: money},
      { alias: "locked", src: locked},
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

    // HUD - inferior
    const hud = new HUD(app, world);
    app.stage.addChild(hud);
    hud.Init();

    // HUD - superior
    const moneyHud = new MoneyHUD(app, world);
    app.stage.addChild(moneyHud);

    let currentCentered: Cage | null = null;

    const getCenteredCage = (): Cage | null => {
      if (world.Cages.length === 0)
        return null;
      
      const centerWorldX = -world.x + app.screen.width / 2;
      let best: Cage | null = null;
      let bestDist = Number.POSITIVE_INFINITY;
      
      for (const cage of world.Cages) {
        const dist = Math.abs(cage.x - centerWorldX);
        if (dist < bestDist) {
          bestDist = dist;
          best = cage;
        }
      }
      return best;
    };

    const applyHUDFor = (cage: Cage | null) => {
      if (!cage)
        return;
      
      const animalConfig = ANIMALS[cage.animalType];
      
      if (!animalConfig) 
        return;
      
      hud.setButtonsByTypes(animalConfig.availablePlaceables);
      hud.setButtonsLocked(!!cage.locked);
    };

    app.ticker.add(() => {
      // economy
      const dt = app.ticker.deltaMS / 2000;
      if (world.MoneyPerSecond !== 0) {
        world.addMoney(world.MoneyPerSecond * dt);
      }

      const centered = getCenteredCage();
      if (centered !== currentCentered) {
        currentCentered = centered;
        applyHUDFor(currentCentered);
      }
    });

    applyHUDFor(getCenteredCage());
    sound.play("bgm", { loop: true, volume: 0.4 });
  })();
}

bootstrap().catch((err) => {
  console.error("Falha ao iniciar o jogo:", err);
});
