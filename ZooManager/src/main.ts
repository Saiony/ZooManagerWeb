import { Application, Assets } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";
import { HUD } from "./HUD";

async function bootstrap() {
    const app = new Application();

    async function setup() 
    {       
        await app.init({
            background: '#1099bb',
            width: 375,
            height: 667,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio || 1,
        });

        const container = document.getElementById("pixi-container");
        if(container)
            container.appendChild(app.canvas);

        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
    }

    async function preload() 
    {
        const assets = [
            { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
            { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
            { alias: 'bunny', src: '/assets/bunny.png'},
            { alias: 'fox', src: '/assets/Animals/fox.png'},
            { alias: 'monkey', src: '/assets/Animals/monkey.png'},
            { alias: 'lion', src: '/assets/Animals/lion.png'},
            { alias: 'elephant', src: '/assets/Animals/elephant.png'},
            { alias: 'tree', src: '/assets/Placeables/tree.png'},
        ];

        // Load the assets defined above.
        await Assets.load(assets);
    }

    await (async () =>
    {
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
    })();
}

bootstrap().catch((err) => {
    console.error("Falha ao iniciar o jogo:", err);
});
