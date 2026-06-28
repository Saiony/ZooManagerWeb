import { PlaceablesType, PlaceablesTypeArray } from './PlaceablesType';

export interface AnimalConfig {
    id: string;                 
    textureAlias: string; 
    likesArray: PlaceablesTypeArray;    
    dislikesArray: PlaceablesTypeArray;
}

export const ANIMALS: Record<string, AnimalConfig> = {
    fox: {
        id: 'fox',
        textureAlias: 'fox',
        likesArray: [PlaceablesType.Grass, PlaceablesType.Water],
        dislikesArray: [PlaceablesType.Fox],
    },
    monkey: {
        id: 'monkey',
        textureAlias: 'monkey',
        likesArray: [PlaceablesType.Grass, PlaceablesType.Water],
        dislikesArray: [PlaceablesType.Fox],
    },
    lion: {
        id: 'lion',
        textureAlias: 'lion',
        likesArray: [PlaceablesType.Grass, PlaceablesType.Water],
        dislikesArray: [PlaceablesType.Fox],
    },
    elephant: {
        id: 'elephant',
        textureAlias: 'elephant',
        likesArray: [PlaceablesType.Grass, PlaceablesType.Water],
        dislikesArray: [PlaceablesType.Fox],
    },
};
