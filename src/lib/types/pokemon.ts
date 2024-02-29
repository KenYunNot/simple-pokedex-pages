import type { Type } from "@prisma/client";
import type { TypeWithRelations } from "./type";

export type PokemonBasic = {
  id: number,
  name: string
  full_name: string,
};

export type CardData = {
  id: number,
  name: string,
  full_name: string,
  image_url: string,
  types: Type[],
}

export type Pokemon = {
  id: number,
  name: string,
  full_name: string,
  abilities: string[],
  image_url: string,
  height: number,
  weight: number,
  genus: string,
  flavor_texts: string[],
  gender_rate: number,
  left: PokemonBasic | null,
  right: PokemonBasic | null,
  is_default: boolean,
  types: TypeWithRelations[],
}