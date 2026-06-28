import { Container, Sprite, Graphics } from 'pixi.js';

export class World extends Container {
    public readonly worldWidth: number;
    public readonly worldHeight: number;

    constructor(screenWidth: number, screenHeight: number) 
    {
        super();
        
        this.worldWidth = screenWidth * 4;
        this.worldHeight = screenHeight;

        const background = new Graphics().rect(0, 0, this.worldWidth, this.worldHeight)
                                          .fill({ color: 0x1099bb, alpha: 0.001 });
        
        this.addChild(background);

        this.createAnimal('bunny', screenWidth);
    }

    private createAnimal(animalAlias: string, screenWidth: number) 
    {
        for (let i = 0; i < 4; i++) 
        {
            const animalSprite = Sprite.from(animalAlias);
            animalSprite.anchor.set(0.5);
            // Posiciona cada coelho no centro de sua respectiva seção de tela
            animalSprite.x = (screenWidth * i) + (screenWidth / 2);
            animalSprite.y = this.worldHeight / 2;
            this.addChild(animalSprite);
        }
    }
}
