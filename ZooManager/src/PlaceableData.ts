// Central registry and types for placeable items (furniture/objects) data
import { PlaceablesType } from "./PlaceablesType";

export interface PlaceableConfig {
  id: string; // internal identifier (e.g., 'tree')
  textureAlias: string; // alias preloaded in Pixi Assets (e.g., 'tree')
  placeableType: PlaceablesType; // type used for affinity/logic
}

// Placeables registry
export const PLACEABLES: Record<string, PlaceableConfig> = {
  tree: {
    id: PlaceablesType.Tree,
    textureAlias: PlaceablesType.Tree,
    placeableType: PlaceablesType.Tree,
  },
};
