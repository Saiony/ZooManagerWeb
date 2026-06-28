import { PlaceablesType, PlaceablesTypeArray } from "./PlaceablesType";

export interface AnimalConfig {
  id: string;
  textureAlias: string;
  likesArray: PlaceablesTypeArray;
  dislikesArray: PlaceablesTypeArray;
}

export const ANIMALS: Record<string, AnimalConfig> = {
  fox: {
    id: "fox",
    textureAlias: "fox",
    likesArray: [],
    dislikesArray: [],
  },
  monkey: {
    id: "monkey",
    textureAlias: "monkey",
    likesArray: [],
    dislikesArray: [],
  },
  lion: {
    id: "lion",
    textureAlias: "lion",
    likesArray: [],
    dislikesArray: [],
  },
  elephant: {
    id: "elephant",
    textureAlias: "elephant",
    likesArray: [PlaceablesType.Tree],
    dislikesArray: [],
  },
};
