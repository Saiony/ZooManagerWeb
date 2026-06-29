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
    environmentScore: 10,
    price: 500,
  },
  tree2: {
    placeableType: PlaceablesType.Tree2,
    textureAlias: PlaceablesType.Tree2,
    environmentScore: 2,
    price: 5,
  },
  banana: {
    placeableType: PlaceablesType.Banana,
    textureAlias: PlaceablesType.Banana,
    environmentScore: 6,
    price: 15,
  },
  meat: {
    placeableType: PlaceablesType.Meat,
    textureAlias: PlaceablesType.Meat,
    environmentScore: 20,
    price: 100,
  },
  rock: {
    placeableType: PlaceablesType.Rock,
    textureAlias: PlaceablesType.Rock,
    environmentScore: 5,
    price: 50,
  },
  flower: {
    placeableType: PlaceablesType.Flower,
    textureAlias: PlaceablesType.Flower,
    environmentScore: 1,
    price: 2,
  },
};
