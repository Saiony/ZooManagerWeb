import { Container, Graphics, Application } from 'pixi.js';
import { HUDButton } from './HUDButton';
import { World } from './World';

export class HUD extends Container {
    private background: Graphics;
    private world: World;
    private app: Application;
    
    public static readonly HEIGHT = 100;

    constructor(app: Application, world: World) {
        super();
        this.app = app;
        this.world = world;

        this.background = new Graphics().rect(0, 0, app.screen.width, HUD.HEIGHT).fill({ color: 0x000000, alpha: 0.7 });        
        this.addChild(this.background);
        
        this.y = app.screen.height - HUD.HEIGHT;
        
        this.eventMode = 'static'; // block input "raycast"
    }

    public Init() {
        const buttonSpacing = this.app.screen.width / 3;
        
        // Spawnar 2 botões iguais para teste (com a imagem do coelho)
        for (let i = 0; i < 2; i++)
        {
            const button = new HUDButton("/assets/bunny.png", this.world, this.app);
            
            // evenly distribute it, horizontally
            button.x = buttonSpacing * (i + 1);
            button.y = HUD.HEIGHT / 2;
            this.addChild(button);
        }
    }
}
