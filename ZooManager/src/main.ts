import { Application, Assets } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";

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
    }

    async function preload() 
    {
        const assets = [
            { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
            { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
            { alias: 'bunny', src: '/assets/bunny.png'},
        ];

        // Load the assets defined above.
        await Assets.load(assets);
    }

    await (async () =>
    {
        await setup();
        await preload();

        const world = new World(app.screen.width, app.screen.height);
        app.stage.addChild(world);
        
        new Camera(world, app.screen.width, world.worldWidth);

        console.log("Jogo inicializado com sistema de câmera horizontal.");
    })();
}

bootstrap().catch((err) => {
    console.error("Falha ao iniciar o jogo:", err);
});
