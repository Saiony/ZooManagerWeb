import { Placeable } from './Placeable';

export class Animal extends Placeable { 
    needFulfilled: boolean = false;

    constructor(textureAlias: string) {
        super(textureAlias);
    }

    public satisfyNeed() {
        this.needFulfilled = true;
    }
}