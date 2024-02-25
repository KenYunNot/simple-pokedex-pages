import { Type } from "@prisma/client"

export type TypeWithRelations = {
  double_damage_from: Type[],
  double_damage_to: Type[],
  half_damage_from: Type[],
  half_damage_to: Type[],
  no_damage_from: Type[],
  no_damage_to: Type[],
} & Type;

// In all use cases, if the fields are null the DexPointer itself will be represented as null.
// This is only to satisfy the Typescript conditions
export type AdjacentPokemon = {
  id: number,
  name: string | null,
  full_name: string | null,
};

export type PokemonBasic = {
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
  left: AdjacentPokemon | null,
  right: AdjacentPokemon | null,
  is_default: boolean,
  types: TypeWithRelations[],
}