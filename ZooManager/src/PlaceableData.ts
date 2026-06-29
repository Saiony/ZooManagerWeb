// Central registry and types for placeable items (furniture/objects) data
import { PlaceablesType } from "./PlaceablesType";

export interface PlaceableConfig {
  placeableType: PlaceablesType;
  textureAlias: string;
}

// Placeables registry
export const PLACEABLES: Record<string, PlaceableConfig> = {
  tree: {
    placeableType: PlaceablesType.Tree,
    textureAlias: PlaceablesType.Tree,
  },
  tree2: {
    placeableType: PlaceablesType.Tree2,
    textureAlias: PlaceablesType.Tree2,
  },
  banana: {
    placeableType: PlaceablesType.Banana,
    textureAlias: PlaceablesType.Banana,
  },
  meat: {
    placeableType: PlaceablesType.Meat,
    textureAlias: PlaceablesType.Meat,
  },
  rock: {
    placeableType: PlaceablesType.Rock,
    textureAlias: PlaceablesType.Rock,
  },
  flower: {
    placeableType: PlaceablesType.Flower,
    textureAlias: PlaceablesType.Flower,
  },  
};
