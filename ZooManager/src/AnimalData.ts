import {PlaceablesType, PlaceablesTypeArray} from "./PlaceablesType";

export interface AnimalConfig {
  id: string;
  textureAlias: string;
  availablePlaceables: PlaceablesTypeArray;
  baseMoneyPerSecond: number;
}

export const ANIMALS: Record<string, AnimalConfig> = {
  fox: {
    id: "fox",
    textureAlias: "fox",
    availablePlaceables: [PlaceablesType.Flower],
    baseMoneyPerSecond: 1,
  },
  monkey: {
    id: "monkey",
    textureAlias: "monkey",
    availablePlaceables: [PlaceablesType.Tree2, PlaceablesType.Banana],
    baseMoneyPerSecond: 2,
  },
  lion: {
    id: "lion",
    textureAlias: "lion",
    availablePlaceables: [PlaceablesType.Rock, PlaceablesType.Meat],
    baseMoneyPerSecond: 4,
  },
  elephant: {
    id: "elephant",
    textureAlias: "elephant",
    availablePlaceables: [PlaceablesType.Tree],
    baseMoneyPerSecond: 8,
  },
};
