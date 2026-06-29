// Central registry and types for placeable items (furniture/objects) data
import { PlaceablesType } from "./PlaceablesType";

export interface PlaceableConfig {
  placeableType: PlaceablesType;
  textureAlias: string;
  environmentScore: number;
  price: number;
}

// Placeables registry
export const PLACEABLES: Record<string, PlaceableConfig> = {
  tree: {
    placeableType: PlaceablesType.Tree,
    textureAlias: PlaceablesType.Tree,
    environmentScore: 4,
    price: 1000
  },
  tree2: {
    placeableType: PlaceablesType.Tree2,
    textureAlias: PlaceablesType.Tree2,
    environmentScore: 2,
    price: 10
  },
  banana: {
    placeableType: PlaceablesType.Banana,
    textureAlias: PlaceablesType.Banana,
    environmentScore: 2,
    price: 30,
  },
  meat: {
    placeableType: PlaceablesType.Meat,
    textureAlias: PlaceablesType.Meat,
    environmentScore: 5,
    price: 500
  },
  rock: {
    placeableType: PlaceablesType.Rock,
    textureAlias: PlaceablesType.Rock,
    environmentScore: 2,
    price: 200
  },
  flower: {
    placeableType: PlaceablesType.Flower,
    textureAlias: PlaceablesType.Flower,
    environmentScore: 1,
    price: 2
  },  
};
