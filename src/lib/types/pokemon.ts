import { Type } from "@prisma/client"

export type TypeWithRelations = {
  double_damage_from: Type[],
  double_damage_to: Type[],
  half_damage_from: Type[],
  half_damage_to: Type[],
  no_damage_from: Type[],
  no_damage_to: Type[],
} & Type;

export type AdjacentPokemon = {
  id: number,
  name: string
  full_name: string,
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