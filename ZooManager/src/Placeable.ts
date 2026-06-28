import {Container, Sprite} from 'pixi.js';

export class Placeable extends Container {
    sprite: Sprite;
    animalType: string = '';
    

    constructor(textureAlias: string) {
        super();
        this.sprite = Sprite.from(textureAlias);
        this.addChild(this.sprite); // se Animal for um Container
    }
}