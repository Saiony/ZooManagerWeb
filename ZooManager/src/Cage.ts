import {Container, Graphics, Rectangle, Sprite} from 'pixi.js';

export class Cage extends Container {  
    readonly textureAlias = "cage";
    sprite: Sprite;
    private background: Graphics;
    public isPointerOver: boolean = false;

    constructor(posX: number, posY: number) {
        super();
        
        this.sprite = Sprite.from(this.textureAlias);
        this.x = posX;
        this.y = posY;
        
        const width = 200;
        const height = 200;

        this.background = new Graphics()
            .rect(-width / 2, -height / 2, width, height)
            .fill({ color: 0x8B4513 });

        this.addChild(this.background);

        this.eventMode = 'static';
        this.hitArea = new Rectangle(-width / 2, -height / 2, width, height);

        this.on('pointerover', () => 
        {
            console.log(`das`);
            this.isPointerOver = true; 
        });
        this.on('pointerout', () => { this.isPointerOver = false; });
    }
    
    public unlock(){
        
    }
    
}